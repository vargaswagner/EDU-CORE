// src/modules/auth/domain/events/sesion-creada.event.js

export class SesionCreadaEvent {
  static eventName = 'auth.session.created';

  constructor({ sessionId, usuarioId, createdAt = new Date() }) {
    this.eventName = SesionCreadaEvent.eventName;

    this.sessionId = sessionId;
    this.usuarioId = usuarioId;
    this.createdAt = createdAt;
  }
}
