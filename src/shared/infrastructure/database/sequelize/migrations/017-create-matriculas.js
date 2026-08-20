export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('matriculas', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    codigo: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },

    estudiante_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'estudiantes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    periodo_academico_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'periodos_academicos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    plan_estudios_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'planes_estudios',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    fecha_matricula: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },

    tipo: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: 'ORDINARIA',
    },

    estado: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: 'REGISTRADA',
    },

    observaciones: {
      type: Sequelize.TEXT,
      allowNull: true,
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

  await queryInterface.addConstraint('matriculas', {
    fields: ['codigo'],
    type: 'unique',
    name: 'uq_matriculas_codigo',
  });

  /*
   * Un estudiante solo puede tener
   * una matrícula activa por periodo.
   */
  await queryInterface.addConstraint('matriculas', {
    fields: ['estudiante_id', 'periodo_academico_id'],
    type: 'unique',
    name: 'uq_matricula_estudiante_periodo',
  });

  await queryInterface.addIndex(
    'matriculas',
    ['estudiante_id', 'periodo_academico_id'],
    {
      name: 'idx_matriculas_estudiante_periodo',
    },
  );

  await queryInterface.addIndex('matriculas', ['estado'], {
    name: 'idx_matriculas_estado',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('matriculas');
}
