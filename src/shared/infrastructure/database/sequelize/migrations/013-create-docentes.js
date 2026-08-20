export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('docentes', {
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

    codigo: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },

    especialidad: {
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

  await queryInterface.addIndex('docentes', ['codigo'], {
    unique: true,
    name: 'uq_docentes_codigo',
  });

  await queryInterface.addIndex('docentes', ['persona_id'], {
    unique: true,
    name: 'uq_docentes_persona_id',
  });

  await queryInterface.addIndex('docentes', ['estado'], {
    name: 'idx_docentes_estado',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('docentes');
}
