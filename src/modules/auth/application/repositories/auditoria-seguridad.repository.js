// src/modules/auth/application/repositories/auditoria-seguridad.repository.js

export class AuditoriaSeguridadRepository {
  async create() {
    throw new Error(
      'AuditoriaSeguridadRepository.create() debe ser implementado.',
    );
  }

  async findByUsuarioId() {
    throw new Error(
      'AuditoriaSeguridadRepository.findByUsuarioId() debe ser implementado.',
    );
  }

  async findBySessionId() {
    throw new Error(
      'AuditoriaSeguridadRepository.findBySessionId() debe ser implementado.',
    );
  }
}
