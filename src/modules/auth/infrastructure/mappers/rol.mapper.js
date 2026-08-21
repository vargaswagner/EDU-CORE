// src/modules/auth/infrastructure/mappers/rol.mapper.js

import { Rol } from '../../domain/entities/rol.entity.js';

export class RolMapper {
  static toDomain(model) {
    if (!model) {
      return null;
    }

    const data = model.get({
      plain: true,
    });

    return new Rol({
      id: data.id,
      codigo: data.codigo,
      nombre: data.nombre,
      descripcion: data.descripcion,
      status: data.status,
      systemRole: data.systemRole,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toPersistence(entity) {
    return {
      id: entity.id,
      codigo: entity.codigo,
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      status: entity.status,
      systemRole: entity.systemRole,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
