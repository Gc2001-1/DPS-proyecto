export interface Empleado {
  empleadoId: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  departamentoId: string;
  empresa: string;
  fechaContratacion: string;
  fechaUltVacacion: string | null;
  diasAntVacacion: number;
  ultAsignacionVacac: string | null;
  jefe: string | null;
  rol: "administrador_ti" | "gerente" | "analista_nomina" | "asistente_planilla" | "jefe_inmediato" | "empleado";
  estadoEmpleado: string;
}

export const empleadosMock: Empleado[] = [
  { empleadoId: "E001", nombres: "Carlos Alberto", apellidoPaterno: "Cornejo", apellidoMaterno: "Calderón", departamentoId: "01", empresa: "Didelco", fechaContratacion: "2018-09-01", fechaUltVacacion: "2026-02-20", diasAntVacacion: 15, ultAsignacionVacac: "2025-09-01", jefe: null, rol: "gerente", estadoEmpleado: "A" },
  { empleadoId: "E002", nombres: "David Antonio", apellidoPaterno: "Leiva", apellidoMaterno: "Martínez", departamentoId: "01", empresa: "Steel", fechaContratacion: "2020-03-15", fechaUltVacacion: "2025-04-10", diasAntVacacion: 10, ultAsignacionVacac: "2026-03-15", jefe: "E001", rol: "analista_nomina", estadoEmpleado: "A" },
  { empleadoId: "E003", nombres: "Moisés David", apellidoPaterno: "García", apellidoMaterno: "Casco", departamentoId: "02", empresa: "EFL", fechaContratacion: "2024-01-10", fechaUltVacacion: null, diasAntVacacion: 15, ultAsignacionVacac: "2026-01-10", jefe: "E001", rol: "asistente_planilla", estadoEmpleado: "A" },
  { empleadoId: "E004", nombres: "Alcyr Alexander", apellidoPaterno: "Figueroa", apellidoMaterno: "Landaverde", departamentoId: "02", empresa: "Didelco", fechaContratacion: "2022-07-01", fechaUltVacacion: "2025-12-15", diasAntVacacion: 0, ultAsignacionVacac: "2025-07-01", jefe: "E002", rol: "jefe_inmediato", estadoEmpleado: "A" },
  { empleadoId: "E005", nombres: "Nelson Mauricio", apellidoPaterno: "Solano", apellidoMaterno: "Guardado", departamentoId: "03", empresa: "Didelco", fechaContratacion: "2025-11-20", fechaUltVacacion: null, diasAntVacacion: 0, ultAsignacionVacac: null, jefe: "E004", rol: "empleado", estadoEmpleado: "A" },
];
