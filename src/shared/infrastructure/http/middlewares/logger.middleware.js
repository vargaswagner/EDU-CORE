import pinoHttp from "pino-http";

import { logger } from "../../../../config/logger.config.js";

export const loggerMiddleware = pinoHttp({
  logger,

  genReqId(req) {
    return req.requestId;
  },

  customLogLevel(req, res, error) {
    if (error || res.statusCode >= 500) {
      return "error";
    }

    if (res.statusCode >= 400) {
      return "warn";
    }

    return "info";
  },
});
