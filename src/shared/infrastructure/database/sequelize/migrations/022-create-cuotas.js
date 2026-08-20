export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('cuotas', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    cronograma_pago_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'cronogramas_pago',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    concepto_pago_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'conceptos_pago',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    numero: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    fecha_vencimiento: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    monto: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },

    monto_pagado: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },

    saldo: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },

    estado: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: 'PENDIENTE',
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

  await queryInterface.addConstraint('cuotas', {
    fields: ['cronograma_pago_id', 'numero'],
    type: 'unique',
    name: 'uq_cuota_cronograma_numero',
  });

  await queryInterface.addConstraint('cuotas', {
    fields: ['numero'],
    type: 'check',
    where: {
      numero: {
        [Sequelize.Op.gt]: 0,
      },
    },
    name: 'chk_cuota_numero',
  });

  await queryInterface.addConstraint('cuotas', {
    fields: ['monto'],
    type: 'check',
    where: {
      monto: {
        [Sequelize.Op.gte]: 0,
      },
    },
    name: 'chk_cuota_monto',
  });

  await queryInterface.addConstraint('cuotas', {
    fields: ['monto_pagado', 'monto'],
    type: 'check',
    where: Sequelize.literal('monto_pagado >= 0 AND monto_pagado <= monto'),
    name: 'chk_cuota_pago',
  });

  await queryInterface.addIndex('cuotas', ['fecha_vencimiento'], {
    name: 'idx_cuotas_vencimiento',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('cuotas');
}
