export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('aplicaciones_pago', {
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

    cuota_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'cuotas',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    monto_aplicado: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
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

  await queryInterface.addConstraint('aplicaciones_pago', {
    fields: ['monto_aplicado'],
    type: 'check',
    where: {
      monto_aplicado: {
        [Sequelize.Op.gt]: 0,
      },
    },
    name: 'chk_aplicacion_monto',
  });

  await queryInterface.addIndex('aplicaciones_pago', ['pago_id'], {
    name: 'idx_aplicaciones_pago_pago',
  });

  await queryInterface.addIndex('aplicaciones_pago', ['cuota_id'], {
    name: 'idx_aplicaciones_pago_cuota',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('aplicaciones_pago');
}
