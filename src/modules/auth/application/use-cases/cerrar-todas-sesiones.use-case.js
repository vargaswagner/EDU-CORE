// src/modules/auth/application/use-cases/cerrar-todas-sesiones.use-case.js

export class CerrarTodasSesionesUseCase {
  constructor({ sesionRepository, eventBus }) {
    this.sesionRepository = sesionRepository;

    this.eventBus = eventBus;
  }

  async execute({ usuarioId }) {
    if (!usuarioId) {
      throw new Error('usuarioId es obligatorio.');
    }

    const result = await this.sesionRepository.revokeAllByUserId(usuarioId);

    if (this.eventBus) {
      await this.eventBus.publish('auth.sessions.all-revoked', {
        usuarioId,
        revokedAt: new Date(),
      });
    }

    return {
      success: true,
      revokedSessions: Array.isArray(result) ? result[0] : result,
    };
  }
}
