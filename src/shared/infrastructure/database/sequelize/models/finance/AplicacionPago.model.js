import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';

export class AplicacionPago extends Model {}

AplicacionPago.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    pago_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    cuota_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    monto_aplicado: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    fecha_aplicacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'AplicacionPago',
    tableName: 'aplicaciones_pago',

    timestamps: true,
    underscored: true,
    freezeTableName: true,

    indexes: [
      {
        fields: ['pago_id'],
      },
      {
        fields: ['cuota_id'],
      },
    ],
  },
);
