export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('carreras', {
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

    // nivel: {
    //   type: Sequelize.STRING(50),
    //   allowNull: false,
    //   defaultValue: 'PROFESIONAL_TECNICO',
    // },

    duracion_periodos: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    creditos_totales: {
      type: Sequelize.DECIMAL(6, 2),
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

  await queryInterface.addConstraint('carreras', {
    fields: ['codigo'],
    type: 'unique',
    name: 'uq_carreras_codigo',
  });

  await queryInterface.addConstraint('carreras', {
    fields: ['duracion_periodos'],
    type: 'check',
    where: {
      duracion_periodos: {
        [Sequelize.Op.gt]: 0,
      },
    },
    name: 'chk_carreras_duracion_positiva',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('carreras');
}
