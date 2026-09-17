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
            `Solicitud #${s.id}\n\nEmpleado: ${e ? `${e.nombres} ${e.apellidoPaterno} ${e.apellidoMaterno}` : s.empleadoId
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
        <div className="min-h-screen bg-[#f3f4f6] text-[#14263d]">
            <header className="h-[74px] bg-white border-b border-gray-300 flex items-center justify-between px-6">
                <div className="relative w-[355px]">
                    <span className="absolute left-4 top-2.5 text-xl">⌕</span>
                    <input
                        placeholder="Buscar empleado o solicitud"
                        className="w-full h-[42px] bg-[#e5e7eb] rounded-xl pl-12 pr-4 text-sm outline-none"
                    />
                </div>

                <div className="flex items-center h-full">
                    <button className="w-[70px] h-full border-r border-gray-300 text-2xl text-[#f5b400]">
                        ♧
                    </button>
                    <div className="flex items-center gap-4 px-5">
                        <div className="w-10 h-10 rounded-full bg-[#dce8ff] text-[#3778e8] flex items-center justify-center font-semibold">
                            MG
                        </div>
                        <span className="text-2xl">⋮</span>
                    </div>
                </div>
            </header>

            <main className="px-8 py-7">
                <div className="flex justify-between items-start mb-7">
                    <div>
                        <h1 className="text-[25px] font-bold">Gestión de solicitudes</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Viernes 12 de Agosto de 2026
                        </p>
                    </div>

                    <button className="bg-[#bcd6fb] hover:bg-[#aacbf7] px-7 py-3 rounded-xl text-sm font-semibold">
                        Nueva Solicitud
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-7">
                    {categorias.map(([nombre, cantidad, color]) => (
                        <button
                            key={nombre}
                            onClick={() => setCategoria(String(nombre))}
                            className={`h-[55px] rounded-xl border flex items-center justify-between px-8 font-semibold text-sm ${categoria === nombre
                                ? "bg-[#bcd6fb] border-[#bcd6fb]"
                                : "bg-white border-gray-300"
                                }`}
                        >
                            <span>{nombre}</span>
                            <span
                                className={`w-7 h-7 rounded-full flex items-center justify-center ${color === "blue"
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
                        <option>EFL</option>
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
                            <button onClick={limpiar} className="text-blue-600 text-sm">
                                Limpiar filtros
                            </button>
                        )}
                </div>

                <div className="bg-white border border-gray-300 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="text-left px-7 py-5 text-sm">Empleado / Área</th>
                                    <th className="text-left px-5 py-5 text-sm">Tipo</th>
                                    <th className="text-left px-5 py-5 text-sm">Fecha / Horario</th>
                                    <th className="text-left px-5 py-5 text-sm">Empresa</th>
                                    <th className="text-left px-5 py-5 text-sm">Estado</th>
                                    <th className="text-center px-5 py-5 text-sm">Acciones</th>
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
                                            className="border-b border-gray-200 hover:bg-gray-50"
                                        >
                                            <td className="px-7 py-5">
                                                <div className="font-semibold text-[15px]">
                                                    {nombre}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {e ? `Depto ${e.departamentoId}` : "Sin departamento"}
                                                </div>
                                            </td>

                                            <td className="px-5 py-5 font-semibold text-[15px]">
                                                {s.tipo}
                                            </td>

                                            <td className="px-5 py-5 text-sm text-gray-500 whitespace-nowrap">
                                                {s.fecha}
                                            </td>

                                            <td className="px-5 py-5 font-semibold">
                                                {s.empresa}
                                            </td>

                                            <td className="px-5 py-5 font-semibold">
                                                {s.estado === "Aprobada"
                                                    ? "Aprobado"
                                                    : s.estado === "Rechazada"
                                                        ? "Rechazado"
                                                        : "Pendiente"}
                                            </td>

                                            <td className="px-5 py-5">
                                                <div className="flex justify-center gap-3">
                                                    {canPerformSolicitudAction(
                                                        role,
                                                        s.tipo === "Vacaciones"
                                                            ? "aprobar_vacaciones"
                                                            : "aprobar_permisos",
                                                    ) && <>
                                                        <button
                                                            onClick={() => cambiarEstado(s.id, "Aprobada")}
                                                            className="w-6 h-6 border border-green-500 rounded-md text-green-500 hover:bg-green-50"
                                                        >
                                                            ✓
                                                        </button>

                                                        <button
                                                            onClick={() => cambiarEstado(s.id, "Rechazada")}
                                                            className="w-6 h-6 border border-red-500 rounded-md text-red-500 hover:bg-red-50"
                                                        >
                                                            ×
                                                        </button>
                                                    </>}

                                                    <button
                                                        onClick={() => verSolicitud(s)}
                                                        className="w-7 h-6 text-orange-500 text-xl"
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
                                        <td colSpan={6} className="text-center py-12 text-gray-500">
                                            No se encontraron solicitudes.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-7 py-4">
                        <div className="inline-flex items-center border border-gray-500 rounded-lg overflow-hidden">
                            <span className="px-4 py-2 text-sm border-r border-gray-300">
                                1 - {filtradas.length} solicitudes
                            </span>
                            <button className="w-12 h-10 hover:bg-gray-100 text-xl">‹</button>
                            <button className="w-12 h-10 border-l border-gray-300 hover:bg-gray-100 text-xl">
                                ›
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}