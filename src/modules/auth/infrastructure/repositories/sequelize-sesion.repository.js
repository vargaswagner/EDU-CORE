// src/modules/auth/infrastructure/repositories/sequelize-sesion.repository.js

import { SesionRepository } from '../../application/repositories/sesion.repository.js';

import { SesionMapper } from '../mappers/sesion.mapper.js';

import { SESSION_STATUS } from '../../domain/entities/sesion.entity.js';

export class SequelizeSesionRepository extends SesionRepository {
  constructor({ SesionModel }) {
    super();

    this.SesionModel = SesionModel;
  }

  async findById(id) {
    const model = await this.SesionModel.findByPk(id);

    return SesionMapper.toDomain(model);
  }

  async findActiveById(id) {
    const model = await this.SesionModel.findOne({
      where: {
        id,
        status: SESSION_STATUS.ACTIVE,
      },
    });

    return SesionMapper.toDomain(model);
  }

  async findByUserId(usuarioId) {
    const models = await this.SesionModel.findAll({
      where: {
        usuarioId,
      },
    });

    return models.map((model) => SesionMapper.toDomain(model));
  }

  async create(entity, options = {}) {
    const data = SesionMapper.toPersistence(entity);

    const model = await this.SesionModel.create(data, options);

    return SesionMapper.toDomain(model);
  }

  async update(entity, options = {}) {
    const data = SesionMapper.toPersistence(entity);

    const [affectedRows] = await this.SesionModel.update(data, {
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

  async revokeAllByUserId(usuarioId, options = {}) {
    const [affectedRows] = await this.SesionModel.update(
      {
        status: SESSION_STATUS.REVOKED,
        revokedAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ...options,
        where: {
          usuarioId,
          status: SESSION_STATUS.ACTIVE,
        },
      },
    );

    return affectedRows;
  }
}
