import bcrypt from 'bcrypt';

export async function up(queryInterface) {
  const personaId = crypto.randomUUID();
  const usuarioId = crypto.randomUUID();

  const email = process.env.SEED_ADMIN_EMAIL || 'admin@gmail.com';

  const password = process.env.SEED_ADMIN_PASSWORD || 'admin123';

  const passwordHash = await bcrypt.hash(password, 12);

  const now = new Date();

  /*
  |--------------------------------------------------------------------------
  | 1. Crear Persona
  |--------------------------------------------------------------------------
  */

  await queryInterface.bulkInsert('personas', [
    {
      id: personaId,

      tipo_documento: 'DNI',
      numero_documento: '00000000',

      nombres: 'Administrador',
      apellido_paterno: 'Sistema',
      apellido_materno: null,

      fecha_nacimiento: null,

      telefono: null,
      email,

      direccion: null,

      estado: 'ACTIVO',

      created_at: now,
      updated_at: now,
    },
  ]);

  /*
  |--------------------------------------------------------------------------
  | 2. Crear Usuario
  |--------------------------------------------------------------------------
  */

  await queryInterface.bulkInsert('usuarios', [
    {
      id: usuarioId,

      persona_id: personaId,

      username: 'admin',

      email: email,

      password_hash: passwordHash,

      estado: 'ACTIVO',

      ultimo_acceso_at: null,

      created_at: now,
      updated_at: now,
    },
  ]);

  /*
  |--------------------------------------------------------------------------
  | 3. Buscar Rol SUPER_ADMIN
  |--------------------------------------------------------------------------
  */

  const [roles] = await queryInterface.sequelize.query(`
    SELECT id
    FROM roles
    WHERE codigo = 'SUPER_ADMIN'
    LIMIT 1
  `);

  if (!roles.length) {
    throw new Error(
      'No existe el rol SUPER_ADMIN. Ejecuta primero el seeder de roles.',
    );
  }

  /*
  |--------------------------------------------------------------------------
  | 4. Asignar Rol al Usuario
  |--------------------------------------------------------------------------
  */

  await queryInterface.bulkInsert('usuarios_roles', [
    {
      usuario_id: usuarioId,
      rol_id: roles[0].id,
      created_at: now,
    },
  ]);
}

export async function down(queryInterface) {
  /*
  |--------------------------------------------------------------------------
  | 1. Buscar Usuario
  |--------------------------------------------------------------------------
  */

  const [usuarios] = await queryInterface.sequelize.query(`
    SELECT id, persona_id
    FROM usuarios
    WHERE username = 'admin'
    LIMIT 1
  `);

  if (!usuarios.length) {
    return;
  }

  const usuarioId = usuarios[0].id;
  const personaId = usuarios[0].persona_id;

  /*
  |--------------------------------------------------------------------------
  | 2. Eliminar asignación de rol
  |--------------------------------------------------------------------------
  */

  await queryInterface.bulkDelete(
    'usuarios_roles',
    {
      usuario_id: usuarioId,
    },
    {},
  );

  /*
  |--------------------------------------------------------------------------
  | 3. Eliminar usuario
  |--------------------------------------------------------------------------
  */

  await queryInterface.bulkDelete(
    'usuarios',
    {
      id: usuarioId,
    },
    {},
  );

  /*
  |--------------------------------------------------------------------------
  | 4. Eliminar persona
  |--------------------------------------------------------------------------
  */

  await queryInterface.bulkDelete(
    'personas',
    {
      id: personaId,
    },
    {},
  );
}
