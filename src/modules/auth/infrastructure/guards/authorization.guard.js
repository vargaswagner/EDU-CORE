// src/modules/auth/infrastructure/guards/authorization.guard.js

export class AuthorizationGuard {
  constructor({ authorizationService }) {
    if (!authorizationService) {
      throw new Error('AuthorizationGuard requiere authorizationService.');
    }

    this.authorizationService = authorizationService;
  }

  requirePermission(permission) {
    if (!permission) {
      throw new Error('Debe especificarse un permiso.');
    }

    return async (req, res, next) => {
      try {
        if (!req.auth) {
          return res.status(401).json({
            success: false,
            error: {
              code: 'AUTHENTICATION_REQUIRED',
              message: 'Se requiere autenticación.',
            },
          });
        }

        await this.authorizationService.authorize(req.auth.userId, permission);

        return next();
      } catch (error) {
        if (error.code === 'INSUFFICIENT_PERMISSION') {
          return res.status(403).json({
            success: false,
            error: {
              code: 'INSUFFICIENT_PERMISSION',
              message:
                'No tienes permisos suficientes para realizar esta operación.',
            },
          });
        }

        return next(error);
      }
    };
  }
}
