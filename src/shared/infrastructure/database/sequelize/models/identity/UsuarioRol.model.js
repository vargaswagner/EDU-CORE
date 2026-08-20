import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize.js';
import { baseModelOptions } from '../model-options.js';

export class UsuarioRol extends Model {}

UsuarioRol.init(
  {
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },

    rol_id: {
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
    modelName: 'UsuarioRol',
    tableName: 'usuarios_roles',
    ...baseModelOptions,

    indexes: [
      {
        fields: ['rol_id'],
      },
    ],
  },
);
