export class UsuarioBloqueadoException extends Error {
  constructor(message = 'El usuario está bloqueado.') {
    super(message);

    this.name = 'UsuarioBloqueadoException';

    this.code = 'USER_BLOCKED';
  }
}
