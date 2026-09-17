"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import Sidebar from "./sidebar";
import { useAuth } from "./auth-provider";
import { canAccessPath } from "../../services/roles";

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/login";
  const { user, role, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user && !isLogin) router.replace("/login");
    if (!loading && user && !isLogin && !canAccessPath(role, pathname)) {
      router.replace("/login?error=sin-permiso");
    }
  }, [isLogin, loading, pathname, role, router, user]);

  if (isLogin) return <>{children}</>;
  if (loading || !user || !canAccessPath(role, pathname)) {
    return <main className="flex min-h-screen items-center justify-center text-gray-600">Verificando sesión...</main>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
