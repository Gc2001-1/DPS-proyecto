"use client";

import React, { useMemo, useState } from "react";
import { solicitudesMock } from "../../mocks/mocks/solicitudes";
import { empleadosMock } from "../../mocks/empleados";
import { useAuth } from "../components/auth-provider";
import { canPerformSolicitudAction } from "../../services/roles";

interface Solicitud {
    id: string;
    empleadoId: string;
    estado: string;
}

type Tipo = "Permiso Personal" | "Vacaciones" | "Constancia Laboral";

const datos: Record<string, { tipo: Tipo; fecha: string; empresa: string }> = {
    "1": { tipo: "Permiso Personal", fecha: "25 Agosto 8:00 - 12:00", empresa: "Didelco" },
    "2": { tipo: "Vacaciones", fecha: "01/Sep/26 - 05/Sep/26", empresa: "Steel" },
    "3": { tipo: "Constancia Laboral", fecha: "01/Septiembre/26", empresa: "EFL" },
    "4": { tipo: "Constancia Laboral", fecha: "15/Agosto/26", empresa: "Didelco" },
};

export default function SolicitudesPage() {
    const { role } = useAuth();
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>(solicitudesMock);
    const [categoria, setCategoria] = useState("Todos");
    const [estado, setEstado] = useState("Todos");
    const [empresa, setEmpresa] = useState("Todas");
    const [fecha, setFecha] = useState("");

    const solicitudesVisuales = solicitudes.map((s) => ({
        ...s,
        ...(datos[s.id] || {
            tipo: "Permiso Personal" as Tipo,
            fecha: "Sin fecha",
            empresa: "Didelco",
        }),
    }));

    const filtradas = useMemo(() => solicitudesVisuales.filter((s) => {
        const cat =
            categoria === "Todos" ||
            (categoria === "Permisos" && s.tipo === "Permiso Personal") ||
            (categoria === "Vacaciones" && s.tipo === "Vacaciones") ||
            (categoria === "Constancias" && s.tipo === "Constancia Laboral");

        return cat &&
            (estado === "Todos" || s.estado === estado) &&
            (empresa === "Todas" || s.empresa === empresa);
    }), [solicitudes, categoria, estado, empresa]);

    const empleados = (id: string) =>
        empleadosMock.find((e) => e.empleadoId === id);

    const cambiarEstado = (id: string, nuevoEstado: string) => {
        const solicitud = solicitudesVisuales.find((item) => item.id === id);
        const action = solicitud?.tipo === "Vacaciones"
            ? "aprobar_vacaciones"
            : "aprobar_permisos";

        if (!canPerformSolicitudAction(role, action)) return;

        setSolicitudes((lista) =>
            lista.map((s) =>
                s.id === id ? { ...s, estado: nuevoEstado } : s
            )
        );
    };

    const verSolicitud = (s: any) => {
        const e = empleados(s.empleadoId);
        alert(
            `Solicitud #${s.id}\n\nEmpleado: ${e ? `${e.nombres} ${e.apellidoPaterno}${e.apellidoMaterno}` : s.empleadoId
            }\nTipo: ${s.tipo}\nFecha: ${s.fecha}\nEmpresa: ${s.empresa}\nEstado: ${s.estado}`
        );
    };

    const limpiar = () => {
        setCategoria("Todos");
        setEstado("Todos");
        setEmpresa("Todas");
        setFecha("");
    };

    const categorias = [
        ["Todos", solicitudes.length, "blue"],
        ["Permisos", solicitudesVisuales.filter((s) => s.tipo === "Permiso Personal").length, "orange"],
        ["Vacaciones", solicitudesVisuales.filter((s) => s.tipo === "Vacaciones").length, "red"],
        ["Constancias", solicitudesVisuales.filter((s) => s.tipo === "Constancia Laboral").length, "green"],
    ];

    return (
        <div className="w-full text-[#14263d]">
            <div className="flex justify-between items-start mb-7">
                <div>
                    <h1 className="text-[25px] font-bold">Gestión de solicitudes</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Viernes 12 de Agosto de 2026
                    </p>
                </div>

                <button className="bg-[#bcd6fb] hover:bg-[#aacbf7] px-7 py-3 rounded-xl text-sm font-semibold transition-all">
                    Nueva Solicitud
                </button>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-7">
                {categorias.map(([nombre, cantidad, color]) => (
                    <button
                        key={String(nombre)}
                        onClick={() => setCategoria(String(nombre))}
                        className={`h-[55px] rounded-xl border flex items-center justify-between px-8 font-semibold text-sm transition-all ${
                            categoria === nombre
                                ? "bg-[#bcd6fb] border-[#bcd6fb]"
                                : "bg-white border-gray-300 hover:border-gray-400"
                        }`}
                    >
                        <span>{nombre}</span>
                        <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                                color === "blue"
                                    ? "bg-[#4d8df7] text-white"
                                    : color === "orange"
                                    ? "bg-[#fff0d8] text-[#e89100]"
                                    : color === "red"
                                    ? "bg-[#ffe0e0] text-[#ed5a5a]"
                                    : "bg-[#d9f8e7] text-[#28a765]"
                            }`}
                        >
                            {cantidad}
                        </span>
                    </button>
                ))}
            </div>

            <div className="flex gap-4 mb-7">
                <select
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    className="h-[43px] min-w-[190px] bg-white border border-gray-300 rounded-lg px-4 text-sm outline-none"
                >
                    <option>Todas</option>
                    <option>Didelco</option>
                    <option>Steel</option>
                    <option>Propultran</option>
                    <option>DCA</option>
                    <option>EFL</option>
                    <option>Inver Calma</option>
                </select>

                <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="h-[43px] min-w-[205px] bg-white border border-gray-300 rounded-lg px-4 text-sm outline-none"
                >
                    <option>Todos</option>
                    <option>Pendiente</option>
                    <option>Aprobada</option>
                    <option>Rechazada</option>
                </select>

                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="h-[43px] w-[180px] bg-white border border-gray-300 rounded-lg px-4 text-sm outline-none"
                />

                {(categoria !== "Todos" ||
                    estado !== "Todos" ||
                    empresa !== "Todas" ||
                    fecha) && (
                    <button onClick={limpiar} className="text-blue-600 text-sm font-semibold hover:underline">
                        Limpiar filtros
                    </button>
                )}
            </div>

            <div className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-300 bg-gray-50/50">
                                <th className="text-left px-7 py-5 text-sm text-gray-600">Empleado / Área</th>
                                <th className="text-left px-5 py-5 text-sm text-gray-600">Tipo</th>
                                <th className="text-left px-5 py-5 text-sm text-gray-600">Fecha / Horario</th>
                                <th className="text-left px-5 py-5 text-sm text-gray-600">Empresa</th>
                                <th className="text-left px-5 py-5 text-sm text-gray-600">Estado</th>
                                <th className="text-center px-5 py-5 text-sm text-gray-600">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtradas.map((s) => {
                                const e = empleados(s.empleadoId);
                                const nombre = e
                                    ? `${e.nombres} ${e.apellidoPaterno} ${e.apellidoMaterno}`
                                    : s.empleadoId;

                                return (
                                    <tr
                                        key={s.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-7 py-5">
                                            <div className="font-semibold text-[15px] text-gray-900">
                                                {nombre}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {e ? `Depto ${e.departamentoId}` : "Sin departamento"}
                                            </div>
                                        </td>

                                        <td className="px-5 py-5 font-semibold text-[15px] text-gray-800">
                                            {s.tipo}
                                        </td>

                                        <td className="px-5 py-5 text-sm text-gray-500 whitespace-nowrap">
                                            {s.fecha}
                                        </td>

                                        <td className="px-5 py-5 font-semibold text-gray-800">
                                            {s.empresa}
                                        </td>

                                        <td className="px-5 py-5 font-semibold">
                                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs ${
                                                s.estado === "Aprobada"
                                                    ? "bg-green-100 text-green-700"
                                                    : s.estado === "Rechazada"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}>
                                                {s.estado === "Aprobada"
                                                    ? "Aprobado"
                                                    : s.estado === "Rechazada"
                                                    ? "Rechazado"
                                                    : "Pendiente"}
                                            </span>
                                        </td>

<td className="px-5 py-5">
                                                <div className="flex justify-center gap-3">
                                                    {canPerformSolicitudAction(
                                                        role,
                                                        s.tipo === "Vacaciones"
                                                            ? "aprobar_vacaciones"
                                                            : "aprobar_permisos",
                                                    ) && (
                                                        <>
                                                            <button
                                                                onClick={() => cambiarEstado(s.id, "Aprobada")}
                                                                className="w-7 h-7 border border-green-500 rounded-md text-green-600 flex items-center justify-center hover:bg-green-50 transition-colors"
                                                                title="Aprobar"
                                                            >
                                                                ✓
                                                            </button>

                                                            <button
                                                                onClick={() => cambiarEstado(s.id, "Rechazada")}
                                                                className="w-7 h-7 border border-red-500 rounded-md text-red-600 flex items-center justify-center hover:bg-red-50 transition-colors"
                                                                title="Rechazar"
                                                            >
                                                                ×
                                                            </button>
                                                        </>
                                                    )}

                                                <button
                                                    onClick={() => verSolicitud(s)}
                                                    className="w-7 h-7 text-orange-500 text-lg flex items-center justify-center hover:bg-orange-50 rounded-md transition-colors"
                                                    title="Ver detalle"
                                                >
                                                    ◉
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                            {!filtradas.length && (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-gray-500 text-sm">
                                        No se encontraron solicitudes.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-7 py-4 bg-gray-50/50 border-t border-gray-200">
                    <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                        <span className="px-4 py-2 text-sm text-gray-600 border-r border-gray-200">
                            1 - {filtradas.length} solicitudes
                        </span>
                        <button className="w-10 h-9 hover:bg-gray-100 text-gray-600 flex items-center justify-center text-lg">‹</button>
                        <button className="w-10 h-9 border-l border-gray-200 hover:bg-gray-100 text-gray-600 flex items-center justify-center text-lg">
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}