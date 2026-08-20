import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class RolPermiso extends Model {}

RolPermiso.init(
  {
    rol_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },

    permiso_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },

    // assigned_at: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
  },
  {
    sequelize,
    modelName: 'RolPermiso',
    tableName: 'roles_permisos',
    ...baseModelOptions,

    indexes: [
      {
        fields: ['permiso_id'],
      },
    ],
  },
);
