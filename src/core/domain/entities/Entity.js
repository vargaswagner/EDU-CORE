import crypto from 'node:crypto';

export class Entity {
  #id;
  #createdAt;
  #updatedAt;

  constructor({
    id = crypto.randomUUID(),
    createdAt = new Date(),
    updatedAt = new Date(),
  } = {}) {
    this.#id = id;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  get id() {
    return this.#id;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  touch() {
    this.#updatedAt = new Date();
  }

  equals(entity) {
    if (!(entity instanceof Entity)) {
      return false;
    }

    return this.#id === entity.id;
  }
}
