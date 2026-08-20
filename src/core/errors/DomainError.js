import { AppError } from './AppError.js';

export class DomainError extends AppError {
  constructor(message, options = {}) {
    super({
      message,
      code: options.code || 'DOMAIN_ERROR',
      statusCode: 422,
      details: options.details || null,
    });
  }
}
