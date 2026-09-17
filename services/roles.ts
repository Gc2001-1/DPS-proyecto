export const ROLES = [
  "administrador_ti",
  "gerente",
  "analista_nomina",
  "asistente_planilla",
  "jefe_inmediato",
  "empleado",
] as const;

export type Rol = (typeof ROLES)[number];

export type SolicitudAction =
  | "revisar"
  | "aprobar_vacaciones"
  | "aprobar_permisos";

export function isRol(value: unknown): value is Rol {
  return typeof value === "string" && ROLES.includes(value as Rol);
}

export function canPerformSolicitudAction(
  role: Rol | null,
  action: SolicitudAction,
) {
  if (!role) return false;

  if (action === "revisar") {
    return role === "gerente" || role === "analista_nomina" || role === "asistente_planilla";
  }

  if (action === "aprobar_vacaciones") {
    return role === "gerente" || role === "jefe_inmediato";
  }

  return role === "gerente" || role === "jefe_inmediato";
}

export function canAccessPath(role: Rol | null, pathname: string) {
  if (!role) return false;
  return pathname === "/dashboard" || pathname === "/solicitudes"
    ? role !== "empleado"
    : true;
}
