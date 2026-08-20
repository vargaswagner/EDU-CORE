import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class Aula extends Model {}

Aula.init(
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

    tipo: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    ubicacion: {
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
    modelName: 'Aula',
    tableName: 'aulas',
    ...baseModelOptions,
  },
);
