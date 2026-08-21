// src/modules/auth/infrastructure/routes/auth.routes.js

import { Router } from 'express';

export function createAuthRoutes({ authController, authenticationMiddleware }) {
  const router = Router();

  /*
   * PUBLIC
   */

  router.post('/login', authController.login.bind(authController));

  router.post('/refresh', authController.refresh.bind(authController));

  /*
   * PROTECTED
   */

  router.post(
    '/logout',
    authenticationMiddleware,
    authController.logout.bind(authController),
  );

  router.post(
    '/logout-all',
    authenticationMiddleware,
    authController.logoutAll.bind(authController),
  );

  router.get(
    '/me',
    authenticationMiddleware,
    authController.me.bind(authController),
  );

  return router;
}
