// src/shared/infrastructure/http/interceptors/request-logger.interceptor.js

export function requestLoggerInterceptor(req, res, next) {
  const startedAt = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startedAt;

    console.info({
      type: 'http_request',

      requestId: req.requestId || null,

      method: req.method,

      path: req.originalUrl,

      statusCode: res.statusCode,

      durationMs: duration,
    });
  });

  next();
}
