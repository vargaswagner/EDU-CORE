import express from 'express';

import { appConfig, serverConfig } from './config/index.js';

import {
  requestIdMiddleware,
  configureSecurity,
  requestLoggerInterceptor,
  errorMiddleware,
  notFoundMiddleware,
} from './shared/infrastructure/http/index.js';

import { routes } from './routes/index.js';

export const app = express();

app.set('trust proxy', serverConfig.trustProxy);
// ==========================================
// GLOBAL MIDDLEWARES
// ==========================================

configureSecurity(app);

app.use(requestIdMiddleware);

app.use(
  express.json({
    limit: serverConfig.bodyLimit,
  }),
);

app.use(requestLoggerInterceptor);

app.use(
  express.urlencoded({
    extended: true,
    limit: serverConfig.bodyLimit,
  }),
);

// ==========================================
// ROUTES
// ==========================================
app.get('/', (req, res) => {
  res.json({
    success: true,

    data: {
      application: appConfig.name,

      version: appConfig.version,

      environment: appConfig.environment,
    },
  });
});

// ==========================================
// 404
// ==========================================

app.use(notFoundMiddleware);

app.use(`${appConfig.api.prefix}/${appConfig.api.version}`, routes);

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================
app.use(errorMiddleware);
