// src/shared/infrastructure/security/token.service.js

import { SignJWT, jwtVerify } from 'jose';

export class TokenService {
  constructor({
    accessSecret,
    refreshSecret,
    issuer,
    audience,
    accessExpiresIn = '15m',
    refreshExpiresIn = '7d',
  }) {
    if (!accessSecret) {
      throw new Error('JWT access secret no configurado.');
    }

    if (!refreshSecret) {
      throw new Error('JWT refresh secret no configurado.');
    }

    this.accessKey = new TextEncoder().encode(accessSecret);

    this.refreshKey = new TextEncoder().encode(refreshSecret);

    this.issuer = issuer;
    this.audience = audience;

    this.accessExpiresIn = accessExpiresIn;

    this.refreshExpiresIn = refreshExpiresIn;
  }

  async generateAccessToken({
    userId,
    sessionId,
    roles = [],
    permissions = [],
  }) {
    return this.#generateToken({
      key: this.accessKey,
      subject: userId,
      expiresIn: this.accessExpiresIn,
      payload: {
        type: 'access',
        sessionId,
        roles,
        permissions,
      },
    });
  }

  async generateRefreshToken({ userId, sessionId }) {
    return this.#generateToken({
      key: this.refreshKey,
      subject: userId,
      expiresIn: this.refreshExpiresIn,
      payload: {
        type: 'refresh',
        sessionId,
      },
    });
  }

  async verifyAccessToken(token) {
    return this.#verifyToken(token, this.accessKey, 'access');
  }

  async verifyRefreshToken(token) {
    return this.#verifyToken(token, this.refreshKey, 'refresh');
  }

  async #generateToken({ key, subject, expiresIn, payload }) {
    return new SignJWT(payload)
      .setProtectedHeader({
        alg: 'HS256',
        typ: 'JWT',
      })
      .setSubject(subject)
      .setIssuer(this.issuer)
      .setAudience(this.audience)
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(key);
  }

  async #verifyToken(token, key, expectedType) {
    const { payload } = await jwtVerify(token, key, {
      issuer: this.issuer,
      audience: this.audience,
    });

    if (payload.type !== expectedType) {
      throw new Error('Tipo de token inválido.');
    }

    return payload;
  }
}
