import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class ConceptoPago extends Model {}

ConceptoPago.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    codigo: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },

    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    tipo: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },

    monto_base: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },

    moneda: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'PEN',
    },

    permite_descuento: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    permite_mora: {
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
    modelName: 'ConceptoPago',
    tableName: 'conceptos_pago',
    ...baseModelOptions,
  },
);
