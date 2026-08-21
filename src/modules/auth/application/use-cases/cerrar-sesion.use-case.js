// src/modules/auth/application/use-cases/cerrar-sesion.use-case.js

import { SesionInvalidaException } from '../../domain/index.js';

export class CerrarSesionUseCase {
  constructor({ sesionRepository, eventBus }) {
    this.sesionRepository = sesionRepository;

    this.eventBus = eventBus;
  }

  async execute({ sessionId, usuarioId }) {
    const sesion = await this.sesionRepository.findById(sessionId);

    if (!sesion) {
      throw new SesionInvalidaException();
    }

    /*
     * Protección contra intentar
     * cerrar la sesión de otro usuario.
     */
    if (sesion.usuarioId !== usuarioId) {
      throw new SesionInvalidaException();
    }

    if (!sesion.isRevoked()) {
      sesion.revoke();

      await this.sesionRepository.update(sesion);
    }

    if (this.eventBus) {
      await this.eventBus.publish('auth.session.closed', {
        sessionId: sesion.id,
        usuarioId: sesion.usuarioId,
        reason: 'logout',
        closedAt: new Date(),
      });
    }

    return {
      success: true,
    };
  }
}
