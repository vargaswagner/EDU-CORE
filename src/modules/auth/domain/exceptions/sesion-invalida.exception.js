export class SesionInvalidaException extends Error {
  constructor(message = 'La sesión no es válida o ha expirado.') {
    super(message);

    this.name = 'SesionInvalidaException';

    this.code = 'INVALID_SESSION';
  }
}
