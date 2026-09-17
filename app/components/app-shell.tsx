"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./sidebar";
import { useAuth } from "./auth-provider";
import { canAccessPath } from "../../services/roles";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  const { user, role, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user && !isLogin) {
      window.location.replace("/login");
    }
    if (!loading && user && !isLogin && !canAccessPath(role, pathname)) {
      window.location.replace("/login?error=sin-permiso");
    }
  }, [isLogin, loading, pathname, role, user]);

  if (isLogin) {
    return <>{children}</>;
  }

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center text-gray-600">
        Verificando sesión...
      </main>
    );
  }

  if (!canAccessPath(role, pathname)) {
    return (
      <main className="flex min-h-screen items-center justify-center text-gray-600">
        Verificando permisos...
      </main>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}