// src/modules/auth/infrastructure/repositories/sequelize-rol.repository.js

import { RolRepository } from '../../application/repositories/rol.repository.js';

import { RolMapper } from '../mappers/rol.mapper.js';

import { ROLE_STATUS } from '../../domain/entities/rol.entity.js';

export class SequelizeRolRepository extends RolRepository {
  constructor({ RolModel }) {
    super();

    this.RolModel = RolModel;
  }

  async findById(id) {
    const model = await this.RolModel.findByPk(id);

    return RolMapper.toDomain(model);
  }

  async findByCodigo(codigo) {
    const model = await this.RolModel.findOne({
      where: {
        codigo: codigo.trim().toUpperCase(),
      },
    });

    return RolMapper.toDomain(model);
  }

  async findActiveByCodigo(codigo) {
    const model = await this.RolModel.findOne({
      where: {
        codigo: codigo.trim().toUpperCase(),

        status: ROLE_STATUS.ACTIVE,
      },
    });

    return RolMapper.toDomain(model);
  }

  async findAll() {
    const models = await this.RolModel.findAll({
      order: [['nombre', 'ASC']],
    });

    return models.map((model) => RolMapper.toDomain(model));
  }

  async create(entity, options = {}) {
    const data = RolMapper.toPersistence(entity);

    const model = await this.RolModel.create(data, options);

    return RolMapper.toDomain(model);
  }

  async update(entity, options = {}) {
    const data = RolMapper.toPersistence(entity);

    const [affectedRows] = await this.RolModel.update(data, {
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
