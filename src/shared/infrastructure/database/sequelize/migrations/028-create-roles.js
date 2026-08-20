export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('roles', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    codigo: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    descripcion: {
      type: Sequelize.TEXT,
      allowNull: true,
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

  await queryInterface.addConstraint('roles', {
    fields: ['codigo'],
    type: 'unique',
    name: 'uq_roles_codigo',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('roles');
}
