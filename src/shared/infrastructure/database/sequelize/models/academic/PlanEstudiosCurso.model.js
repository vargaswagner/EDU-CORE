import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class PlanEstudiosCurso extends Model {}

PlanEstudiosCurso.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    plan_estudios_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    curso_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    ciclo_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    orden: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    creditos: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },

    obligatorio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'ACTIVO',
    },
  },
  {
    sequelize,
    modelName: 'PlanEstudiosCurso',
    tableName: 'planes_estudios_cursos',
    ...baseModelOptions,

    indexes: [
      {
        unique: true,
        fields: ['plan_estudios_id', 'curso_id'],
      },
      {
        fields: ['ciclo_id'],
      },
    ],
  },
);
