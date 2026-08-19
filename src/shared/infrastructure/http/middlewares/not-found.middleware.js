import { AppError } from "../../../../core/errors/app.error.js";

export function notFoundMiddleware(req, res, next) {
  next(
    new AppError({
      message: `Route ${req.method} ${req.originalUrl} not found`,
      code: "ROUTE_NOT_FOUND",
      statusCode: 404,
    }),
  );
}
