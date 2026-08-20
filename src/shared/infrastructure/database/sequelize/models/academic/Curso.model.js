import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class Curso extends Model {}

Curso.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    codigo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },

    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    horas_teoricas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    horas_practicas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    creditos: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },

    tipo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'OBLIGATORIO',
    },

    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'ACTIVO',
    },
  },
  {
    sequelize,
    modelName: 'Curso',
    tableName: 'cursos',
    ...baseModelOptions,

    indexes: [
      {
        unique: true,
        fields: ['codigo'],
      },
      {
        fields: ['nombre'],
      },
    ],
  },
);
