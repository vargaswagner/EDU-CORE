import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';

export class SesionCaja extends Model {}

SesionCaja.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    caja_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    fecha_apertura: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    saldo_inicial: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },

    fecha_cierre: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    saldo_teorico: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },

    saldo_real: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },

    diferencia: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },

    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'ABIERTA',
    },
  },
  {
    sequelize,
    modelName: 'SesionCaja',
    tableName: 'sesiones_caja',

    timestamps: true,
    underscored: true,
    freezeTableName: true,

    indexes: [
      {
        fields: ['caja_id', 'estado'],
      },
    ],
  },
);
