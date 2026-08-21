// src/modules/auth/application/repositories/permiso.repository.js

export class PermisoRepository {
  async findById() {
    throw new Error('PermisoRepository.findById() debe ser implementado.');
  }

  async findByCodigo() {
    throw new Error('PermisoRepository.findByCodigo() debe ser implementado.');
  }

  async findActiveByCodigo() {
    throw new Error(
      'PermisoRepository.findActiveByCodigo() debe ser implementado.',
    );
  }

  async findAll() {
    throw new Error('PermisoRepository.findAll() debe ser implementado.');
  }

  async findByRoleId() {
    throw new Error('PermisoRepository.findByRoleId() debe ser implementado.');
  }

  async create() {
    throw new Error('PermisoRepository.create() debe ser implementado.');
  }

  async update() {
    throw new Error('PermisoRepository.update() debe ser implementado.');
  }
}
