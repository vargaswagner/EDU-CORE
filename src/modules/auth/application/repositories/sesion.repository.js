// src/modules/auth/application/repositories/sesion.repository.js

export class SesionRepository {
  async findById() {
    throw new Error('SesionRepository.findById() debe ser implementado.');
  }

  async findActiveById() {
    throw new Error('SesionRepository.findActiveById() debe ser implementado.');
  }

  async findByUserId() {
    throw new Error('SesionRepository.findByUserId() debe ser implementado.');
  }

  async create() {
    throw new Error('SesionRepository.create() debe ser implementado.');
  }

  async update() {
    throw new Error('SesionRepository.update() debe ser implementado.');
  }

  async revokeAllByUserId() {
    throw new Error(
      'SesionRepository.revokeAllByUserId() debe ser implementado.',
    );
  }
}
