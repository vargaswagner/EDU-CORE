import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';

export class MovimientoCaja extends Model {}

MovimientoCaja.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    sesion_caja_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    tipo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    concepto: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    monto: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    metodo_pago_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    pago_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'MovimientoCaja',
    tableName: 'movimientos_caja',

    timestamps: true,
    underscored: true,
    freezeTableName: true,

    indexes: [
      {
        fields: ['sesion_caja_id'],
      },
      {
        fields: ['pago_id'],
      },
      {
        fields: ['fecha'],
      },
    ],
  },
);
