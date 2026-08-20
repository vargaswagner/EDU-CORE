export function setupAssociations(models) {
  const {
    Persona,

    Carrera,
    PlanEstudios,
    Ciclo,
    Curso,
    PlanEstudiosCurso,
    PrerrequisitoCurso,
    PeriodoAcademico,
    Turno,
    Modalidad,
    Aula,
    Docente,
    Seccion,
    HorarioSeccion,

    Estudiante,

    Matricula,
    MatriculaDetalle,

    ConceptoPago,
    CronogramaPago,
    Cuota,
    MetodoPago,
    Pago,
    AplicacionPago,
    Comprobante,

    Caja,
    SesionCaja,
    MovimientoCaja,

    Usuario,
    Rol,
    Permiso,
    UsuarioRol,
    RolPermiso,
  } = models;

  /*
   * ============================
   * PEOPLE
   * ============================
   */

  Persona.hasOne(Estudiante, {
    foreignKey: 'persona_id',
    as: 'estudiante',
  });

  Estudiante.belongsTo(Persona, {
    foreignKey: 'persona_id',
    as: 'persona',
  });

  Persona.hasOne(Docente, {
    foreignKey: 'persona_id',
    as: 'docente',
  });

  Docente.belongsTo(Persona, {
    foreignKey: 'persona_id',
    as: 'persona',
  });

  Persona.hasOne(Usuario, {
    foreignKey: 'persona_id',
    as: 'usuario',
  });

  Usuario.belongsTo(Persona, {
    foreignKey: 'persona_id',
    as: 'persona',
  });

  /*
   * ============================
   * ACADÉMICO
   * ============================
   */

  Carrera.hasMany(PlanEstudios, {
    foreignKey: 'carrera_id',
    as: 'planesEstudio',
  });

  PlanEstudios.belongsTo(Carrera, {
    foreignKey: 'carrera_id',
    as: 'carrera',
  });

  PlanEstudios.hasMany(Ciclo, {
    foreignKey: 'plan_estudios_id',
    as: 'ciclos',
  });

  Ciclo.belongsTo(PlanEstudios, {
    foreignKey: 'plan_estudios_id',
    as: 'planEstudios',
  });

  PlanEstudios.hasMany(PlanEstudiosCurso, {
    foreignKey: 'plan_estudios_id',
    as: 'cursosPlan',
  });

  PlanEstudiosCurso.belongsTo(PlanEstudios, {
    foreignKey: 'plan_estudios_id',
    as: 'planEstudios',
  });

  Curso.hasMany(PlanEstudiosCurso, {
    foreignKey: 'curso_id',
    as: 'planesEstudio',
  });

  PlanEstudiosCurso.belongsTo(Curso, {
    foreignKey: 'curso_id',
    as: 'curso',
  });

  Ciclo.hasMany(PlanEstudiosCurso, {
    foreignKey: 'ciclo_id',
    as: 'cursos',
  });

  PlanEstudiosCurso.belongsTo(Ciclo, {
    foreignKey: 'ciclo_id',
    as: 'ciclo',
  });

  Curso.belongsToMany(Curso, {
    through: PrerrequisitoCurso,
    as: 'prerrequisitos',
    foreignKey: 'curso_id',
    otherKey: 'curso_prerrequisito_id',
  });

  Curso.belongsToMany(Curso, {
    through: PrerrequisitoCurso,
    as: 'cursosDependientes',
    foreignKey: 'curso_prerrequisito_id',
    otherKey: 'curso_id',
  });

  PeriodoAcademico.hasMany(Seccion, {
    foreignKey: 'periodo_academico_id',
    as: 'secciones',
  });

  Seccion.belongsTo(PeriodoAcademico, {
    foreignKey: 'periodo_academico_id',
    as: 'periodoAcademico',
  });

  Curso.hasMany(Seccion, {
    foreignKey: 'curso_id',
    as: 'secciones',
  });

  Seccion.belongsTo(Curso, {
    foreignKey: 'curso_id',
    as: 'curso',
  });

  Ciclo.hasMany(Seccion, {
    foreignKey: 'ciclo_id',
    as: 'secciones',
  });

  Seccion.belongsTo(Ciclo, {
    foreignKey: 'ciclo_id',
    as: 'ciclo',
  });

  Docente.hasMany(Seccion, {
    foreignKey: 'docente_id',
    as: 'secciones',
  });

  Seccion.belongsTo(Docente, {
    foreignKey: 'docente_id',
    as: 'docente',
  });

  Aula.hasMany(Seccion, {
    foreignKey: 'aula_id',
    as: 'secciones',
  });

  Seccion.belongsTo(Aula, {
    foreignKey: 'aula_id',
    as: 'aula',
  });

  Turno.hasMany(Seccion, {
    foreignKey: 'turno_id',
    as: 'secciones',
  });

  Seccion.belongsTo(Turno, {
    foreignKey: 'turno_id',
    as: 'turno',
  });

  Modalidad.hasMany(Seccion, {
    foreignKey: 'modalidad_id',
    as: 'secciones',
  });

  Seccion.belongsTo(Modalidad, {
    foreignKey: 'modalidad_id',
    as: 'modalidad',
  });

  Seccion.hasMany(HorarioSeccion, {
    foreignKey: 'seccion_id',
    as: 'horarios',
  });

  HorarioSeccion.belongsTo(Seccion, {
    foreignKey: 'seccion_id',
    as: 'seccion',
  });

  /*
   * ============================
   * MATRÍCULAS
   * ============================
   */

  Estudiante.hasMany(Matricula, {
    foreignKey: 'estudiante_id',
    as: 'matriculas',
  });

  Matricula.belongsTo(Estudiante, {
    foreignKey: 'estudiante_id',
    as: 'estudiante',
  });

  Matricula.belongsTo(PeriodoAcademico, {
    foreignKey: 'periodo_academico_id',
    as: 'periodoAcademico',
  });

  Matricula.belongsTo(PlanEstudios, {
    foreignKey: 'plan_estudios_id',
    as: 'planEstudios',
  });

  Matricula.hasMany(MatriculaDetalle, {
    foreignKey: 'matricula_id',
    as: 'detalles',
  });

  MatriculaDetalle.belongsTo(Matricula, {
    foreignKey: 'matricula_id',
    as: 'matricula',
  });

  MatriculaDetalle.belongsTo(Seccion, {
    foreignKey: 'seccion_id',
    as: 'seccion',
  });

  MatriculaDetalle.belongsTo(Curso, {
    foreignKey: 'curso_id',
    as: 'curso',
  });

  /*
   * ============================
   * FINANZAS
   * ============================
   */

  Matricula.hasOne(CronogramaPago, {
    foreignKey: 'matricula_id',
    as: 'cronogramaPago',
  });

  CronogramaPago.belongsTo(Matricula, {
    foreignKey: 'matricula_id',
    as: 'matricula',
  });

  CronogramaPago.hasMany(Cuota, {
    foreignKey: 'cronograma_pago_id',
    as: 'cuotas',
  });

  Cuota.belongsTo(CronogramaPago, {
    foreignKey: 'cronograma_pago_id',
    as: 'cronogramaPago',
  });

  ConceptoPago.hasMany(Cuota, {
    foreignKey: 'concepto_pago_id',
    as: 'cuotas',
  });

  Cuota.belongsTo(ConceptoPago, {
    foreignKey: 'concepto_pago_id',
    as: 'conceptoPago',
  });

  Pago.belongsTo(Estudiante, {
    foreignKey: 'estudiante_id',
    as: 'estudiante',
  });

  Estudiante.hasMany(Pago, {
    foreignKey: 'estudiante_id',
    as: 'pagos',
  });

  Pago.belongsTo(MetodoPago, {
    foreignKey: 'metodo_pago_id',
    as: 'metodoPago',
  });

  MetodoPago.hasMany(Pago, {
    foreignKey: 'metodo_pago_id',
    as: 'pagos',
  });

  Pago.hasMany(AplicacionPago, {
    foreignKey: 'pago_id',
    as: 'aplicaciones',
  });

  AplicacionPago.belongsTo(Pago, {
    foreignKey: 'pago_id',
    as: 'pago',
  });

  Cuota.hasMany(AplicacionPago, {
    foreignKey: 'cuota_id',
    as: 'aplicaciones',
  });

  AplicacionPago.belongsTo(Cuota, {
    foreignKey: 'cuota_id',
    as: 'cuota',
  });

  Pago.hasMany(Comprobante, {
    foreignKey: 'pago_id',
    as: 'comprobantes',
  });

  Comprobante.belongsTo(Pago, {
    foreignKey: 'pago_id',
    as: 'pago',
  });

  /*
   * ============================
   * CAJA
   * ============================
   */

  Caja.hasMany(SesionCaja, {
    foreignKey: 'caja_id',
    as: 'sesiones',
  });

  SesionCaja.belongsTo(Caja, {
    foreignKey: 'caja_id',
    as: 'caja',
  });

  Usuario.hasMany(SesionCaja, {
    foreignKey: 'usuario_id',
    as: 'sesionesCaja',
  });

  SesionCaja.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario',
  });

  SesionCaja.hasMany(MovimientoCaja, {
    foreignKey: 'sesion_caja_id',
    as: 'movimientos',
  });

  MovimientoCaja.belongsTo(SesionCaja, {
    foreignKey: 'sesion_caja_id',
    as: 'sesionCaja',
  });

  /*
   * ============================
   * RBAC
   * ============================
   */

  Usuario.belongsToMany(Rol, {
    through: UsuarioRol,
    foreignKey: 'usuario_id',
    otherKey: 'rol_id',
    as: 'roles',
  });

  Rol.belongsToMany(Usuario, {
    through: UsuarioRol,
    foreignKey: 'rol_id',
    otherKey: 'usuario_id',
    as: 'usuarios',
  });

  Rol.belongsToMany(Permiso, {
    through: RolPermiso,
    foreignKey: 'rol_id',
    otherKey: 'permiso_id',
    as: 'permisos',
  });

  Permiso.belongsToMany(Rol, {
    through: RolPermiso,
    foreignKey: 'permiso_id',
    otherKey: 'rol_id',
    as: 'roles',
  });
}
