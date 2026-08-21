// src/modules/auth/application/services/authorization.service.js

import { InsufficientPermissionException } from '../../domain/exceptions/insufficient-permission.exception.js';

export class AuthorizationService {
  constructor({ usuarioRepository, rolRepository, permisoRepository }) {
    this.usuarioRepository = usuarioRepository;

    this.rolRepository = rolRepository;

    this.permisoRepository = permisoRepository;
  }

  async getUserPermissions(usuarioId) {
    const roles = await this.usuarioRepository.findRolesByUserId(usuarioId);

    if (!roles?.length) {
      return [];
    }

    const permissionCodes = new Set();

    for (const role of roles) {
      if (!role.isActive()) {
        continue;
      }

      const permissions = await this.permisoRepository.findByRoleId(role.id);

      for (const permission of permissions) {
        if (permission.isActive()) {
          permissionCodes.add(permission.codigo);
        }
      }
    }

    return [...permissionCodes];
  }

  async hasPermission(usuarioId, permission) {
    const permissions = await this.getUserPermissions(usuarioId);

    return permissions.includes(permission);
  }

  async authorize(usuarioId, permission) {
    const authorized = await this.hasPermission(usuarioId, permission);

    if (!authorized) {
      throw new InsufficientPermissionException(permission);
    }

    return true;
  }
}
