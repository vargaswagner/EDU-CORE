export function errorMiddleware(error, req, res, next) {
  req.log?.error(
    {
      err: error,
      requestId: req.id,
      method: req.method,
      url: req.originalUrl,
    },
    'Unhandled application error',
  );

  console.error('========== INTERNAL ERROR ==========');
  console.error('requestId:', req.id);
  console.error('name:', error?.name);
  console.error('message:', error?.message);
  console.error('stack:', error?.stack);
  console.error('====================================');

  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error',
    },
    requestId: req.id,
  });
}
