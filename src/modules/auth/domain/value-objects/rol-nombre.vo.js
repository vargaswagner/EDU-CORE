// src/modules/auth/domain/value-objects/rol-nombre.vo.js

export class RolNombre {
  #value;

  constructor(value) {
    if (typeof value !== 'string') {
      throw new Error('El nombre del rol debe ser texto.');
    }

    const normalized = value.trim();

    if (!normalized) {
      throw new Error('El nombre del rol no puede estar vacío.');
    }

    if (normalized.length > 100) {
      throw new Error('El nombre del rol no puede superar los 100 caracteres.');
    }

    this.#value = normalized;
  }

  get value() {
    return this.#value;
  }

  equals(other) {
    return other instanceof RolNombre && this.#value === other.value;
  }

  toString() {
    return this.#value;
  }
}
