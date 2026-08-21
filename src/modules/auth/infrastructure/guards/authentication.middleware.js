import { AuthenticationGuard } from './authentication.guard.js';

export function createAuthenticationMiddleware({
  tokenService,
  sesionRepository,
}) {
  if (!tokenService) {
    throw new Error('createAuthenticationMiddleware requiere tokenService.');
  }

  if (!sesionRepository) {
    throw new Error(
      'createAuthenticationMiddleware requiere sesionRepository.',
    );
  }

  const guard = new AuthenticationGuard({
    tokenService,
    sesionRepository,
  });

  return guard.execute.bind(guard);
}
