export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('comprobantes', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    pago_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'pagos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    tipo: {
      type: Sequelize.STRING(30),
      allowNull: false,
      /*
       * RECIBO
       * BOLETA
       * FACTURA
       * NOTA_CREDITO
       * NOTA_DEBITO
       */
    },

    serie: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },

    numero: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },

    fecha_emision: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },

    monto_total: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },

    moneda: {
      type: Sequelize.STRING(3),
      allowNull: false,
      defaultValue: 'PEN',
    },

    estado: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: 'EMITIDO',
    },

    archivo_url: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },

    archivo_tipo: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },

    archivo_nombre: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    hash_documento: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    observaciones: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },

    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },

    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  await queryInterface.addConstraint('comprobantes', {
    fields: ['serie', 'numero'],
    type: 'unique',
    name: 'uq_comprobantes_serie_numero',
  });

  await queryInterface.addConstraint('comprobantes', {
    fields: ['monto_total'],
    type: 'check',
    where: {
      monto_total: {
        [Sequelize.Op.gt]: 0,
      },
    },
    name: 'chk_comprobante_monto_positivo',
  });

  await queryInterface.addIndex('comprobantes', ['pago_id'], {
    name: 'idx_comprobantes_pago',
  });

  await queryInterface.addIndex('comprobantes', ['fecha_emision'], {
    name: 'idx_comprobantes_fecha_emision',
  });

  await queryInterface.addIndex('comprobantes', ['estado'], {
    name: 'idx_comprobantes_estado',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('comprobantes');
}
