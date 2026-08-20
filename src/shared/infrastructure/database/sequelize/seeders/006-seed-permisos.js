export async function up(queryInterface) {
  const now = new Date();

  const permissions = [
    // Usuarios
    ['usuarios', 'read'],
    ['usuarios', 'create'],
    ['usuarios', 'update'],
    ['usuarios', 'delete'],

    // Roles
    ['roles', 'read'],
    ['roles', 'create'],
    ['roles', 'update'],
    ['roles', 'delete'],

    // Estudiantes
    ['estudiantes', 'read'],
    ['estudiantes', 'create'],
    ['estudiantes', 'update'],
    ['estudiantes', 'delete'],

    // Carreras
    ['carreras', 'read'],
    ['carreras', 'create'],
    ['carreras', 'update'],
    ['carreras', 'delete'],

    // Planes de estudio
    ['planes-estudio', 'read'],
    ['planes-estudio', 'create'],
    ['planes-estudio', 'update'],
    ['planes-estudio', 'delete'],

    // Cursos
    ['cursos', 'read'],
    ['cursos', 'create'],
    ['cursos', 'update'],
    ['cursos', 'delete'],

    // Periodos
    ['periodos-academicos', 'read'],
    ['periodos-academicos', 'create'],
    ['periodos-academicos', 'update'],
    ['periodos-academicos', 'delete'],

    // Secciones
    ['secciones', 'read'],
    ['secciones', 'create'],
    ['secciones', 'update'],
    ['secciones', 'delete'],

    // Matrículas
    ['matriculas', 'read'],
    ['matriculas', 'create'],
    ['matriculas', 'update'],
    ['matriculas', 'delete'],

    // Cronogramas
    ['cronogramas', 'read'],
    ['cronogramas', 'create'],
    ['cronogramas', 'update'],
    ['cronogramas', 'delete'],

    // Cuotas
    ['cuotas', 'read'],
    ['cuotas', 'create'],
    ['cuotas', 'update'],
    ['cuotas', 'delete'],

    // Pagos
    ['pagos', 'read'],
    ['pagos', 'create'],
    ['pagos', 'update'],
    ['pagos', 'delete'],

    // Comprobantes
    ['comprobantes', 'read'],
    ['comprobantes', 'create'],
    ['comprobantes', 'update'],
    ['comprobantes', 'delete'],

    // Caja
    ['cajas', 'read'],
    ['cajas', 'create'],
    ['cajas', 'update'],
    ['cajas', 'delete'],

    // Reportes
    ['reportes', 'read'],
    ['reportes', 'create'],
  ];

  const rows = permissions.map(([resource, action]) => ({
    id: crypto.randomUUID(),
    codigo: `${resource}.${action}`,
    nombre: `${action.toUpperCase()} ${resource}`,
    modulo: resource,
    accion: action,
    descripcion: `Permiso para ${action} sobre ${resource}`,
    estado: 'ACTIVO',
    created_at: now,
    updated_at: now,
  }));

  await queryInterface.bulkInsert('permisos', rows);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('permisos', null, {});
}
