import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class Rol extends Model {}

Rol.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'ACTIVO',

      validate: {
        isIn: [['ACTIVO', 'INACTIVO']],
      },
    },
  },
  {
    sequelize,
    modelName: 'Rol',
    tableName: 'roles',
    ...baseModelOptions,

    indexes: [
      {
        unique: true,
        fields: ['codigo'],
      },
      {
        fields: ['estado'],
      },
    ],
  },
);
