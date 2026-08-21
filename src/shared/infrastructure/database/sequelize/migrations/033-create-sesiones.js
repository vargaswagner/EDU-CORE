export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('sesiones', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    usuarioId: {
      type: Sequelize.UUID,
      allowNull: false,
      field: 'usuario_id',

      references: {
        model: 'usuarios',
        key: 'id',
      },

      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    refreshTokenHash: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'refresh_token_hash',
    },

    status: {
      type: Sequelize.ENUM('ACTIVE', 'REVOKED', 'EXPIRED'),
      allowNull: false,
      defaultValue: 'ACTIVE',
    },

    expiresAt: {
      type: Sequelize.DATE,
      allowNull: false,
      field: 'expires_at',
    },

    revokedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      field: 'revoked_at',
    },

    ipAddress: {
      type: Sequelize.STRING(45),
      allowNull: true,
      field: 'ip_address',
    },

    userAgent: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'user_agent',
    },

    deviceInfo: {
      type: Sequelize.JSONB,
      allowNull: true,
      field: 'device_info',
    },

    lastUsedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      field: 'last_used_at',
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
}

export async function down(queryInterface) {
  await queryInterface.dropTable('sesiones');
}
