import { getApps, initializeApp, cert, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

const isConfigured = Boolean(projectId && clientEmail && privateKey);

export const adminApp: App | null = isConfigured
  ? getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({ projectId: projectId!, clientEmail: clientEmail!, privateKey: privateKey! }),
        projectId,
      })
  : null;

export const adminAuth: Auth | null = adminApp ? getAuth(adminApp) : null;

export const VALID_ROLES = [
  "administrador_ti",
  "gerente",
  "analista_nomina",
  "asistente_planilla",
  "jefe_inmediato",
  "empleado",
] as const;

export type AdminRole = (typeof VALID_ROLES)[number];

export function isValidRole(value: unknown): value is AdminRole {
  return typeof value === "string" && VALID_ROLES.includes(value as AdminRole);
}
