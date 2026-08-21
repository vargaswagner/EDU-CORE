// src/modules/auth/domain/entities/rol.entity.js

import crypto from 'node:crypto';

export const ROLE_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
});

export class Rol {
  #id;
  #codigo;
  #nombre;
  #descripcion;
  #status;
  #systemRole;
  #createdAt;
  #updatedAt;

  constructor({
    id = crypto.randomUUID(),
    codigo,
    nombre,
    descripcion = null,
    status = ROLE_STATUS.ACTIVE,
    systemRole = false,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (!codigo) {
      throw new Error('El código del rol es obligatorio.');
    }

    if (!nombre) {
      throw new Error('El nombre del rol es obligatorio.');
    }

    if (!Object.values(ROLE_STATUS).includes(status)) {
      throw new Error('Estado de rol inválido.');
    }

    this.#id = id;
    this.#codigo = codigo.trim().toUpperCase();
    this.#nombre = nombre.trim();
    this.#descripcion = descripcion;
    this.#status = status;
    this.#systemRole = Boolean(systemRole);
    this.#createdAt = new Date(createdAt);
    this.#updatedAt = new Date(updatedAt);
  }

  get id() {
    return this.#id;
  }

  get codigo() {
    return this.#codigo;
  }

  get nombre() {
    return this.#nombre;
  }

  get descripcion() {
    return this.#descripcion;
  }

  get status() {
    return this.#status;
  }

  get systemRole() {
    return this.#systemRole;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  isActive() {
    return this.#status === ROLE_STATUS.ACTIVE;
  }

  activate() {
    this.#status = ROLE_STATUS.ACTIVE;

    this.#touch();
  }

  deactivate() {
    this.#status = ROLE_STATUS.INACTIVE;

    this.#touch();
  }

  #touch() {
    this.#updatedAt = new Date();
  }
}
