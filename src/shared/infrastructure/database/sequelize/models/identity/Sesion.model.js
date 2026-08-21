import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class Sesion extends Model {}

Sesion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    usuarioId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'usuario_id',
    },

    refreshTokenHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'refresh_token_hash',
    },

    status: {
      type: DataTypes.ENUM('ACTIVE', 'REVOKED', 'EXPIRED'),
      allowNull: false,
      defaultValue: 'ACTIVE',
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expires_at',
    },

    revokedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'revoked_at',
    },

    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'ip_address',
    },

    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'user_agent',
    },

    deviceInfo: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: 'device_info',
    },

    lastUsedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_used_at',
    },
  },
  {
    sequelize,
    modelName: 'Sesion',
    tableName: 'sesiones',
    ...baseModelOptions,

    indexes: [
      {
        name: 'idx_sesiones_usuario_id',
        fields: ['usuario_id'],
      },

      {
        name: 'idx_sesiones_expires_at',
        fields: ['expires_at'],
      },

      {
        name: 'idx_sesiones_revoked_at',
        fields: ['revoked_at'],
      },
    ],
  },
);
