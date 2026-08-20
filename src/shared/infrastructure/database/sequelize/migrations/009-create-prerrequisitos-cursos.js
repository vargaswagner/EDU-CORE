export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('prerrequisitos_cursos', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    curso_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },

    curso_prerrequisito_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    tipo: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: 'OBLIGATORIO',
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

  await queryInterface.addConstraint('prerrequisitos_cursos', {
    fields: ['curso_id', 'curso_prerrequisito_id'],
    type: 'unique',
    name: 'uq_prerrequisito_curso',
  });

  await queryInterface.addConstraint('prerrequisitos_cursos', {
    fields: ['curso_id', 'curso_prerrequisito_id'],
    type: 'check',
    where: Sequelize.literal('curso_id <> curso_prerrequisito_id'),
    name: 'chk_curso_no_es_su_propio_prerrequisito',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('prerrequisitos_cursos');
}
