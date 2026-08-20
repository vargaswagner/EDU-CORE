export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('cajas', {
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
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    ubicacion: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },

    estado: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'ACTIVA',
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

  await queryInterface.addConstraint('cajas', {
    fields: ['codigo'],
    type: 'unique',
    name: 'uq_cajas_codigo',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('cajas');
}
