export class Password {
  #value;

  constructor(value) {
    Password.validate(value);

    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  static validate(value) {
    if (typeof value !== 'string') {
      throw new Error('La contraseña debe ser una cadena.');
    }

    if (value.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }

    if (value.length > 128) {
      throw new Error('La contraseña no puede superar los 128 caracteres.');
    }
  }
}
