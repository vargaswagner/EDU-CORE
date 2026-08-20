import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class Ciclo extends Model {}

Ciclo.init(
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

    plan_estudios_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'ACTIVO',
    },
  },
  {
    sequelize,
    modelName: 'Ciclo',
    tableName: 'ciclos',
    ...baseModelOptions,

    indexes: [
      {
        unique: true,
        fields: ['plan_estudios_id', 'numero'],
      },
    ],
  },
);
