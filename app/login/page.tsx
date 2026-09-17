"use client";

import { FormEvent, useState } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../services/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);

  const getAuthErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "El correo o el PIN no son válidos.";
      case "auth/too-many-requests":
        return "Demasiados intentos. Intenta nuevamente más tarde.";
      case "auth/user-disabled":
        return "Esta cuenta está deshabilitada. Contacta a Recursos Humanos.";
      case "auth/invalid-email":
        return "Ingresa un correo electrónico válido.";
      default:
        return "No se pudo iniciar sesión. Intenta nuevamente.";
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, correo.trim(), pin);
      router.push("/dashboard");
    } catch (error) {
      setError(
        getAuthErrorMessage(
          error instanceof Error && "code" in error ? String(error.code) : "",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError("");
    setMessage("");

    if (!correo.trim()) {
      setError("Ingresa tu correo para recuperar el PIN.");
      return;
    }

    setResetting(true);

    try {
      await sendPasswordResetEmail(auth, correo.trim());
      setMessage("Revisa tu correo para restablecer el PIN.");
    } catch (error) {
      setError(
        getAuthErrorMessage(
          error instanceof Error && "code" in error ? String(error.code) : "",
        ),
      );
    } finally {
      setResetting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <section className="w-full max-w-[618px]">
        <header className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-[40px]">
            Gestion Recursos Humanos
          </h1>
          <h2 className="mt-12 text-3xl font-semibold text-black">Bienvenido</h2>
          <p className="mt-7 text-xl font-semibold text-black/50">
            Ingrese sus credenciales para continuar
          </p>
        </header>

        <form className="mt-12" onSubmit={handleSubmit}>
          <label
            className="block text-3xl font-semibold text-black"
            htmlFor="correo"
          >
            Correo electrónico
          </label>
          <input
            id="correo"
            name="correo"
            type="email"
            autoComplete="username"
            placeholder="RRHH@didelco.com"
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
            className="mt-7 h-[71px] w-full rounded-[15px] bg-[#d9d9d9] px-5 text-2xl font-semibold text-black/65 outline-none transition focus:ring-2 focus:ring-[#4c7cec]"
          />

          <label
            className="mt-10 block text-3xl font-semibold text-black"
            htmlFor="pin"
          >
            PIN
          </label>
          <input
            id="pin"
            name="pin"
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            placeholder="......."
            value={pin}
            onChange={(event) => setPin(event.target.value)}
            className="mt-7 h-[75px] w-full rounded-[15px] bg-[#d9d9d9] px-8 text-4xl font-semibold tracking-[0.35em] text-black/65 outline-none transition focus:ring-2 focus:ring-[#4c7cec]"
          />

          {error && (
            <p className="mt-4 text-center text-sm font-semibold text-red-600" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="mt-4 text-center text-sm font-semibold text-emerald-600" role="status">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mx-auto mt-12 block h-[86px] w-full max-w-[492px] rounded-[20px] bg-[#4c7cec]/80 text-3xl font-semibold text-white transition hover:bg-[#4c7cec] focus:outline-none focus:ring-2 focus:ring-[#315ec8] focus:ring-offset-2 sm:text-[40px]"
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>

          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={loading || resetting}
            className="mx-auto mt-12 block text-xl font-semibold text-black/50 transition hover:text-black/70"
          >
            {resetting ? "Enviando correo..." : "¿Olvidaste tu PIN?"}
          </button>
        </form>
      </section>
    </main>
  );
}