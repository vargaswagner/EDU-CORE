import { Persona } from './people/Persona.model.js';

import { Carrera } from './academic/Carrera.model.js';
import { PlanEstudios } from './academic/PlanEstudios.model.js';
import { Ciclo } from './academic/Ciclo.model.js';
import { Curso } from './academic/Curso.model.js';
import { PlanEstudiosCurso } from './academic/PlanEstudiosCurso.model.js';
import { PrerrequisitoCurso } from './academic/PrerrequisitoCurso.model.js';
import { PeriodoAcademico } from './academic/PeriodoAcademico.model.js';
import { Turno } from './academic/Turno.model.js';
import { Modalidad } from './academic/Modalidad.model.js';
import { Aula } from './academic/Aula.model.js';
import { Docente } from './academic/Docente.model.js';
import { Seccion } from './academic/Seccion.model.js';
import { HorarioSeccion } from './academic/HorarioSeccion.model.js';

import { Estudiante } from './student/Estudiante.model.js';

import { Matricula } from './enrollment/Matricula.model.js';
import { MatriculaDetalle } from './enrollment/MatriculaDetalle.model.js';

import { ConceptoPago } from './finance/ConceptoPago.model.js';
import { CronogramaPago } from './finance/CronogramaPago.model.js';
import { Cuota } from './finance/Cuota.model.js';
import { MetodoPago } from './finance/MetodoPago.model.js';
import { Pago } from './finance/Pago.model.js';
import { AplicacionPago } from './finance/AplicacionPago.model.js';

import { Caja } from './cash/Caja.model.js';
import { SesionCaja } from './cash/SesionCaja.model.js';
import { MovimientoCaja } from './cash/MovimientoCaja.model.js';

import { Usuario } from './identity/Usuario.model.js';
import { Rol } from './identity/Rol.model.js';
import { Permiso } from './identity/Permiso.model.js';
import { UsuarioRol } from './identity/UsuarioRol.model.js';
import { RolPermiso } from './identity/RolPermiso.model.js';
import { Sesion } from './identity/Sesion.model.js';

const models = {
  Sesion,
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

  Caja,
  SesionCaja,
  MovimientoCaja,

  Usuario,
  Rol,
  Permiso,
  UsuarioRol,
  RolPermiso,
};

export default models;
