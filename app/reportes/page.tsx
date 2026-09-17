'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { empleadosMock } from '../../mocks/empleados';

export default function ReportesPage() {
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [empresaFiltro, setEmpresaFiltro] = useState('Todas');
  const [deptoFiltro, setDeptoFiltro] = useState('Todos');

  useEffect(() => {
    setEmpleados(empleadosMock);
  }, []);

  // Filtrado de empleados
  const empleadosFiltrados = useMemo(() => {
    const busqueda = searchTerm.toLowerCase().trim();

    return empleados.filter((emp) => {
      // Normalización de datos
      const id = (emp.empleadoId || emp.id || '').toString().toLowerCase();
      const nombres = (emp.nombres || '').toLowerCase();
      const paterno = (emp.apellidoPaterno || '').toLowerCase();
      const materno = (emp.apellidoMaterno || '').toLowerCase();
      const nombreCompleto = `${nombres} ${paterno} ${materno}`.trim();

      const empresaNombre = emp.empresa || emp.empresaNombre || 'Didelco';
      const departamentoOriginal = emp.departamento || (emp.departamentoId ? `Depto ${emp.departamentoId}` : '');
      const departamentoTexto = departamentoOriginal.toLowerCase();

      // Coincidencia de texto
      const coincideTexto =
        !busqueda ||
        id.includes(busqueda) ||
        nombreCompleto.includes(busqueda) ||
        empresaNombre.toLowerCase().includes(busqueda) ||
        departamentoTexto.includes(busqueda);

      // Coincidencia por Selectores
      const coincideEmpresa =
        empresaFiltro === 'Todas' ||
        empresaNombre.toLowerCase() === empresaFiltro.toLowerCase();

      const coincideDepto =
        deptoFiltro === 'Todos' ||
        departamentoTexto === deptoFiltro.toLowerCase() ||
        (emp.departamentoId && `depto ${emp.departamentoId}` === deptoFiltro.toLowerCase());

      return coincideTexto && coincideEmpresa && coincideDepto;
    });
  }, [empleados, searchTerm, empresaFiltro, deptoFiltro]);

  // Métricas de conteo
  const totalFiltrados = empleadosFiltrados.length;
  const totalActivos = useMemo(() => {
    return empleadosFiltrados.filter(
      (e) => !e.estado || e.estado.toLowerCase() === 'activo'
    ).length;
  }, [empleadosFiltrados]);

  // Cálculo dinámico para la tarjeta de Filtro Empresa
  const textoEmpresaKPI = useMemo(() => {
    if (empresaFiltro !== 'Todas') {
      return empresaFiltro;
    }

    // Extrae las empresas de los resultados actuales
    const empresasEnVista = Array.from(
      new Set(empleadosFiltrados.map((e) => e.empresa || e.empresaNombre || 'Didelco'))
    );

    if (empresasEnVista.length === 1) {
      return empresasEnVista[0];
    } else if (empresasEnVista.length > 1) {
      return `${empresasEnVista.length} Empresas`;
    }

    return 'Todas';
  }, [empresaFiltro, empleadosFiltrados]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reportes de Empleados</h1>
          <p className="text-sm text-gray-500">
            Consulta, filtrado avanzado y exportación del personal registrado de Grupo Calma
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition-all duration-200 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exportar a Excel / PDF
        </button>
      </div>

      {/* Tarjetas de Resumen (KPIs del Filtro Actual) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Resultados Obtenidos</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalFiltrados}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Colaboradores Activos</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">{totalActivos}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

<<<<<<< Updated upstream
        {/* Tarjeta dinámica corregida */}
=======
        {/* Tarjeta dinámica  */}
>>>>>>> Stashed changes
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Filtro Empresa</p>
            <h3 className="text-lg font-bold text-gray-700 mt-1">{textoEmpresaKPI}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m0 0v-5a2 2 0 00-2-2h-2a2 2 0 00-2 2v5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tarjeta Principal de Tabla */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        {/* Controles de Búsqueda y Selectores */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          
          {/* Campo de búsqueda */}
          <div className="relative w-full lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por código, nombre o depto..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Menús desplegables de filtro */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-500">Empresa:</label>
              <select
                value={empresaFiltro}
                onChange={(e) => setEmpresaFiltro(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl text-sm px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Todas">Todas</option>
                <option value="Didelco">Didelco</option>
                <option value="Steel">Steel</option>
                <option value="EFL">EFL</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-500">Depto:</label>
              <select
                value={deptoFiltro}
                onChange={(e) => setDeptoFiltro(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl text-sm px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Todos">Todos</option>
                <option value="Depto 01">Depto 01</option>
                <option value="Depto 02">Depto 02</option>
                <option value="Depto 03">Depto 03</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="py-3.5 px-4 font-semibold">ID</th>
                <th className="py-3.5 px-4 font-semibold">Nombre Completo</th>
                <th className="py-3.5 px-4 font-semibold">Departamento</th>
                <th className="py-3.5 px-4 font-semibold">Empresa</th>
                <th className="py-3.5 px-4 font-semibold">Contratación</th>
                <th className="py-3.5 px-4 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {empleadosFiltrados.length > 0 ? (
                empleadosFiltrados.map((emp, index) => {
                  const empId = emp.empleadoId || emp.id || `EMP-${index}`;
                  const nombreEmpresa = emp.empresa || emp.empresaNombre || 'Didelco';
                  const nombreDepto = emp.departamento || `Depto ${emp.departamentoId || '01'}`;
                  const esActivo = !emp.estado || emp.estado.toLowerCase() === 'activo';

                  return (
                    <tr key={empId} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-semibold text-blue-600">
                        {empId}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-gray-800">
                        {`${emp.nombres || ''} ${emp.apellidoPaterno || ''} ${emp.apellidoMaterno || ''}`.trim() || 'Sin Nombre'}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium">
                          {nombreDepto}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-gray-700">
                        {nombreEmpresa}
                      </td>
                      <td className="py-3.5 px-4 text-gray-500 font-mono text-xs">
                        {emp.fechaContratacion || 'N/A'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                            esActivo
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                              : 'bg-red-50 text-red-600 border-red-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              esActivo ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                          ></span>
                          {emp.estado || 'Activo'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400 text-sm">
                    No se encontraron colaboradores con los criterios seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}