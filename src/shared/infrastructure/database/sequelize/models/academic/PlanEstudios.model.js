import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class PlanEstudios extends Model {}

PlanEstudios.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    carrera_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    codigo: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    version: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    fecha_fin: {
      type: DataTypes.DATEONLY,
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
    modelName: 'PlanEstudios',
    tableName: 'planes_estudios',
    ...baseModelOptions,

    indexes: [
      {
        unique: true,
        fields: ['carrera_id', 'codigo'],
      },
      {
        fields: ['carrera_id'],
      },
    ],
  },
);
