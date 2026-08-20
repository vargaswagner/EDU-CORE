import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class Estudiante extends Model {}

Estudiante.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    codigo_estudiante: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },

    estado: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'ACTIVO',
    },

    fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    fecha_egreso: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    fecha_retiro: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Estudiante',
    tableName: 'estudiantes',
    ...baseModelOptions,

    indexes: [
      {
        unique: true,
        fields: ['codigo_estudiante'],
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
