'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './auth-provider';
import { canPerformSolicitudAction } from '../../services/roles';
import { usePathname } from 'next/navigation';

const activeClass = 'bg-blue-100 text-blue-600 font-semibold';
const inactiveClass = 'text-gray-600 hover:bg-gray-50 font-medium';

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, role, user } = useAuth();
  const canManageRequests = canPerformSolicitudAction(role, 'revisar');
  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '▦' },
    { name: 'Reportes', href: '/reportes', icon: '◔' },
    { name: 'Constancias', href: '#constancias', icon: '▤' },
    { name: 'Solicitudes', href: '/solicitudes', badge: '12', icon: '☑' },
  ];

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      name: 'Reportes',
      href: '/reportes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
    },
    {
      name: 'Constancias',
      href: '/dashboard/constancias',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: 'Solicitudes',
      href: '/solicitudes',
      badge: '12',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
<<<<<<< HEAD
<<<<<<< Updated upstream
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col justify-between border-r border-gray-200 bg-white p-4">
      <div>
        <div className="mb-6 flex items-center gap-3 px-2 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">GC</div>
          <div>
            <h2 className="text-sm font-bold leading-tight text-gray-800">GRUPO CALMA</h2>
            <p className="text-xs text-gray-400">Recursos Humanos</p>
          </div>
        </div>
        <nav className="space-y-1">
          {menuItems.filter((item) => item.name !== 'Solicitudes' || canManageRequests).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors ${isActive ? activeClass : inactiveClass}`}>
                <span className="flex items-center gap-3"><span className="w-5 text-center">{item.icon}</span><span>{item.name}</span></span>
                {item.badge && <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-600">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>
=======
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* 1. Logo / Encabezado Superior */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center">
            <img
              src="/LogoGC.png"
              alt="Grupo Calma Logo"
              className="w-9 h-9 object-contain rounded-xl shadow-md"
            />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-gray-900 tracking-tight">GRUPO CALMA</h1>
            <p className="text-[11px] font-medium text-gray-400">Recursos Humanos</p>
          </div>
        </div>
=======
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* 1. Logo / Encabezado Superior */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center">
            <img
              src="/LogoGC.png"
              alt="Grupo Calma Logo"
              className="w-9 h-9 object-contain rounded-xl shadow-md"
            />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-gray-900 tracking-tight">GRUPO CALMA</h1>
            <p className="text-[11px] font-medium text-gray-400">Recursos Humanos</p>
          </div>
        </div>
>>>>>>> upstream/main
      </div>

      {/* 2. Enlaces de Navegación del Menú Principal */}
      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Menú Principal</p>
        
<<<<<<< HEAD
        {menuItems.filter((item) => item.name !== 'Solicitudes' || canManageRequests).map((item) => {
=======
        {menuItems.map((item) => {
>>>>>>> upstream/main
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-blue-600' : 'text-gray-400'}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-600 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* 3. Perfil de Usuario logeado */}
      <div className="p-4 border-t border-gray-100 m-4 bg-gray-50 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-sm shrink-0">
            MG
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-gray-800 truncate">MARIA GONZALES</p>
            <p className="text-[10px] font-medium text-gray-400 truncate">Administradora RRHH</p>
          </div>
        </div>
        
        {/* Botón de Cerrar Sesión / Salir opcional */}
        <button className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Cerrar sesión">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
<<<<<<< HEAD
>>>>>>> Stashed changes
      </div>
      <div className="border-t border-gray-200 px-2 pt-4">
        <p className="truncate text-xs font-semibold text-gray-700">{user?.email ?? 'Usuario'}</p>
        <p className="mt-1 text-xs text-gray-400">{role ?? 'Sin rol'}</p>
        <button type="button" onClick={logout} className="mt-3 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50">Cerrar sesión</button>
=======
>>>>>>> upstream/main
      </div>
    </aside>
  );
}
