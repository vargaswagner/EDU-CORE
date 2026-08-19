import { env } from "./env.config.js";

export const appConfig = {
  name: env.APP_NAME,

  version: env.APP_VERSION,

  environment: env.NODE_ENV,

  server: {
    host: env.APP_HOST,
    port: env.APP_PORT,
  },

  api: {
    prefix: env.API_PREFIX,
    version: env.API_VERSION,
  },

  cors: {
    origin: env.CORS_ORIGIN,
  },

  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
  },

  isDevelopment: env.NODE_ENV === "development",

  isProduction: env.NODE_ENV === "production",

  isTest: env.NODE_ENV === "test",
};
