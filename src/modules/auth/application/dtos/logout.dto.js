// src/modules/auth/application/dtos/logout.dto.js

export class LogoutDto {
  constructor({ sessionId, usuarioId }) {
    if (!sessionId) {
      throw new Error('sessionId es obligatorio.');
    }

    if (!usuarioId) {
      throw new Error('usuarioId es obligatorio.');
    }

    this.sessionId = sessionId;
    this.usuarioId = usuarioId;
  }
}
