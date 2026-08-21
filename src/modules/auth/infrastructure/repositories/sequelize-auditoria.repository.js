// src/modules/auth/infrastructure/repositories/sequelize-auditoria.repository.js

import { AuditoriaSeguridadRepository } from '../../application/repositories/auditoria-seguridad.repository.js';

import { AuditoriaSeguridadMapper } from '../mappers/auditoria-seguridad.mapper.js';

export class SequelizeAuditoriaSeguridadRepository extends AuditoriaSeguridadRepository {
  constructor({ AuditoriaSeguridadModel }) {
    super();

    this.AuditoriaSeguridadModel = AuditoriaSeguridadModel;
  }

  async create(entity, options = {}) {
    const data = AuditoriaSeguridadMapper.toPersistence(entity);

    const model = await this.AuditoriaSeguridadModel.create(data, options);

    return AuditoriaSeguridadMapper.toDomain(model);
  }

  async findByUsuarioId(usuarioId, options = {}) {
    const models = await this.AuditoriaSeguridadModel.findAll({
      ...options,

      where: {
        usuarioId,
      },

      order: [['createdAt', 'DESC']],
    });

    return models.map((model) => AuditoriaSeguridadMapper.toDomain(model));
  }

  async findBySessionId(sessionId, options = {}) {
    const models = await this.AuditoriaSeguridadModel.findAll({
      ...options,

      where: {
        sessionId,
      },

      order: [['createdAt', 'DESC']],
    });

    return models.map((model) => AuditoriaSeguridadMapper.toDomain(model));
  }
}
