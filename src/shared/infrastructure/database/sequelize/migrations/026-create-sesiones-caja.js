export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('sesiones_caja', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    caja_id: {
      type: Sequelize.UUID,
      allowNull: false,

      references: {
        model: 'cajas',
        key: 'id',
      },

      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    usuario_id: {
      type: Sequelize.UUID,
      allowNull: false,

      references: {
        model: 'usuarios',
        key: 'id',
      },

      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    fecha_apertura: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },

    fecha_cierre: {
      type: Sequelize.DATE,
      allowNull: true,
    },

    monto_inicial: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },

    monto_cierre: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: true,
    },

    estado: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'ABIERTA',
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

  await queryInterface.addConstraint('sesiones_caja', {
    fields: ['monto_inicial'],
    type: 'check',

    where: {
      monto_inicial: {
        [Sequelize.Op.gte]: 0,
      },
    },

    name: 'chk_sesion_monto_inicial',
  });

  await queryInterface.addIndex('sesiones_caja', ['caja_id', 'estado'], {
    name: 'idx_sesiones_caja_estado',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('sesiones_caja');
}
