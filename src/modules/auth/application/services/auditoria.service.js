// src/modules/auth/application/services/auditoria.service.js

import crypto from 'node:crypto';

import { AuditoriaSeguridad } from '../../domain/entities/auditoria-seguridad.entity.js';

export class AuditoriaService {
  constructor({ auditoriaRepository }) {
    this.auditoriaRepository = auditoriaRepository;
  }

  async record({
    usuarioId = null,
    sessionId = null,
    eventType,
    success = true,
    ipAddress = null,
    userAgent = null,
    requestId = null,
    metadata = {},
  }) {
    const auditoria = new AuditoriaSeguridad({
      id: crypto.randomUUID(),
      usuarioId,
      sessionId,
      eventType,
      success,
      ipAddress,
      userAgent,
      requestId,
      metadata,
    });

    return this.auditoriaRepository.create(auditoria);
  }
}
