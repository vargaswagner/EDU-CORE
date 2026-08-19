import rateLimit from "express-rate-limit";

import { env } from "./env.config.js";

export const globalRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,

  limit: env.RATE_LIMIT_MAX,

  standardHeaders: "draft-8",

  legacyHeaders: false,

  message: {
    success: false,

    error: {
      code: "RATE_LIMIT_EXCEEDED",

      message: "Too many requests. Please try again later.",
    },
  },
});
