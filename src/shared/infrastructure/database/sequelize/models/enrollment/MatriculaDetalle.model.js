import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';

export class MatriculaDetalle extends Model {}

MatriculaDetalle.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    matricula_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    seccion_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    curso_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    creditos: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },

    estado: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'MATRICULADO',
    },

    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'MatriculaDetalle',
    tableName: 'matriculas_detalles',

    timestamps: true,
    underscored: true,
    freezeTableName: true,

    indexes: [
      {
        unique: true,
        fields: ['matricula_id', 'seccion_id'],
      },
      {
        fields: ['curso_id'],
      },
    ],
  },
);
