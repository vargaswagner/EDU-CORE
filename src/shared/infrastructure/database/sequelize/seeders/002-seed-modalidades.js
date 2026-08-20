export async function up(queryInterface) {
  const now = new Date();

  await queryInterface.bulkInsert('modalidades', [
    {
      id: crypto.randomUUID(),
      codigo: 'PRESENCIAL',
      nombre: 'Presencial',
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      codigo: 'VIRTUAL',
      nombre: 'Virtual',
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      codigo: 'SEMIPRESENCIAL',
      nombre: 'Semipresencial',
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('modalidades', null, {});
}
