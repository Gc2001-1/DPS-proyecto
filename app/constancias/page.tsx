"use client";

import { useMemo, useState } from "react";
import { empleadosMock } from "../../mocks/empleados";

export default function ConstanciasPage() {
  const [empleadoId, setEmpleadoId] = useState(empleadosMock[0]?.empleadoId ?? "");
  const [tipo, setTipo] = useState("Constancia laboral");
  const [generada, setGenerada] = useState(false);

  const empleado = useMemo(
    () => empleadosMock.find((item) => item.empleadoId === empleadoId),
    [empleadoId],
  );

  const generarConstancia = () => setGenerada(true);

  return (
    <section className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Constancias</h1>
          <p className="mt-1 text-sm text-gray-500">
            Genera una constancia laboral a partir de la información del empleado.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Nueva constancia</h2>
            <label className="mt-5 block text-sm font-medium" htmlFor="empleado">
              Empleado
            </label>
            <select
              id="empleado"
              value={empleadoId}
              onChange={(event) => {
                setEmpleadoId(event.target.value);
                setGenerada(false);
              }}
              className="mt-2 h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              {empleadosMock.map((item) => (
                <option key={item.empleadoId} value={item.empleadoId}>
                  {item.empleadoId} - {item.nombres} {item.apellidoPaterno}
                </option>
              ))}
            </select>

            <label className="mt-5 block text-sm font-medium" htmlFor="tipo">
              Tipo de documento
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(event) => setTipo(event.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
            >
              <option>Constancia laboral</option>
              <option>Constancia salarial</option>
              <option>Constancia de vacaciones</option>
            </select>

            <button
              type="button"
              onClick={generarConstancia}
              className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Generar constancia
            </button>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            {generada && empleado ? (
              <article className="min-h-[360px] border border-gray-200 p-8">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Grupo Calma - Recursos Humanos
                </p>
                <h2 className="mt-10 text-center text-xl font-bold">{tipo}</h2>
                <p className="mt-10 text-justify text-sm leading-7 text-gray-700">
                  Por medio de la presente se hace constar que {empleado.nombres} {empleado.apellidoPaterno} {empleado.apellidoMaterno}, con código {empleado.empleadoId}, labora para {empleado.empresa} desde el {empleado.fechaContratacion}.
                </p>
                <p className="mt-8 text-sm text-gray-700">
                  Se extiende la presente constancia para los fines que la persona interesada estime convenientes.
                </p>
                <div className="mt-14 text-center text-xs text-gray-500">
                  Documento generado el {new Date().toLocaleDateString("es-SV")}
                </div>
              </article>
            ) : (
              <div className="flex min-h-[360px] items-center justify-center text-center text-sm text-gray-500">
                Selecciona un empleado y genera una constancia para ver la vista previa.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
