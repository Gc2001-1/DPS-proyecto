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

export function resolveRoleFromUid(uid: string | null | undefined): Rol | null {
  if (!uid) return null;

  const rawMap = process.env.NEXT_PUBLIC_FIREBASE_ROLE_MAP ?? process.env.FIREBASE_ROLE_MAP ?? "{}";

  try {
    const parsed = JSON.parse(rawMap) as Record<string, string>;
    const mappedRole = parsed[uid];
    return isRol(mappedRole) ? mappedRole : null;
  } catch {
    return null;
  }
}

export function resolveRoleFromToken(currentUserUid: string | null | undefined, tokenRole: unknown): Rol | null {
  if (isRol(tokenRole)) return tokenRole;
  return resolveRoleFromUid(currentUserUid);
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

  const publicPaths = ["/login"];
  if (publicPaths.includes(pathname)) return true;

  if (pathname === "/dashboard" || pathname === "/solicitudes") {
    return true;
  }

  return true;
}
