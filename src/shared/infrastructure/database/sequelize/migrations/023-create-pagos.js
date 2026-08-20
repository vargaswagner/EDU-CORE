export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('pagos', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    numero_recibo: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    estudiante_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'estudiantes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    metodo_pago_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'metodos_pago',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    monto: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },

    fecha_pago: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },

    numero_operacion: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    referencia: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },

    comprobante_url: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },

    estado: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: 'REGISTRADO',
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

  await queryInterface.addConstraint('pagos', {
    fields: ['numero_recibo'],
    type: 'unique',
    name: 'uq_pagos_numero_recibo',
  });

  await queryInterface.addConstraint('pagos', {
    fields: ['monto'],
    type: 'check',
    where: {
      monto: {
        [Sequelize.Op.gt]: 0,
      },
    },
    name: 'chk_pago_monto_positivo',
  });

  await queryInterface.addIndex('pagos', ['estudiante_id'], {
    name: 'idx_pagos_estudiante',
  });

  await queryInterface.addIndex('pagos', ['fecha_pago'], {
    name: 'idx_pagos_fecha',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('pagos');
}
