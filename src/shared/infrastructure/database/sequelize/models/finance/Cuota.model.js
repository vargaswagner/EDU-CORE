import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';

export class Cuota extends Model {}

Cuota.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    cronograma_pago_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    concepto_pago_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    fecha_emision: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    fecha_vencimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    importe_original: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    descuento: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },

    monto_mora: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },

    importe_total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    importe_pagado: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },

    saldo: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    estado: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'PENDIENTE',
    },
  },
  {
    sequelize,
    modelName: 'Cuota',
    tableName: 'cuotas',

    timestamps: true,
    underscored: true,
    freezeTableName: true,

    indexes: [
      {
        unique: true,
        fields: ['cronograma_pago_id', 'numero'],
      },
      {
        fields: ['fecha_vencimiento', 'estado'],
      },
    ],
  },
);
