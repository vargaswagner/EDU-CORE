// src/config/auth.config.js
import { env } from './env.config.js';

export const authConfig = {
  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,

    refreshSecret: env.JWT_REFRESH_SECRET,

    issuer: env.JWT_ISSUER,

    audience: env.JWT_AUDIENCE,

    accessExpiresIn: env.JWT_ACCESS_EXPIRES_IN,

    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  },
  refreshCookie: {
    name: 'refreshToken',

    httpOnly: true,

    secure: env.NODE_ENV === 'production',

    sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',

    path: `${env.API_PREFIX}/${env.API_VERSION}/auth`,

    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  accessTokenLifetimeSeconds: 15 * 60,

  refreshTokenLifetimeMs: 7 * 24 * 60 * 60 * 1000,
};
