export class CredencialesInvalidasException extends Error {
  constructor(message = 'Las credenciales proporcionadas no son válidas.') {
    super(message);

    this.name = 'CredencialesInvalidasException';

    this.code = 'INVALID_CREDENTIALS';
  }
}
