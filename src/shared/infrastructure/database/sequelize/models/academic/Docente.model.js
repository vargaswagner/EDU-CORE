import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class Docente extends Model {}

Docente.init(
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

    codigo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },

    especialidad: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'ACTIVO',
    },
  },
  {
    sequelize,
    modelName: 'Docente',
    tableName: 'docentes',
    ...baseModelOptions,

    indexes: [
      {
        unique: true,
        fields: ['codigo'],
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
