// src/container/index.js

import { AuthController } from '../modules/auth/infrastructure/controllers/auth.controller.js';

import { createAuthenticationMiddleware } from '../modules/auth/infrastructure/guards/authentication.middleware.js';

// Repositories
import { SequelizeUsuarioRepository } from '../modules/auth/infrastructure/repositories/sequelize-usuario.repository.js';

import { SequelizeSesionRepository } from '../modules/auth/infrastructure/repositories/sequelize-sesion.repository.js';

// Services
import { PasswordService } from '../shared/infrastructure/security/password.service.js';

import { TokenService } from '../shared/infrastructure/security/token.service.js';
import { TokenHashService } from '../shared/infrastructure/security/token-hash.service.js';
// Use Cases
import { AutenticarUsuarioUseCase } from '../modules/auth/application/use-cases/autenticar-usuario.use-case.js';

import { RefrescarTokenUseCase } from '../modules/auth/application/use-cases/refrescar-token.use-case.js';

import { CerrarSesionUseCase } from '../modules/auth/application/use-cases/cerrar-sesion.use-case.js';

import { CerrarTodasSesionesUseCase } from '../modules/auth/application/use-cases/cerrar-todas-sesiones.use-case.js';

import { models } from '../shared/infrastructure/database/sequelize/index.js';
import { authConfig } from '../config/auth.config.js';

// ==========================================
// REPOSITORIES
// ==========================================

const usuarioRepository = new SequelizeUsuarioRepository({
  UsuarioModel: models.Usuario,
});

const sesionRepository = new SequelizeSesionRepository({
  SesionModel: models.Sesion,
});

// ==========================================
// SERVICES
// ==========================================

const passwordService = new PasswordService();

const tokenService = new TokenService({
  accessSecret: authConfig.jwt.accessSecret,

  refreshSecret: authConfig.jwt.refreshSecret,

  issuer: authConfig.jwt.issuer,

  audience: authConfig.jwt.audience,

  accessExpiresIn: authConfig.jwt.accessExpiresIn,

  refreshExpiresIn: authConfig.jwt.refreshExpiresIn,
});

const tokenHashService = new TokenHashService();
// ==========================================
// USE CASES
// ==========================================

const autenticarUsuarioUseCase = new AutenticarUsuarioUseCase({
  tokenHashService,
  usuarioRepository,
  sesionRepository,
  passwordService,
  tokenService,
  sessionConfig: authConfig,
});

const refrescarTokenUseCase = new RefrescarTokenUseCase({
  tokenHashService,
  usuarioRepository,
  sesionRepository,
  tokenService,
  sessionConfig: authConfig,
});

const cerrarSesionUseCase = new CerrarSesionUseCase({
  sesionRepository,
});

const cerrarTodasSesionesUseCase = new CerrarTodasSesionesUseCase({
  sesionRepository,
});

// ==========================================
// CONTROLLERS
// ==========================================

export const authController = new AuthController({
  autenticarUsuarioUseCase,
  refrescarTokenUseCase,
  cerrarSesionUseCase,
  cerrarTodasSesionesUseCase,
  sessionConfig: authConfig,
});

// ==========================================
// GUARDS
// ==========================================

export const authenticationMiddleware = createAuthenticationMiddleware({
  tokenService,
  sesionRepository,
});
