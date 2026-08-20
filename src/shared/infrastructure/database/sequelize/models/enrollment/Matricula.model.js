import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';

export class Matricula extends Model {}

Matricula.init(
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

    estudiante_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    periodo_academico_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    plan_estudios_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    fecha_matricula: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    tipo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'REGULAR',
    },

    estado: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'PENDIENTE',
    },

    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    usuario_registro_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    fecha_anulacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    motivo_anulacion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Matricula',
    tableName: 'matriculas',

    timestamps: true,
    underscored: true,
    freezeTableName: true,

    indexes: [
      {
        unique: true,
        fields: ['codigo'],
      },
      {
        unique: true,
        fields: ['estudiante_id', 'periodo_academico_id'],
      },
      {
        fields: ['estado'],
      },
    ],
  },
);
