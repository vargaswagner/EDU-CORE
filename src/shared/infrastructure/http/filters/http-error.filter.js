// src/shared/infrastructure/http/filters/http-error.filter.js

import { AppError } from '../../../../core/errors/AppError.js';

export function httpErrorFilter(error, req) {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      body: {
        success: false,

        error: {
          code: error.code,
          message: error.message,
          details: error.details,

          requestId: req.requestId || null,
        },
      },
    };
  }

  return {
    statusCode: 500,

    body: {
      success: false,

      error: {
        code: 'INTERNAL_ERROR',

        message: 'Ocurrió un error interno del servidor.',

        requestId: req.requestId || null,
      },
    },
  };
}
