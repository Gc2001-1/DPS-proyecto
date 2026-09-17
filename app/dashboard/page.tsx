'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const solicitudes = [
    { empleado: 'Juan Perez', codigo: 'EMP-0102', empresa: 'Didelco', sucursal: 'Apopa', tipo: 'Vacaciones', fecha: '17 Agosto' },
    { empleado: 'Ana Flores', codigo: 'EMP-0215', empresa: 'Steel', sucursal: '—', tipo: 'Permiso Medico', fecha: '15 Agosto' },
    { empleado: 'Carlos Rivas', codigo: 'EMP-0083', empresa: 'Didelco', sucursal: 'Usulutan', tipo: 'Constancia Laboral', fecha: '11 Agosto' },
    { empleado: 'Jose Sanchez', codigo: 'EMP-0341', empresa: 'EFL', sucursal: '—', tipo: 'Vacaciones', fecha: '9 Agosto' },
    { empleado: 'Francisco Casco', codigo: 'EMP-0178', empresa: 'Copro', sucursal: '—', tipo: 'Permiso Medico', fecha: '14 Agosto' },
    { empleado: 'Ana Cruz', codigo: 'EMP-0204', empresa: 'DCA', sucursal: '—', tipo: 'Constancia Laboral', fecha: '16 Agosto' },
    { empleado: 'Roberto Gomez', codigo: 'EMP-0286', empresa: 'Propultran', sucursal: '—', tipo: 'Vacaciones', fecha: '18 Agosto' },
    { empleado: 'Elena Torres', codigo: 'EMP-0312', empresa: 'Inver Calma', sucursal: '—', tipo: 'Permiso Medico', fecha: '20 Agosto' },
  ];

  const datosVacaciones = [
    { name: 'Juan P.', dias: 5 },
    { name: 'Jose S.', dias: 8 },
    { name: 'Ana F.', dias: 3 },
    { name: 'Carlos R.', dias: 10 },
    { name: 'Elena T.', dias: 6 },
  ];

  return (
<<<<<<< HEAD
<<<<<<< Updated upstream
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard - RRHH</h1>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-700">Total Empleados</p>
            <h3 className="text-3xl font-bold text-gray-900">{empleados.length}</h3>
=======
=======
>>>>>>> upstream/main
    <div className="space-y-6">
      {/* Contenido principal  */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Columna Izquierda: Tabla de Solicitudes Pendientes  */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">Solicitudes pendientes de aprobación</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      <th className="pb-3.5 font-semibold">EMPLEADO</th>
                      <th className="pb-3.5 font-semibold">EMPRESA</th>
                      <th className="pb-3.5 font-semibold">SUCURSAL</th>
                      <th className="pb-3.5 font-semibold">TIPO</th>
                      <th className="pb-3.5 font-semibold">FECHA</th>
                      <th className="pb-3.5 font-semibold text-center">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-700">
                    {solicitudes.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3.5">
                          <div className="font-bold text-gray-900">{item.empleado}</div>
                          <div className="text-[10px] text-gray-400 font-normal">{item.codigo}</div>
                        </td>
                        <td className="py-3.5 text-gray-600">{item.empresa}</td>
                        <td className="py-3.5 text-gray-500">{item.sucursal}</td>
                        <td className="py-3.5 text-gray-600">{item.tipo}</td>
                        <td className="py-3.5 text-gray-500">{item.fecha}</td>
                        <td className="py-3.5">
                          <div className="flex items-center justify-center gap-2">
                            <button className="w-7 h-7 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors shadow-sm">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button className="w-7 h-7 rounded-lg border border-red-200 bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors shadow-sm">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> upstream/main
          </div>
        </div>

        {/* Columna Derecha: Tarjetas y Gráfico */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          {/* 1. Tarjeta de Barras de Progreso */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Vacaciones</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Permisos</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Constancias</span>
              </div>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>

          {/* 2. Tarjeta de Vacaciones próximas a vencer */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Vacaciones próximas a vencer</h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-800">Juan Perez</p>
                  <p className="text-[10px] text-gray-400 font-mono">EMP-0102</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-800">Jose Sanchez</p>
                  <p className="text-[10px] text-gray-400 font-mono">EMP-0341</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              </div>
            </div>
          </div>

          {/* 3. Gráfico de Vacaciones */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex-1 flex flex-col justify-center">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Vacaciones Próximas a Vencer (Días)</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={datosVacaciones}>
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="dias" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

<<<<<<< HEAD
<<<<<<< Updated upstream
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-700">Empleados c/ Vacaciones</p>
            <h3 className="text-3xl font-bold text-emerald-600">{empleadosConDerecho}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-700">Alertas Vencimiento</p>
            <h3 className="text-3xl font-bold text-rose-600">{alertasVencimiento}</h3>
          </div>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Empleados por Departamento</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataEmpleadosPorDepto}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Estado de Solicitudes</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataEstadoSolicitudes}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  label
                >
                  {dataEstadoSolicitudes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
=======
>>>>>>> Stashed changes
=======
>>>>>>> upstream/main
      </div>
    </div>
  );
}