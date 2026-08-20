import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class MetodoPago extends Model {}

MetodoPago.init(
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
      type: DataTypes.STRING(80),
      allowNull: false,
    },

    tipo: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    requiere_referencia: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'ACTIVO',
    },
  },
  {
    sequelize,
    modelName: 'MetodoPago',
    tableName: 'metodos_pago',
    ...baseModelOptions,
  },
);
