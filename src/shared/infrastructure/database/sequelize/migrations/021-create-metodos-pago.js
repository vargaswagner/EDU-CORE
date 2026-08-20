export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('metodos_pago', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    codigo: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },

    nombre: {
      type: Sequelize.STRING(80),
      allowNull: false,
    },

    requiere_operacion: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    estado: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'ACTIVO',
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

  await queryInterface.addConstraint('metodos_pago', {
    fields: ['codigo'],
    type: 'unique',
    name: 'uq_metodos_pago_codigo',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('metodos_pago');
}
