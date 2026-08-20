export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('estudiantes', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    persona_id: {
      type: Sequelize.UUID,
      allowNull: false,

      references: {
        model: 'personas',
        key: 'id',
      },

      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    codigo_estudiante: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },

    estado: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: 'ACTIVO',
    },

    fecha_ingreso: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },

    fecha_egreso: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },

    fecha_retiro: {
      type: Sequelize.DATEONLY,
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

  await queryInterface.addIndex('estudiantes', ['codigo_estudiante'], {
    unique: true,
    name: 'uq_estudiantes_codigo',
  });

  await queryInterface.addIndex('estudiantes', ['persona_id'], {
    unique: true,
    name: 'uq_estudiantes_persona_id',
  });

  await queryInterface.addIndex('estudiantes', ['estado'], {
    name: 'idx_estudiantes_estado',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('estudiantes');
}
