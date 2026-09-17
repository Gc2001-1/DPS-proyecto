import { NextResponse } from "next/server";
import { DecodedIdToken } from "firebase-admin/auth";
import { getAdminAuth } from "../../../../services/firebase-admin";
import { isRol } from "../../../../services/roles";

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice("Bearer ".length).trim();
}

function canManageClaims(token: DecodedIdToken) {
  return (
    token.uid === process.env.FIREBASE_BOOTSTRAP_UID ||
    token.rol === "administrador_ti"
  );
}

export async function POST(request: Request) {
  const idToken = getBearerToken(request);

  if (!idToken) {
    return NextResponse.json({ error: "Falta el token de autenticación." }, { status: 401 });
  }

  try {
    const adminAuth = getAdminAuth();
    const caller = await adminAuth.verifyIdToken(idToken);

    if (!canManageClaims(caller)) {
      return NextResponse.json({ error: "No autorizado." }, { status: 403 });
    }

    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("uid" in body) ||
      !("rol" in body) ||
      typeof body.uid !== "string" ||
      !isRol(body.rol)
    ) {
      return NextResponse.json(
        { error: "El cuerpo debe incluir uid y un rol válido." },
        { status: 400 },
      );
    }

    await adminAuth.setCustomUserClaims(body.uid, { rol: body.rol });

    return NextResponse.json({
      message: "Rol asignado correctamente.",
      uid: body.uid,
      rol: body.rol,
    });
  } catch (error) {
    console.error("Error asignando Custom Claims", error);
    return NextResponse.json({ error: "No se pudo asignar el rol." }, { status: 500 });
  }
}