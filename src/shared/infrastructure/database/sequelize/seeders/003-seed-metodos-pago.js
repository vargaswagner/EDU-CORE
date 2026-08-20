export async function up(queryInterface) {
  const now = new Date();

  await queryInterface.bulkInsert('metodos_pago', [
    {
      id: crypto.randomUUID(),
      codigo: 'EFECTIVO',
      nombre: 'Efectivo',
      requiere_operacion: false,
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      codigo: 'TRANSFERENCIA',
      nombre: 'Transferencia bancaria',
      requiere_operacion: true,
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      codigo: 'YAPE',
      nombre: 'Yape',
      requiere_operacion: true,
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      codigo: 'PLIN',
      nombre: 'Plin',
      requiere_operacion: true,
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
    {
      id: crypto.randomUUID(),
      codigo: 'TARJETA',
      nombre: 'Tarjeta',
      requiere_operacion: true,
      estado: 'ACTIVO',
      created_at: now,
      updated_at: now,
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('metodos_pago', null, {});
}
