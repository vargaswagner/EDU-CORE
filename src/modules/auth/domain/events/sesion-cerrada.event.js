// src/modules/auth/domain/events/sesion-cerrada.event.js

export class SesionCerradaEvent {
  static eventName = 'auth.session.closed';

  constructor({
    sessionId,
    usuarioId,
    reason = 'logout',
    closedAt = new Date(),
  }) {
    this.eventName = SesionCerradaEvent.eventName;

    this.sessionId = sessionId;
    this.usuarioId = usuarioId;
    this.reason = reason;
    this.closedAt = closedAt;
  }
}
