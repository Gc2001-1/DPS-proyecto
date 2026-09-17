'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './auth-provider';
import { canPerformSolicitudAction } from '../../services/roles';

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

  return (
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
      </div>
      <div className="border-t border-gray-200 px-2 pt-4">
        <p className="truncate text-xs font-semibold text-gray-700">{user?.email ?? 'Usuario'}</p>
        <p className="mt-1 text-xs text-gray-400">{role ?? 'Sin rol'}</p>
        <button type="button" onClick={logout} className="mt-3 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50">Cerrar sesión</button>
      </div>
    </aside>
  );
}
