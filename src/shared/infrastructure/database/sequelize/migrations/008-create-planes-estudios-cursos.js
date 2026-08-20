export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('planes_estudios_cursos', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    plan_estudios_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'planes_estudios',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },

    curso_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'cursos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    ciclo_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'ciclos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    orden: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    creditos: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false,
    },

    obligatorio: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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

  await queryInterface.addConstraint('planes_estudios_cursos', {
    fields: ['plan_estudios_id', 'curso_id'],
    type: 'unique',
    name: 'uq_plan_curso',
  });

  await queryInterface.addIndex('planes_estudios_cursos', ['ciclo_id'], {
    name: 'idx_plan_curso_ciclo',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('planes_estudios_cursos');
}
