// src/modules/auth/domain/entities/permiso.entity.js

import crypto from 'node:crypto';

export const PERMISSION_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
});

export class Permiso {
  #id;
  #codigo;
  #nombre;
  #descripcion;
  #modulo;
  #accion;
  #status;
  #systemPermission;
  #createdAt;
  #updatedAt;

  constructor({
    id = crypto.randomUUID(),
    codigo,
    nombre,
    descripcion = null,
    modulo,
    accion,
    status = PERMISSION_STATUS.ACTIVE,
    systemPermission = false,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (!codigo) {
      throw new Error('El código del permiso es obligatorio.');
    }

    if (!nombre) {
      throw new Error('El nombre del permiso es obligatorio.');
    }

    if (!modulo) {
      throw new Error('El módulo del permiso es obligatorio.');
    }

    if (!accion) {
      throw new Error('La acción del permiso es obligatoria.');
    }

    if (!Object.values(PERMISSION_STATUS).includes(status)) {
      throw new Error('Estado de permiso inválido.');
    }

    this.#id = id;

    this.#codigo = codigo.trim().toLowerCase();

    this.#nombre = nombre.trim();

    this.#descripcion = descripcion;

    this.#modulo = modulo.trim().toLowerCase();

    this.#accion = accion.trim().toLowerCase();

    this.#status = status;

    this.#systemPermission = Boolean(systemPermission);

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

  get modulo() {
    return this.#modulo;
  }

  get accion() {
    return this.#accion;
  }

  get status() {
    return this.#status;
  }

  get systemPermission() {
    return this.#systemPermission;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  isActive() {
    return this.#status === PERMISSION_STATUS.ACTIVE;
  }

  activate() {
    this.#status = PERMISSION_STATUS.ACTIVE;

    this.#touch();
  }

  deactivate() {
    this.#status = PERMISSION_STATUS.INACTIVE;

    this.#touch();
  }

  #touch() {
    this.#updatedAt = new Date();
  }
}
