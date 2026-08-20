import { AppError } from './AppError.js';

export class NotFoundError extends AppError {
  constructor(resource = 'Recurso') {
    super({
      message: `${resource} no encontrado`,
      code: 'RESOURCE_NOT_FOUND',
      statusCode: 404,
    });
  }
}
