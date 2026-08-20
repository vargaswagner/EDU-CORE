export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('periodos_academicos', {
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

    fecha_inicio: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    fecha_fin: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    fecha_inicio_matricula: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    fecha_fin_matricula: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    estado: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: 'PLANIFICADO',
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

  await queryInterface.addConstraint('periodos_academicos', {
    fields: ['codigo'],
    type: 'unique',
    name: 'uq_periodos_codigo',
  });

  await queryInterface.addConstraint('periodos_academicos', {
    fields: ['fecha_inicio', 'fecha_fin'],
    type: 'check',
    where: Sequelize.literal('fecha_fin >= fecha_inicio'),
    name: 'chk_periodo_fechas',
  });

  await queryInterface.addConstraint('periodos_academicos', {
    fields: ['fecha_inicio_matricula', 'fecha_fin_matricula'],
    type: 'check',
    where: Sequelize.literal('fecha_fin_matricula >= fecha_inicio_matricula'),
    name: 'chk_periodo_matricula_fechas',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('periodos_academicos');
}
