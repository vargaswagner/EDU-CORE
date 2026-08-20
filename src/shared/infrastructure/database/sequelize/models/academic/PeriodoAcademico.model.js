import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class PeriodoAcademico extends Model {}

PeriodoAcademico.init(
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
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    fecha_inicio_matricula: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    fecha_fin_matricula: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    estado: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'PLANIFICADO',
    },
  },
  {
    sequelize,
    modelName: 'PeriodoAcademico',
    tableName: 'periodos_academicos',
    ...baseModelOptions,
  },
);
