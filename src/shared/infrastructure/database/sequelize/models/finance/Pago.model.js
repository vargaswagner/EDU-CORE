import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';

export class Pago extends Model {}

Pago.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    numero_operacion: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },

    estudiante_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    monto: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    moneda: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'PEN',
    },

    metodo_pago_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    fecha_pago: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    estado: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'CONFIRMADO',
    },

    referencia: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    usuario_registro_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Pago',
    tableName: 'pagos',

    timestamps: true,
    underscored: true,
    freezeTableName: true,

    indexes: [
      {
        unique: true,
        fields: ['numero_operacion'],
      },
      {
        fields: ['estudiante_id'],
      },
      {
        fields: ['fecha_pago'],
      },
      {
        fields: ['estado'],
      },
    ],
  },
);
