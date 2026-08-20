export class AppError extends Error {
  constructor({
    message,
    code = 'APP_ERROR',
    statusCode = 500,
    details = null,
    isOperational = true,
  }) {
    super(message);

    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
