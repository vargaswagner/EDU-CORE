import crypto from 'node:crypto';

export const SESSION_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  REVOKED: 'REVOKED',
  EXPIRED: 'EXPIRED',
});

export class Sesion {
  #id;
  #usuarioId;
  #refreshTokenHash;
  #status;
  #expiresAt;
  #revokedAt;
  #createdAt;
  #lastUsedAt;
  #ipAddress;
  #userAgent;
  #deviceInfo;
  #updatedAt;

  constructor({
    id = crypto.randomUUID(),
    usuarioId,
    refreshTokenHash,
    status = SESSION_STATUS.ACTIVE,
    expiresAt,
    revokedAt = null,
    createdAt = new Date(),
    lastUsedAt = null,
    ipAddress = null,
    userAgent = null,
    deviceInfo = null,
    updatedAt = new Date(),
  }) {
    if (!usuarioId) {
      throw new Error('usuarioId es obligatorio.');
    }

    if (!refreshTokenHash) {
      throw new Error('refreshTokenHash es obligatorio.');
    }

    if (!expiresAt) {
      throw new Error('expiresAt es obligatorio.');
    }

    if (!Object.values(SESSION_STATUS).includes(status)) {
      throw new Error('Estado de sesión inválido.');
    }

    this.#id = id;
    this.#usuarioId = usuarioId;
    this.#refreshTokenHash = refreshTokenHash;
    this.#status = status;
    this.#expiresAt = new Date(expiresAt);
    this.#revokedAt = revokedAt ? new Date(revokedAt) : null;
    this.#createdAt = new Date(createdAt);
    this.#lastUsedAt = lastUsedAt ? new Date(lastUsedAt) : null;
    this.#ipAddress = ipAddress;
    this.#userAgent = userAgent;
    this.#deviceInfo = deviceInfo;
    this.#updatedAt = new Date(updatedAt);
  }

  get id() {
    return this.#id;
  }

  get usuarioId() {
    return this.#usuarioId;
  }

  get refreshTokenHash() {
    return this.#refreshTokenHash;
  }

  get status() {
    return this.#status;
  }

  get expiresAt() {
    return this.#expiresAt;
  }

  get revokedAt() {
    return this.#revokedAt;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get lastUsedAt() {
    return this.#lastUsedAt;
  }

  get ipAddress() {
    return this.#ipAddress;
  }

  get userAgent() {
    return this.#userAgent;
  }

  get deviceInfo() {
    return this.#deviceInfo;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  isActive() {
    return this.#status === SESSION_STATUS.ACTIVE;
  }

  isRevoked() {
    return this.#status === SESSION_STATUS.REVOKED;
  }

  isExpired() {
    return (
      this.#status === SESSION_STATUS.EXPIRED || new Date() >= this.#expiresAt
    );
  }

  isUsable() {
    return this.isActive() && !this.isExpired();
  }

  revoke() {
    if (this.isRevoked()) {
      return;
    }

    this.#status = SESSION_STATUS.REVOKED;

    this.#revokedAt = new Date();

    this.#touch();
  }

  expire() {
    if (this.isRevoked()) {
      return;
    }

    this.#status = SESSION_STATUS.EXPIRED;

    this.#touch();
  }

  registerUsage() {
    if (!this.isUsable()) {
      throw new Error('La sesión no está activa.');
    }

    this.#lastUsedAt = new Date();

    this.#touch();
  }

  rotateRefreshToken(refreshTokenHash, expiresAt) {
    if (!refreshTokenHash) {
      throw new Error('El nuevo refreshTokenHash es obligatorio.');
    }

    if (!this.isUsable()) {
      throw new Error('No se puede rotar una sesión inactiva.');
    }

    this.#refreshTokenHash = refreshTokenHash;

    this.#expiresAt = new Date(expiresAt);

    this.#lastUsedAt = new Date();

    this.#touch();
  }

  #touch() {
    this.#updatedAt = new Date();
  }
}
