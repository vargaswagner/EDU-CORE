// src/modules/auth/infrastructure/mappers/auditoria-seguridad.mapper.js

import { AuditoriaSeguridad } from '../../domain/entities/auditoria-seguridad.entity.js';

export class AuditoriaSeguridadMapper {
  static toDomain(model) {
    if (!model) {
      return null;
    }

    const data = model.get({
      plain: true,
    });

    return new AuditoriaSeguridad({
      id: data.id,
      usuarioId: data.usuarioId,
      sessionId: data.sessionId,
      eventType: data.eventType,
      success: data.success,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      requestId: data.requestId,
      metadata: data.metadata ?? {},
      createdAt: data.createdAt,
    });
  }

  static toPersistence(entity) {
    return {
      id: entity.id,
      usuarioId: entity.usuarioId,
      sessionId: entity.sessionId,
      eventType: entity.eventType,
      success: entity.success,
      ipAddress: entity.ipAddress,
      userAgent: entity.userAgent,
      requestId: entity.requestId,
      metadata: entity.metadata,
      createdAt: entity.createdAt,
    };
  }
}
