// src/shared/infrastructure/security/password.service.js

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export class PasswordService {
  async hash(password) {
    this.#validatePassword(password);

    return bcrypt.hash(password, SALT_ROUNDS);
  }

  async compare(password, passwordHash) {
    if (typeof password !== 'string' || typeof passwordHash !== 'string') {
      return false;
    }

    return bcrypt.compare(password, passwordHash);
  }

  #validatePassword(password) {
    if (typeof password !== 'string' || password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }
  }
}
