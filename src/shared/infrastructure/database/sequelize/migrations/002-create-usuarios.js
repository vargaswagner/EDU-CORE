export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('usuarios', {
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

    username: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    email: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },

    password_hash: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    estado: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'ACTIVO',
    },

    ultimo_acceso_at: {
      type: Sequelize.DATE,
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

  await queryInterface.addIndex('usuarios', ['username'], {
    unique: true,
    name: 'uq_usuarios_username',
  });

  await queryInterface.addIndex('usuarios', ['email'], {
    unique: true,
    name: 'uq_usuarios_email',
  });

  await queryInterface.addIndex('usuarios', ['persona_id'], {
    unique: true,
    name: 'uq_usuarios_persona_id',
  });

  await queryInterface.addIndex('usuarios', ['estado'], {
    name: 'idx_usuarios_estado',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('usuarios');
}
