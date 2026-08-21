// src/modules/auth/infrastructure/guards/authorization.middleware.js

import { AuthorizationGuard } from './authorization.guard.js';

export function createAuthorizationMiddleware({ authorizationService }) {
  const guard = new AuthorizationGuard({
    authorizationService,
  });

  return {
    requirePermission: guard.requirePermission.bind(guard),
  };
}
