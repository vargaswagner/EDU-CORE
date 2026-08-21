// src/modules/auth/application/use-cases/autenticar-usuario.use-case.js

import {
  CredencialesInvalidasException,
  UsuarioBloqueadoException,
  Sesion,
} from '../../domain/index.js';
import { randomUUID } from 'node:crypto';

export class AutenticarUsuarioUseCase {
  constructor({
    usuarioRepository,
    sesionRepository,
    passwordService,
    tokenService,
    tokenHashService,
    sessionConfig,
  }) {
    this.usuarioRepository = usuarioRepository;

    this.sesionRepository = sesionRepository;

    this.passwordService = passwordService;

    this.tokenService = tokenService;
    this.tokenHashService = tokenHashService;

    this.sessionConfig = sessionConfig;
  }

  async execute({
    email,
    password,
    ipAddress = null,
    userAgent = null,
    deviceInfo = null,
  }) {
    const usuario = await this.usuarioRepository.findByEmail(
      email.trim().toLowerCase(),
    );

    /*
     * No revelamos si el email existe.
     */
    if (!usuario) {
      throw new CredencialesInvalidasException();
    }

    if (usuario.isBlocked()) {
      throw new UsuarioBloqueadoException();
    }

    if (!usuario.isActive()) {
      throw new CredencialesInvalidasException();
    }

    const passwordValid = await this.passwordService.compare(
      password,
      usuario.passwordHash,
    );

    if (!passwordValid) {
      usuario.registerFailedLoginAttempt();

      await this.usuarioRepository.update(usuario);

      throw new CredencialesInvalidasException();
    }

    usuario.registerSuccessfulLogin();

    await this.usuarioRepository.update(usuario);

    const sessionId = crypto.randomUUID();

    const refreshToken = await this.tokenService.generateRefreshToken({
      userId: usuario.id,
      sessionId,
    });

    const refreshTokenHash = await this.tokenHashService.hash(refreshToken);

    const expiresAt = new Date(
      Date.now() + this.sessionConfig.refreshTokenLifetimeMs,
    );

    const sesion = new Sesion({
      id: sessionId,
      usuarioId: usuario.id,
      refreshTokenHash,
      expiresAt,
      ipAddress,
      userAgent,
      deviceInfo,
    });

    await this.sesionRepository.create(sesion);

    const accessToken = await this.tokenService.generateAccessToken({
      userId: usuario.id,
      sessionId,
      roles: [],
      permissions: [],
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.sessionConfig.accessTokenLifetimeSeconds,
      sessionId: sesion.id,
      user: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
      },
    };
  }
}
