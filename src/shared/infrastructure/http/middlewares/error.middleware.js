import { errorResponse } from "../responses/api-response.js";

export function errorMiddleware(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  const code = error.code || "INTERNAL_ERROR";

  const message = error.isOperational ? error.message : "Internal server error";

  const details = error.isOperational ? error.details : null;

  return errorResponse({
    res,

    statusCode,

    code,

    message,

    details,

    requestId: req.requestId,
  });
}
