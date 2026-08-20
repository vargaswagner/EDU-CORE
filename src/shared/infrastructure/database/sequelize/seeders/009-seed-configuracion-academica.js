import crypto from 'node:crypto';

export async function up(queryInterface) {
  const now = new Date();

  await queryInterface.bulkInsert('periodos_academicos', [
    {
      id: crypto.randomUUID(),

      codigo: '2026-I',

      nombre: 'Periodo Académico 2026-I',

      fecha_inicio: '2026-03-01',

      fecha_fin: '2026-07-31',

      fecha_inicio_matricula: '2026-02-01',

      fecha_fin_matricula: '2026-03-15',

      estado: 'PLANIFICADO',

      created_at: now,

      updated_at: now,
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete(
    'periodos_academicos',
    {
      codigo: '2026-I',
    },
    {},
  );
}
