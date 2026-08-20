export async function up(queryInterface) {
  const now = new Date();

  await queryInterface.bulkInsert('conceptos_pago', [
    {
      id: crypto.randomUUID(),
      codigo: 'MATRICULA',
      nombre: 'Derecho de matrícula',
      tipo: 'MATRICULA',
      monto_base: 150,
      permite_descuento: true,
      permite_mora: false,
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      codigo: 'PENSION',
      nombre: 'Pensión académica',
      tipo: 'PENSION',
      monto_base: 500,
      permite_descuento: true,
      permite_mora: true,
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      codigo: 'CERTIFICADO',
      nombre: 'Certificado de estudios',
      tipo: 'CERTIFICADO',
      monto_base: 50,
      permite_descuento: false,
      permite_mora: false,
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('conceptos_pago', null, {});
}
