export const ROLES = [
  "administrador_ti",
  "gerente",
  "analista_nomina",
  "asistente_planilla",
  "jefe_inmediato",
  "empleado",
] as const;

export type Rol = (typeof ROLES)[number];

export function isRol(value: unknown): value is Rol {
  return typeof value === "string" && ROLES.includes(value as Rol);
}

export function canPerformSolicitudAction(role: Rol | null, action: "revisar") {
  return action === "revisar" && role !== null && role !== "empleado";
}

export function canAccessPath(role: Rol | null, pathname: string) {
  if (!role) return false;
  return pathname === "/dashboard" || pathname === "/solicitudes"
    ? role !== "empleado"
    : true;
}
