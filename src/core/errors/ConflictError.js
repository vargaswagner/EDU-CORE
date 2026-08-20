import { AppError } from './AppError.js';

export class ConflictError extends AppError {
  constructor(message, details = null) {
    super({
      message,
      code: 'RESOURCE_CONFLICT',
      statusCode: 409,
      details,
    });
  }
}
