import { NextResponse } from "next/server";
import { adminAuth, isValidRole } from "@/services/firebase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    configured: Boolean(adminAuth),
    roles: [
      "administrador_ti",
      "gerente",
      "analista_nomina",
      "asistente_planilla",
      "jefe_inmediato",
      "empleado",
    ],
  });
}

export async function POST(request: Request) {
  if (!adminAuth) {
    return NextResponse.json(
      { error: "Firebase Admin no está configurado. Revisa FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const { uid, email, role } = body as { uid?: string; email?: string; role?: string };

  const requestedRole = typeof role === "string" ? role.trim() : "";

  if (!isValidRole(requestedRole)) {
    return NextResponse.json(
      {
        error: `Rol inválido: ${requestedRole || "vacío"}. Debe ser uno de: administrador_ti, gerente, analista_nomina, asistente_planilla, jefe_inmediato, empleado.`,
      },
      { status: 400 },
    );
  }

  let resolvedUid = typeof uid === "string" ? uid.trim() : "";

  if (!resolvedUid && typeof email === "string" && email.trim()) {
    const user = await adminAuth.getUserByEmail(email.trim());
    resolvedUid = user.uid;
  }

  if (!resolvedUid) {
    return NextResponse.json(
      { error: "Debes enviar uid o email para asignar el rol." },
      { status: 400 },
    );
  }

  await adminAuth.setCustomUserClaims(resolvedUid, { rol: requestedRole });

  return NextResponse.json({
    success: true,
    uid: resolvedUid,
    role: requestedRole,
  });
}
