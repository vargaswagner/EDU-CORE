import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    persona_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },

    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 50],
      },
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'ACTIVO',
      validate: {
        isIn: [['ACTIVO', 'INACTIVO', 'BLOQUEADO', 'SUSPENDIDO']],
      },
    },

    ultimo_acceso_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    ...baseModelOptions,

    indexes: [
      {
        unique: true,
        fields: ['username'],
      },
      {
        unique: true,
        fields: ['email'],
      },
      {
        unique: true,
        fields: ['persona_id'],
      },
      {
        fields: ['estado'],
      },
    ],
  },
);
