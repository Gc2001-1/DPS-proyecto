export const ROLES = [
  "administrador_ti",
  "gerente",
  "analista_nomina",
  "asistente_planilla",
  "jefe_inmediato",
  "empleado",
] as const;

export type Rol = (typeof ROLES)[number];

export type SolicitudAction = "aprobar_vacaciones" | "aprobar_permisos" | "revisar";

const rolesGestionRRHH: Rol[] = [
  "administrador_ti",
  "gerente",
  "analista_nomina",
  "asistente_planilla",
  "jefe_inmediato",
];

export function canAccessPath(role: Rol | null, pathname: string) {
  if (!role) return false;
  if (pathname === "/dashboard" || pathname === "/solicitudes") {
    return rolesGestionRRHH.includes(role);
  }
  return true;
}

export function canPerformSolicitudAction(
  role: Rol | null,
  action: SolicitudAction,
) {
  if (!role) return false;

  if (action === "aprobar_vacaciones") {
    return role === "gerente" || role === "jefe_inmediato";
  }

  if (action === "aprobar_permisos") {
    return role === "jefe_inmediato" || role === "gerente";
  }

  return role === "analista_nomina" || role === "asistente_planilla" || role === "gerente";
}

export function isRol(value: unknown): value is Rol {
  return typeof value === "string" && ROLES.includes(value as Rol);
}