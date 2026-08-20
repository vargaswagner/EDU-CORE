export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('movimientos_caja', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    sesion_caja_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'sesiones_caja',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    pago_id: {
      type: Sequelize.UUID,
      allowNull: true,
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
    },

    concepto: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },

    monto: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },

    fecha_movimiento: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
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
  });

  await queryInterface.addConstraint('movimientos_caja', {
    fields: ['monto'],
    type: 'check',
    where: {
      monto: {
        [Sequelize.Op.gt]: 0,
      },
    },
    name: 'chk_movimiento_monto',
  });

  await queryInterface.addIndex('movimientos_caja', ['sesion_caja_id'], {
    name: 'idx_movimientos_sesion',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('movimientos_caja');
}
