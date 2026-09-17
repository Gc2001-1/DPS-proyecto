'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const activeClass = "bg-blue-100 text-blue-600 font-semibold";
  const inactiveClass = "text-gray-600 hover:bg-gray-50 font-medium";

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between p-4 sticky top-0 shrink-0">
      <div>
        {/* Encabezado / Logo */}
        <div className="flex items-center gap-3 px-2 py-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-lg">
            GC
          </div>
          <div>
            <h2 className="font-bold text-gray-800 text-sm leading-tight">GRUPO CALMA</h2>
            <p className="text-xs text-gray-400">Recursos Humanos</p>
          </div>
        </div>

        {/* Navegación */}
        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
              pathname === '/dashboard' ? activeClass : inactiveClass
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Dashboard</span>
          </Link>

          <Link
            href="/reportes"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
              pathname === '/reportes' ? activeClass : inactiveClass
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Reportes</span>
          </Link>

          <Link
            href="#constancias"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
              pathname === '/constancias' ? activeClass : inactiveClass
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Constancias</span>
          </Link>

          <Link
            href="/solicitudes"
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${
              pathname === '/solicitudes' ? activeClass : inactiveClass
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Solicitudes</span>
            </div>
            <span className="bg-blue-100 text-blue-600 text-xs px-2.5 py-0.5 rounded-full font-bold">
              12
            </span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}