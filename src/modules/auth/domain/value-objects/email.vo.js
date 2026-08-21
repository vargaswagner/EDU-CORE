export class Email {
  #value;

  constructor(value) {
    const normalized = Email.normalize(value);

    if (!Email.isValid(normalized)) {
      throw new Error('El correo electrónico no es válido.');
    }

    this.#value = normalized;
  }

  get value() {
    return this.#value;
  }

  equals(other) {
    return other instanceof Email && this.#value === other.value;
  }

  toString() {
    return this.#value;
  }

  static normalize(value) {
    if (typeof value !== 'string') {
      throw new Error('El correo electrónico debe ser una cadena.');
    }

    return value.trim().toLowerCase();
  }

  static isValid(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}
