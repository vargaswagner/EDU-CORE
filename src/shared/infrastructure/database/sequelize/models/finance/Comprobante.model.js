import { DataTypes, Model } from 'sequelize';
import sequelize from '../../sequelize.js';

class Comprobante extends Model {}

Comprobante.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    pago_id: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'pago_id',
    },

    tipo: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    serie: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    numero: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    fechaEmision: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'fecha_emision',
    },

    montoTotal: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: 'monto_total',
    },

    moneda: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'PEN',
    },

    estado: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'EMITIDO',
    },

    archivoUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'archivo_url',
    },

    archivoTipo: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'archivo_tipo',
    },

    archivoNombre: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'archivo_nombre',
    },

    hashDocumento: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'hash_documento',
    },

    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Comprobante',
    tableName: 'comprobantes',

    timestamps: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',

    indexes: [
      {
        unique: true,
        fields: ['serie', 'numero'],
        name: 'uq_comprobantes_serie_numero',
      },
      {
        fields: ['pago_id'],
        name: 'idx_comprobantes_pago',
      },
      {
        fields: ['fecha_emision'],
        name: 'idx_comprobantes_fecha_emision',
      },
      {
        fields: ['estado'],
        name: 'idx_comprobantes_estado',
      },
    ],
  },
);

export default Comprobante;
