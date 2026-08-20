import { AppError } from './AppError.js';

export class ValidationError extends AppError {
  constructor(message, details = null) {
    super({
      message,
      code: 'VALIDATION_ERROR',
      statusCode: 400,
      details,
    });
  }
}
