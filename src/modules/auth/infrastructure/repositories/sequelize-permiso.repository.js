// src/modules/auth/infrastructure/repositories/sequelize-permiso.repository.js

import { PermisoRepository } from '../../application/repositories/permiso.repository.js';

import { PermisoMapper } from '../mappers/permiso.mapper.js';

import { PERMISSION_STATUS } from '../../domain/entities/permiso.entity.js';

export class SequelizePermisoRepository extends PermisoRepository {
  constructor({ PermisoModel }) {
    super();

    this.PermisoModel = PermisoModel;
  }

  async findById(id) {
    const model = await this.PermisoModel.findByPk(id);

    return PermisoMapper.toDomain(model);
  }

  async findByCodigo(codigo) {
    const model = await this.PermisoModel.findOne({
      where: {
        codigo: codigo.trim().toLowerCase(),
      },
    });

    return PermisoMapper.toDomain(model);
  }

  async findActiveByCodigo(codigo) {
    const model = await this.PermisoModel.findOne({
      where: {
        codigo: codigo.trim().toLowerCase(),

        status: PERMISSION_STATUS.ACTIVE,
      },
    });

    return PermisoMapper.toDomain(model);
  }

  async findAll() {
    const models = await this.PermisoModel.findAll({
      order: [
        ['modulo', 'ASC'],
        ['accion', 'ASC'],
      ],
    });

    return models.map((model) => PermisoMapper.toDomain(model));
  }

  async findByRoleId(rolId) {
    const models = await this.PermisoModel.findAll({
      include: [
        {
          association: 'roles',
          where: {
            id: rolId,
          },
          through: {
            attributes: [],
          },
          required: true,
        },
      ],

      where: {
        status: PERMISSION_STATUS.ACTIVE,
      },

      order: [
        ['modulo', 'ASC'],
        ['accion', 'ASC'],
      ],
    });

    return models.map((model) => PermisoMapper.toDomain(model));
  }

  async create(entity, options = {}) {
    const data = PermisoMapper.toPersistence(entity);

    const model = await this.PermisoModel.create(data, options);

    return PermisoMapper.toDomain(model);
  }

  async update(entity, options = {}) {
    const data = PermisoMapper.toPersistence(entity);

    const [affectedRows] = await this.PermisoModel.update(data, {
      ...options,
      where: {
        id: entity.id,
      },
    });

    if (affectedRows === 0) {
      return null;
    }

    return this.findById(entity.id);
  }
}
