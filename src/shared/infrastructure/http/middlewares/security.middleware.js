import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import {
  corsConfig,
  securityConfig,
  globalRateLimiter,
} from "../../../../config/index.js";

export function configureSecurity(app) {
  app.disable("x-powered-by");

  app.use(helmet(securityConfig.helmet));

  app.use(cors(corsConfig));

  app.use(compression());

  app.use(globalRateLimiter);
}
