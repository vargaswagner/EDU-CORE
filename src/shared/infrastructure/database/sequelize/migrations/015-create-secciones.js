export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('secciones', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
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

    docente_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'docentes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
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

    turno_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'turnos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    modalidad_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'modalidades',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    codigo: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },

    capacidad: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    inscritos: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    estado: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: 'PLANIFICADA',
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

  await queryInterface.addConstraint('secciones', {
    fields: ['periodo_academico_id', 'codigo'],
    type: 'unique',
    name: 'uq_secciones_periodo_codigo',
  });

  await queryInterface.addConstraint('secciones', {
    fields: ['capacidad'],
    type: 'check',
    where: {
      capacidad: {
        [Sequelize.Op.gt]: 0,
      },
    },
    name: 'chk_seccion_capacidad',
  });

  await queryInterface.addConstraint('secciones', {
    fields: ['inscritos'],
    type: 'check',
    where: {
      inscritos: {
        [Sequelize.Op.gte]: 0,
      },
    },
    name: 'chk_seccion_inscritos',
  });

  await queryInterface.addConstraint('secciones', {
    fields: ['capacidad', 'inscritos'],
    type: 'check',
    where: Sequelize.literal('inscritos <= capacidad'),
    name: 'chk_seccion_aforo',
  });

  await queryInterface.addIndex(
    'secciones',
    ['periodo_academico_id', 'curso_id'],
    {
      name: 'idx_secciones_periodo_curso',
    },
  );
}

export async function down(queryInterface) {
  await queryInterface.dropTable('secciones');
}
