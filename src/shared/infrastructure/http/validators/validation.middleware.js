// src/shared/infrastructure/http/validators/validation.middleware.js

export function validationMiddleware(schema, source = 'body') {
  return (req, res, next) => {
    try {
      const value = req[source];

      const result = schema.safeParse(value);

      if (!result.success) {
        return res.status(400).json({
          success: false,

          error: {
            code: 'VALIDATION_ERROR',

            message: 'Los datos enviados no son válidos.',

            details: result.error.flatten(),
          },
        });
      }

      req.validated = {
        ...(req.validated || {}),
        [source]: result.data,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
}
