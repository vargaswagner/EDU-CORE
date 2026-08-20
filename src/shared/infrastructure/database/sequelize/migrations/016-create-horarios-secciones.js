export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('horarios_secciones', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    seccion_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'secciones',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },

    aula_id: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'aulas',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    dia_semana: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    hora_inicio: {
      type: Sequelize.TIME,
      allowNull: false,
    },

    hora_fin: {
      type: Sequelize.TIME,
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

  await queryInterface.addConstraint('horarios_secciones', {
    fields: ['dia_semana'],
    type: 'check',
    where: {
      dia_semana: {
        [Sequelize.Op.between]: [1, 7],
      },
    },
    name: 'chk_horario_dia_semana',
  });

  await queryInterface.addConstraint('horarios_secciones', {
    fields: ['hora_inicio', 'hora_fin'],
    type: 'check',
    where: Sequelize.literal('hora_fin > hora_inicio'),
    name: 'chk_horario_horas',
  });

  await queryInterface.addIndex(
    'horarios_secciones',
    ['seccion_id', 'dia_semana'],
    {
      name: 'idx_horarios_seccion_dia',
    },
  );
}

export async function down(queryInterface) {
  await queryInterface.dropTable('horarios_secciones');
}
