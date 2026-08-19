import pino from "pino";

import { env } from "./env.config.js";

export const logger = pino({
  level: env.LOG_LEVEL,

  base: {
    service: env.APP_NAME,
    version: env.APP_VERSION,
    environment: env.NODE_ENV,
  },

  timestamp: pino.stdTimeFunctions.isoTime,
});
