// src/modules/auth/application/use-cases/refrescar-token.use-case.js

import {
  Sesion,
  SESSION_STATUS,
  SesionInvalidaException,
} from '../../domain/index.js';

export class RefrescarTokenUseCase {
  constructor({
    usuarioRepository,
    sesionRepository,
    tokenService,
    tokenHashService,
    sessionConfig,
  }) {
    this.usuarioRepository = usuarioRepository;

    this.sesionRepository = sesionRepository;

    this.tokenService = tokenService;

    this.tokenHashService = tokenHashService;

    this.sessionConfig = sessionConfig;
  }

  async execute({ refreshToken }) {
    let payload;

    try {
      payload = await this.tokenService.verifyRefreshToken(refreshToken);
    } catch {
      throw new SesionInvalidaException();
    }

    const sessionId = payload.sessionId;

    const usuarioId = payload.sub;

    if (!sessionId || !usuarioId) {
      throw new SesionInvalidaException();
    }

    const sesion = await this.sesionRepository.findById(sessionId);

    if (!sesion) {
      throw new SesionInvalidaException();
    }

    if (sesion.usuarioId !== usuarioId) {
      await this.#revokeSession(sesion);

      throw new SesionInvalidaException();
    }

    if (!sesion.isActive()) {
      throw new SesionInvalidaException();
    }

    if (sesion.isExpired()) {
      sesion.expire();

      await this.sesionRepository.update(sesion);

      throw new SesionInvalidaException();
    }

    const validToken = await this.tokenHashService.compare(
      refreshToken,
      sesion.refreshTokenHash,
    );

    if (!validToken) {
      /*
       * Posible reutilización de
       * refresh token.
       *
       * Revocamos toda la sesión.
       */
      await this.#revokeSession(sesion);

      throw new SesionInvalidaException(
        'La sesión ha sido revocada por seguridad.',
      );
    }

    const usuario = await this.usuarioRepository.findById(usuarioId);

    if (!usuario || !usuario.isActive()) {
      await this.#revokeSession(sesion);

      throw new SesionInvalidaException();
    }

    const newRefreshToken = await this.tokenService.generateRefreshToken({
      userId: usuario.id,
      sessionId: sesion.id,
    });

    const newRefreshTokenHash =
      await this.tokenHashService.hash(newRefreshToken);

    const newExpiresAt = new Date(
      Date.now() + this.sessionConfig.refreshTokenLifetimeMs,
    );

    sesion.rotateRefreshToken(newRefreshTokenHash, newExpiresAt);

    await this.sesionRepository.update(sesion);

    const accessToken = await this.tokenService.generateAccessToken({
      userId: usuario.id,
      sessionId,
      roles: [],
      permissions: [],
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: this.sessionConfig.accessTokenLifetimeSeconds,
      sessionId: sesion.id,
    };
  }

  async #revokeSession(sesion) {
    if (!sesion.isRevoked()) {
      sesion.revoke();

      await this.sesionRepository.update(sesion);
    }
  }
}
