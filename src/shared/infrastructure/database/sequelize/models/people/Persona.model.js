import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class Persona extends Model {}

Persona.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    tipo_documento: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'DNI',
    },

    numero_documento: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    apellido_paterno: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    apellido_materno: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    direccion: {
      type: DataTypes.STRING(250),
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
    modelName: 'Persona',
    tableName: 'personas',
    ...baseModelOptions,

    indexes: [
      {
        unique: true,
        fields: ['numero_documento'],
      },
      {
        fields: ['email'],
      },
      {
        fields: ['estado'],
      },
    ],
  },
);
