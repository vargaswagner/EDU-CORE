import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class Seccion extends Model {}

Seccion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    periodo_academico_id: {
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

    docente_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    aula_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    turno_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    modalidad_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    codigo: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    inscritos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    estado: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'PLANIFICADA',
    },
  },
  {
    sequelize,
    modelName: 'Seccion',
    tableName: 'secciones',
    ...baseModelOptions,

    indexes: [
      {
        unique: true,
        fields: ['periodo_academico_id', 'codigo'],
      },
      {
        fields: ['periodo_academico_id', 'curso_id'],
      },
      {
        fields: ['docente_id'],
      },
    ],
  },
);
