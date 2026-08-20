import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';

export class CronogramaPago extends Model {}

CronogramaPago.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    matricula_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },

    codigo: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },

    fecha_generacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    moneda: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'PEN',
    },

    total: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    estado: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'ACTIVO',
    },
  },
  {
    sequelize,
    modelName: 'CronogramaPago',
    tableName: 'cronogramas_pago',

    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
);
