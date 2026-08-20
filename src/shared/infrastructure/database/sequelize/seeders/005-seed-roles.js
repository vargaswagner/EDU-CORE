export async function up(queryInterface) {
  const now = new Date();

  await queryInterface.bulkInsert('roles', [
    {
      id: crypto.randomUUID(),
      codigo: 'SUPER_ADMIN',
      nombre: 'Super Administrador',
      descripcion: 'Acceso completo al sistema',
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      codigo: 'ADMIN',
      nombre: 'Administrador',
      descripcion: 'Administración general',
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      codigo: 'REGISTROS',
      nombre: 'Registros',
      descripcion: 'Gestión académica y matrículas',
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      codigo: 'TESORERIA',
      nombre: 'Tesorería',
      descripcion: 'Gestión de pagos y caja',
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('roles', null, {});
}
