// src/modules/auth/infrastructure/mappers/permiso.mapper.js

import { Permiso } from '../../domain/entities/permiso.entity.js';

export class PermisoMapper {
  static toDomain(model) {
    if (!model) {
      return null;
    }

    const data = model.get({
      plain: true,
    });

    return new Permiso({
      id: data.id,
      codigo: data.codigo,
      nombre: data.nombre,
      descripcion: data.descripcion,
      modulo: data.modulo,
      accion: data.accion,
      status: data.status,
      systemPermission: data.systemPermission,
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
      modulo: entity.modulo,
      accion: entity.accion,
      status: entity.status,
      systemPermission: entity.systemPermission,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
