export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('aulas', {
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

    tipo: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },

    capacidad: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    ubicacion: {
      type: Sequelize.STRING(150),
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

  await queryInterface.addConstraint('aulas', {
    fields: ['codigo'],
    type: 'unique',
    name: 'uq_aulas_codigo',
  });

  await queryInterface.addConstraint('aulas', {
    fields: ['capacidad'],
    type: 'check',
    where: {
      capacidad: {
        [Sequelize.Op.gt]: 0,
      },
    },
    name: 'chk_aulas_capacidad_positiva',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('aulas');
}
