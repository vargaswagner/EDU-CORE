import express from "express";

import { appConfig, serverConfig } from "./config/index.js";

import { requestIdMiddleware } from "./shared/infrastructure/http/middlewares/request-id.middleware.js";

import { loggerMiddleware } from "./shared/infrastructure/http/middlewares/logger.middleware.js";

import { configureSecurity } from "./shared/infrastructure/http/middlewares/security.middleware.js";

import { notFoundMiddleware } from "./shared/infrastructure/http/middlewares/not-found.middleware.js";

import { errorMiddleware } from "./shared/infrastructure/http/middlewares/error.middleware.js";

import { routes } from "./routes/index.js";

export const app = express();

app.set("trust proxy", serverConfig.trustProxy);

app.use(requestIdMiddleware);

app.use(loggerMiddleware);

configureSecurity(app);

app.use(
  express.json({
    limit: serverConfig.bodyLimit,
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: serverConfig.bodyLimit,
  }),
);

app.get("/", (req, res) => {
  res.json({
    success: true,

    data: {
      application: appConfig.name,

      version: appConfig.version,

      environment: appConfig.environment,
    },
  });
});

app.use(`${appConfig.api.prefix}/${appConfig.api.version}`, routes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);
