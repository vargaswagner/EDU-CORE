// import crypto from 'node:crypto';

export async function up(queryInterface) {
  const [roles] = await queryInterface.sequelize.query(`
    SELECT id, codigo
    FROM roles
  `);

  const [permissions] = await queryInterface.sequelize.query(`
    SELECT id, codigo
    FROM permisos
  `);

  const roleMap = new Map(roles.map((role) => [role.codigo, role.id]));

  const permissionMap = new Map(
    permissions.map((permission) => [permission.codigo, permission.id]),
  );

  const allPermissions = permissions.map((permission) => permission.id);

  const adminPermissions = permissions
    .filter((permission) => {
      return !['usuarios.delete', 'roles.delete'].includes(permission.codigo);
    })
    .map((permission) => permission.id);

  const registrosModules = [
    'estudiantes.',
    'carreras.',
    'planes-estudio.',
    'cursos.',
    'periodos-academicos.',
    'secciones.',
    'matriculas.',
  ];

  const registrosPermissions = permissions
    .filter((permission) =>
      registrosModules.some((prefix) => permission.codigo.startsWith(prefix)),
    )
    .map((permission) => permission.id);

  const tesoreriaModules = [
    'cronogramas.',
    'cuotas.',
    'pagos.',
    'comprobantes.',
    'cajas.',
  ];

  const tesoreriaPermissions = permissions
    .filter((permission) =>
      tesoreriaModules.some((prefix) => permission.codigo.startsWith(prefix)),
    )
    .map((permission) => permission.id);

  const assignments = [
    {
      role: 'SUPER_ADMIN',
      permissions: allPermissions,
    },
    {
      role: 'ADMIN',
      permissions: adminPermissions,
    },
    {
      role: 'REGISTROS',
      permissions: registrosPermissions,
    },
    {
      role: 'TESORERIA',
      permissions: tesoreriaPermissions,
    },
  ];

  const rows = [];

  for (const assignment of assignments) {
    const roleId = roleMap.get(assignment.role);

    if (!roleId) {
      throw new Error(`Rol no encontrado: ${assignment.role}`);
    }

    for (const permissionId of assignment.permissions) {
      rows.push({
        rol_id: roleId,
        permiso_id: permissionId,
        created_at: new Date(),
      });
    }
  }

  await queryInterface.bulkInsert('roles_permisos', rows);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('roles_permisos', null, {});
}
