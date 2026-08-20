export async function up(queryInterface) {
  const now = new Date();

  await queryInterface.bulkInsert('turnos', [
    {
      id: crypto.randomUUID(),
      codigo: 'MANANA',
      nombre: 'Mañana',
      //   hora_inicio: '07:00',
      //   hora_fin: '13:00',
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      codigo: 'TARDE',
      nombre: 'Tarde',
      //   hora_inicio: '13:00',
      //   hora_fin: '18:00',
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      codigo: 'NOCHE',
      nombre: 'Noche',
      //   hora_inicio: '18:00',
      //   hora_fin: '22:00',
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('turnos', null, {});
}
