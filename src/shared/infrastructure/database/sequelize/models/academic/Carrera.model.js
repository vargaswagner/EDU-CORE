import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class Carrera extends Model {}

Carrera.init(
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

    // nivel: {
    //   type: DataTypes.STRING(50),
    //   allowNull: false,
    //   defaultValue: 'PROFESIONAL_TECNICO',
    // },

    duracion_periodos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    creditos_totales: {
      type: DataTypes.DECIMAL(6, 2),
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
    modelName: 'Carrera',
    tableName: 'carreras',
    ...baseModelOptions,

    indexes: [
      {
        unique: true,
        fields: ['codigo'],
      },
      {
        fields: ['estado'],
      },
    ],
  },
);
