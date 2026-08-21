// src/modules/auth/infrastructure/mappers/usuario.mapper.js

import { Usuario } from '../../domain/entities/usuario.entity.js';

export class UsuarioMapper {
  static toDomain(model) {
    if (!model) {
      return null;
    }

    const data = model.get({
      plain: true,
    });

    return new Usuario({
      id: data.id,
      personaId: data.persona_id,
      username: data.username,
      email: data.email,
      passwordHash: data.password_hash,
      estado: data.estado,
      ultimoAccesoAt: data.ultimo_acceso_at,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toPersistence(entity) {
    return {
      id: entity.id,
      persona_id: entity.personaId,
      username: entity.username,
      email: entity.email,
      password_hash: entity.passwordHash,
      estado: entity.estado,
      ultimo_acceso_at: entity.ultimoAccesoAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
