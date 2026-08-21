// src/modules/auth/infrastructure/guards/authentication.guard.js

export class AuthenticationGuard {
  constructor({ tokenService, sesionRepository }) {
    if (!tokenService) {
      throw new Error('AuthenticationGuard requiere tokenService.');
    }

    if (!sesionRepository) {
      throw new Error('AuthenticationGuard requiere sesionRepository.');
    }

    this.tokenService = tokenService;
    this.sesionRepository = sesionRepository;
  }

  async execute(req, res, next) {
    try {
      // ==========================================
      // 1. EXTRAER TOKEN
      // ==========================================

      const token = this.#extractBearerToken(req);

      if (!token) {
        return this.#unauthorized(
          res,
          'AUTHENTICATION_REQUIRED',
          'Se requiere autenticación.',
        );
      }

      // ==========================================
      // 2. VALIDAR JWT
      // ==========================================

      const payload = await this.tokenService.verifyAccessToken(token);

      // ==========================================
      // 3. VALIDAR SESSION ID
      // ==========================================

      const sessionId = payload.sessionId;

      if (!sessionId) {
        return this.#unauthorized(
          res,
          'INVALID_SESSION',
          'La sesión no es válida.',
        );
      }

      // ==========================================
      // 4. BUSCAR SESIÓN
      // ==========================================

      const sesion = await this.sesionRepository.findById(sessionId);

      if (!sesion) {
        return this.#unauthorized(
          res,
          'SESSION_NOT_FOUND',
          'La sesión no es válida.',
        );
      }

      // ==========================================
      // 5. VERIFICAR PROPIETARIO
      // ==========================================

      if (sesion.usuarioId !== payload.sub) {
        return this.#unauthorized(
          res,
          'INVALID_SESSION',
          'La sesión no es válida.',
        );
      }

      // ==========================================
      // 6. VERIFICAR REVOCACIÓN
      // ==========================================

      if (sesion.isRevoked()) {
        return this.#unauthorized(
          res,
          'SESSION_REVOKED',
          'La sesión ha sido cerrada.',
        );
      }

      // ==========================================
      // 7. VERIFICAR EXPIRACIÓN
      // ==========================================

      if (sesion.isExpired()) {
        return this.#unauthorized(
          res,
          'SESSION_EXPIRED',
          'La sesión ha expirado.',
        );
      }

      // ==========================================
      // 8. CONTEXTO AUTENTICADO
      // ==========================================

      req.auth = Object.freeze({
        userId: payload.sub,

        sessionId,

        tokenId: payload.jti ?? null,

        roles: Array.isArray(payload.roles) ? payload.roles : [],

        permissions: Array.isArray(payload.permissions)
          ? payload.permissions
          : [],

        authenticatedAt: new Date(),
      });

      // Opcional pero útil
      req.session = sesion;

      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,

        error: {
          code: 'INVALID_ACCESS_TOKEN',

          message: 'La autenticación no es válida.',
        },
      });
    }
  }

  #extractBearerToken(req) {
    const authorization = req.headers.authorization;

    if (typeof authorization !== 'string') {
      return null;
    }

    const parts = authorization.trim().split(/\s+/);

    if (parts.length !== 2) {
      return null;
    }

    const [scheme, token] = parts;

    if (scheme.toLowerCase() !== 'bearer') {
      return null;
    }

    if (!token) {
      return null;
    }

    return token.trim();
  }

  #unauthorized(res, code, message) {
    return res.status(401).json({
      success: false,

      error: {
        code,
        message,
      },
    });
  }
}
