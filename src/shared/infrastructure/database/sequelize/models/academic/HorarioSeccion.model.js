import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class HorarioSeccion extends Model {}

HorarioSeccion.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    seccion_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    aula_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    dia_semana: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'HorarioSeccion',
    tableName: 'horarios_secciones',
    ...baseModelOptions,

    indexes: [
      {
        fields: ['seccion_id', 'dia_semana'],
      },
    ],
  },
);
