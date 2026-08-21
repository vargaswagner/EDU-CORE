import crypto from 'node:crypto';

export const USER_STATUS = Object.freeze({
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVO',
  INACTIVE: 'INACTIVE',
  BLOCKED: 'BLOCKED',
});

export class Usuario {
  #id;
  #personaId;
  #username;
  #email;
  #passwordHash;
  #estado;
  #ultimoAccesoAt;
  #createdAt;
  #updatedAt;

  constructor({
    id = crypto.randomUUID(),
    personaId,
    username,
    email,
    passwordHash,
    estado = USER_STATUS.PENDING,
    ultimoAccesoAt = null,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (!email) {
      throw new Error('El correo electrónico es obligatorio.');
    }

    if (!passwordHash) {
      throw new Error('El hash de contraseña es obligatorio.');
    }

    if (!Object.values(USER_STATUS).includes(estado)) {
      throw new Error('Estado de usuario inválido.');
    }

    // if (!Number.isInteger(failedLoginAttempts) || failedLoginAttempts < 0) {
    //   throw new Error('Cantidad de intentos fallidos inválida.');
    // }

    this.#id = id;
    this.#personaId = personaId;
    this.#username = username;
    this.#email = email;
    this.#passwordHash = passwordHash;
    this.#estado = estado;
    this.#ultimoAccesoAt = ultimoAccesoAt;
    // this.#lastLoginAt = lastLoginAt;
    // this.#failedLoginAttempts = failedLoginAttempts;
    // this.#blockedAt = blockedAt;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  get id() {
    return this.#id;
  }

  get email() {
    return this.#email;
  }

  get passwordHash() {
    return this.#passwordHash;
  }

  get estado() {
    return this.#estado;
  }

  get ultimoAccesoAt() {
    return this.#ultimoAccesoAt;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  isActive() {
    return this.#estado === USER_STATUS.ACTIVE;
  }

  isBlocked() {
    return this.#estado === USER_STATUS.BLOCKED;
  }

  isPending() {
    return this.#estado === USER_STATUS.PENDING;
  }

  isInactive() {
    return this.#estado === USER_STATUS.INACTIVE;
  }

  activate() {
    this.#estado = USER_STATUS.ACTIVE;
    // this.#blockedAt = null;
    // this.#failedLoginAttempts = 0;
    this.#touch();
  }

  deactivate() {
    this.#estado = USER_STATUS.INACTIVE;
    this.#touch();
  }

  block() {
    this.#estado = USER_STATUS.BLOCKED;
    // this.#blockedAt = new Date();
    this.#touch();
  }

  unblock() {
    this.#estado = USER_STATUS.ACTIVE;
    // this.#blockedAt = null;
    // this.#failedLoginAttempts = 0;
    this.#touch();
  }

  registerFailedLoginAttempt() {
    // this.#failedLoginAttempts += 1;
    this.#touch();
  }

  resetFailedLoginAttempts() {
    // this.#failedLoginAttempts = 0;
    this.#touch();
  }

  registerSuccessfulLogin() {
    this.#ultimoAccesoAt = new Date();
    // this.#failedLoginAttempts = 0;
    this.#touch();
  }

  changePassword(passwordHash) {
    if (!passwordHash) {
      throw new Error('El hash de contraseña es obligatorio.');
    }

    this.#passwordHash = passwordHash;
    this.#touch();
  }

  #touch() {
    this.#updatedAt = new Date();
  }
}
