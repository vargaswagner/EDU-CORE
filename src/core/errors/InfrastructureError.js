import { AppError } from './AppError.js';

export class InfrastructureError extends AppError {
  constructor(message, details = null) {
    super({
      message,
      code: 'INFRASTRUCTURE_ERROR',
      statusCode: 500,
      details,
    });
  }
}
