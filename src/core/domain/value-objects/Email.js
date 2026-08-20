import { ValueObject } from './ValueObject.js';

export class Email extends ValueObject {
  constructor(value) {
    const normalized = String(value).trim().toLowerCase();

    if (!Email.isValid(normalized)) {
      throw new Error('Correo electrónico inválido');
    }

    super(normalized);
  }

  static isValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  toString() {
    return this.value;
  }
}
