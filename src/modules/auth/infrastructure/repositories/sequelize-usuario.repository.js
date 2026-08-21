// src/modules/auth/infrastructure/repositories/sequelize-usuario.repository.js

import { UsuarioRepository } from '../../application/repositories/usuario.repository.js';

import { UsuarioMapper } from '../mappers/usuario.mapper.js';

export class SequelizeUsuarioRepository extends UsuarioRepository {
  constructor({ UsuarioModel }) {
    super();

    this.UsuarioModel = UsuarioModel;
  }

  async findById(id) {
    const model = await this.UsuarioModel.findByPk(id);

    return UsuarioMapper.toDomain(model);
  }

  async findByEmail(email) {
    const model = await this.UsuarioModel.findOne({
      where: {
        email,
      },
    });

    return UsuarioMapper.toDomain(model);
  }

  async existsByEmail(email) {
    const count = await this.UsuarioModel.count({
      where: {
        email,
      },
    });

    return count > 0;
  }

  async save(entity, options = {}) {
    const data = UsuarioMapper.toPersistence(entity);

    const model = await this.UsuarioModel.create(data, options);

    return UsuarioMapper.toDomain(model);
  }

  async update(entity, options = {}) {
    const data = UsuarioMapper.toPersistence(entity);

    const [affectedRows] = await this.UsuarioModel.update(data, {
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
