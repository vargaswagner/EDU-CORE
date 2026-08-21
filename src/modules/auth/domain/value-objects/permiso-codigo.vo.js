// src/modules/auth/domain/value-objects/permiso-codigo.vo.js

export class PermisoCodigo {
  #value;

  constructor(value) {
    if (typeof value !== 'string') {
      throw new Error('El código del permiso debe ser texto.');
    }

    const normalized = value.trim().toLowerCase();

    if (!normalized) {
      throw new Error('El código del permiso es obligatorio.');
    }

    if (!/^[a-z0-9]+(\.[a-z0-9_-]+)+$/.test(normalized)) {
      throw new Error('Formato de código de permiso inválido.');
    }

    if (normalized.length > 150) {
      throw new Error('El código del permiso es demasiado largo.');
    }

    this.#value = normalized;
  }

  get value() {
    return this.#value;
  }

  equals(other) {
    return other instanceof PermisoCodigo && this.#value === other.value;
  }

  toString() {
    return this.#value;
  }
}
