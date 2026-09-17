'use client';

import React, { useState, useEffect } from 'react';
import { empleadosMock } from '../../mocks/empleados';
import { calcularDiasDisponibles, diasParaVencimiento } from '../../services/vacacionesService';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const COLORS = ['#F59E0B', '#10B981', '#EF4444'];

export default function DashboardRRHH() {
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEmpleados(empleadosMock);
    setSolicitudes([
      { id: '1', empleadoId: 'E001', estado: 'Pendiente' },
      { id: '2', empleadoId: 'E002', estado: 'Aprobada' },
      { id: '3', empleadoId: 'E003', estado: 'Aprobada' },
      { id: '4', empleadoId: 'E004', estado: 'Rechazada' },
      { id: '5', empleadoId: 'E005', estado: 'Pendiente' },
    ]);
    setLoading(false);
  }, []);

  const hoy = new Date();

  let totalDiasDisponiblesGlobal = 0;
  let empleadosConDerecho = 0;
  let alertasVencimiento = 0;

  empleados.forEach(emp => {
    if (emp.fechaContratacion) {
      const diasDisp = calcularDiasDisponibles(emp.fechaContratacion, emp.diasTomados || 0, hoy);
      if (diasDisp > 0) {
        empleadosConDerecho++;
        totalDiasDisponiblesGlobal += diasDisp;
      }

      const diasVencer = diasParaVencimiento(emp.fechaContratacion, hoy);
      if (diasVencer !== null && diasVencer <= 30 && diasVencer >= 0 && diasDisp > 0) {
        alertasVencimiento++;
      }
    }
  });

  const deptoCount = empleados.reduce((acc: any, curr: any) => {
    const depto = curr.departamentoId || 'Sin Asignar';
    acc[depto] = (acc[depto] || 0) + 1;
    return acc;
  }, {});

  const dataEmpleadosPorDepto = Object.keys(deptoCount).map(depto => ({
    name: `Depto ${depto}`,
    total: deptoCount[depto]
  }));

  const statusCount = solicitudes.reduce((acc: any, curr: any) => {
    const status = curr.estado || 'Pendiente';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const dataEstadoSolicitudes = [
    { name: 'Pendientes', value: statusCount['Pendiente'] || 0 },
    { name: 'Aprobadas', value: statusCount['Aprobada'] || 0 },
    { name: 'Rechazadas', value: statusCount['Rechazada'] || 0 },
  ];

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Cargando dashboard de recursos humanos...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard y Reportes - RRHH</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-700">Total Empleados</p>
            <h3 className="text-3xl font-bold text-gray-900">{empleados.length}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-700">Solicitudes Pendientes</p>
            <h3 className="text-3xl font-bold text-amber-600">
              {solicitudes.filter(s => s.estado === 'Pendiente' || !s.estado).length}
            </h3>
          </div>
        </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Reporte General de Empleados</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-700 text-sm">
                <th className="py-3 px-4 font-semibold">ID</th>
                <th className="py-3 px-4 font-semibold">Nombre Completo</th>
                <th className="py-3 px-4 font-semibold">Departamento</th>
                <th className="py-3 px-4 font-semibold">Contratación</th>
                <th className="py-3 px-4 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {empleados.map(emp => (
                <tr key={emp.empleadoId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{emp.empleadoId}</td>
                  <td className="py-3 px-4">{`${emp.nombres} ${emp.apellidoPaterno} ${emp.apellidoMaterno}`}</td>
                  <td className="py-3 px-4">Depto {emp.departamentoId}</td>
                  <td className="py-3 px-4">{emp.fechaContratacion}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Activo
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}