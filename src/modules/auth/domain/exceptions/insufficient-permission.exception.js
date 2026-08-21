// src/modules/auth/domain/exceptions/insufficient-permission.exception.js

import { AuthorizationException } from './authorization.exception.js';

export class InsufficientPermissionException extends AuthorizationException {
  constructor(permission = null) {
    super('No tienes permisos suficientes para realizar esta operación.');

    this.name = 'InsufficientPermissionException';

    this.code = 'INSUFFICIENT_PERMISSION';

    this.permission = permission;
  }
}
