// src/modules/auth/infrastructure/mappers/sesion.mapper.js

import { Sesion } from '../../domain/entities/sesion.entity.js';

export class SesionMapper {
  static toDomain(model) {
    if (!model) {
      return null;
    }

    const data = model.get({
      plain: true,
    });

    return new Sesion({
      id: data.id,
      usuarioId: data.usuarioId,
      refreshTokenHash: data.refreshTokenHash,
      status: data.status,
      expiresAt: data.expiresAt,
      revokedAt: data.revokedAt,
      createdAt: data.createdAt,
      lastUsedAt: data.lastUsedAt,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      deviceInfo: data.deviceInfo,
      updatedAt: data.updatedAt,
    });
  }

  static toPersistence(entity) {
    return {
      id: entity.id,
      usuarioId: entity.usuarioId,
      refreshTokenHash: entity.refreshTokenHash,
      status: entity.status,
      expiresAt: entity.expiresAt,
      revokedAt: entity.revokedAt,
      createdAt: entity.createdAt,
      lastUsedAt: entity.lastUsedAt,
      ipAddress: entity.ipAddress,
      userAgent: entity.userAgent,
      deviceInfo: entity.deviceInfo,
      updatedAt: entity.updatedAt,
    };
  }
}
