// src/modules/auth/infrastructure/controllers/auth.controller.js

export class AuthController {
  constructor({
    autenticarUsuarioUseCase,
    refrescarTokenUseCase,
    cerrarSesionUseCase,
    cerrarTodasSesionesUseCase,
    sessionConfig,
  }) {
    this.autenticarUsuarioUseCase = autenticarUsuarioUseCase;

    this.refrescarTokenUseCase = refrescarTokenUseCase;

    this.cerrarSesionUseCase = cerrarSesionUseCase;

    this.cerrarTodasSesionesUseCase = cerrarTodasSesionesUseCase;

    this.sessionConfig = sessionConfig;
  }

  async login(req, res, next) {
    try {
      const result = await this.autenticarUsuarioUseCase.execute({
        email: req.body.email,
        password: req.body.password,

        ipAddress: req.ip,

        userAgent: req.get('user-agent'),

        requestId: req.id,
      });

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/api/v1/auth',
        maxAge: this.sessionConfig.refreshTokenLifetimeMs,
      });

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      const result = await this.refrescarTokenUseCase.execute({
        refreshToken,

        ipAddress: req.ip,

        userAgent: req.get('user-agent'),

        requestId: req.id,
      });

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: false, // desarrollo
        sameSite: 'strict',
        path: '/api/v1/auth',
        maxAge: this.sessionConfig.refreshTokenLifetimeMs,
      });

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  async logout(req, res, next) {
    try {
      console.log('========== LOGOUT ==========');
      console.log('AUTH:', req.auth, req.user);
      console.log('============================');
      await this.cerrarSesionUseCase.execute({
        sessionId: req.auth.sessionId,

        usuarioId: req.auth.userId,
      });

      res.clearCookie('refreshToken');

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  async logoutAll(req, res, next) {
    try {
      await this.cerrarTodasSesionesUseCase.execute({
        usuarioId: req.auth.userId,
      });

      res.clearCookie('refreshToken');

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  async me(req, res, next) {
    try {
      return res.status(200).json({
        success: true,
        data: {
          userId: req.auth.userId,

          sessionId: req.auth.sessionId,

          roles: req.auth.roles,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
