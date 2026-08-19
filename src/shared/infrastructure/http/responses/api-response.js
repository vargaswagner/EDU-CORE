export function successResponse({
  res,
  data = null,
  statusCode = 200,
  meta = null,
}) {
  return res.status(statusCode).json({
    success: true,

    data,

    ...(meta && { meta }),
  });
}

export function errorResponse({
  res,
  statusCode = 500,
  code = "INTERNAL_ERROR",
  message = "Internal server error",
  details = null,
  requestId = null,
}) {
  return res.status(statusCode).json({
    success: false,

    error: {
      code,
      message,

      ...(details && { details }),
    },

    ...(requestId && {
      requestId,
    }),
  });
}
