// src/modules/auth/domain/exceptions/authorization.exception.js

export class AuthorizationException extends Error {
  constructor(message = 'No autorizado.') {
    super(message);

    this.name = 'AuthorizationException';

    this.code = 'AUTHORIZATION_FAILED';

    this.statusCode = 403;
  }
}
