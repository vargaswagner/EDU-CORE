// src/modules/auth/domain/entities/auditoria-seguridad.entity.js

import crypto from 'node:crypto';

export class AuditoriaSeguridad {
  #id;
  #usuarioId;
  #sessionId;
  #eventType;
  #success;
  #ipAddress;
  #userAgent;
  #requestId;
  #metadata;
  #createdAt;

  constructor({
    id = crypto.randomUUID(),
    usuarioId = null,
    sessionId = null,
    eventType,
    success = true,
    ipAddress = null,
    userAgent = null,
    requestId = null,
    metadata = {},
    createdAt = new Date(),
  }) {
    if (!eventType) {
      throw new Error('El tipo de evento de auditoría es obligatorio.');
    }

    if (
      typeof metadata !== 'object' ||
      metadata === null ||
      Array.isArray(metadata)
    ) {
      throw new Error('Metadata de auditoría inválida.');
    }

    this.#id = id;
    this.#usuarioId = usuarioId;
    this.#sessionId = sessionId;
    this.#eventType = eventType;
    this.#success = Boolean(success);
    this.#ipAddress = ipAddress;
    this.#userAgent = userAgent;
    this.#requestId = requestId;
    this.#metadata = Object.freeze({
      ...metadata,
    });
    this.#createdAt = new Date(createdAt);
  }

  get id() {
    return this.#id;
  }

  get usuarioId() {
    return this.#usuarioId;
  }

  get sessionId() {
    return this.#sessionId;
  }

  get eventType() {
    return this.#eventType;
  }

  get success() {
    return this.#success;
  }

  get ipAddress() {
    return this.#ipAddress;
  }

  get userAgent() {
    return this.#userAgent;
  }

  get requestId() {
    return this.#requestId;
  }

  get metadata() {
    return this.#metadata;
  }

  get createdAt() {
    return this.#createdAt;
  }
}
