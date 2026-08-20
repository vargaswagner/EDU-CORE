export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('cursos', {
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
      type: Sequelize.STRING(150),
      allowNull: false,
    },

    descripcion: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    horas_teoricas: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    horas_practicas: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    creditos: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false,
    },

    tipo: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: 'OBLIGATORIO',
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

  await queryInterface.addConstraint('cursos', {
    fields: ['codigo'],
    type: 'unique',
    name: 'uq_cursos_codigo',
  });

  await queryInterface.addConstraint('cursos', {
    fields: ['creditos'],
    type: 'check',
    where: {
      creditos: {
        [Sequelize.Op.gte]: 0,
      },
    },
    name: 'chk_cursos_creditos_validos',
  });

  await queryInterface.addIndex('cursos', ['nombre'], {
    name: 'idx_cursos_nombre',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('cursos');
}
