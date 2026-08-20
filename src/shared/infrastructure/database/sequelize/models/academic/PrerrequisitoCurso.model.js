import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class PrerrequisitoCurso extends Model {}

PrerrequisitoCurso.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    curso_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    curso_prerrequisito_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    tipo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'OBLIGATORIO',
    },
  },
  {
    sequelize,
    modelName: 'PrerrequisitoCurso',
    tableName: 'prerrequisitos_cursos',
    ...baseModelOptions,

    indexes: [
      {
        unique: true,
        fields: ['curso_id', 'curso_prerrequisito_id'],
      },
    ],
  },
);
