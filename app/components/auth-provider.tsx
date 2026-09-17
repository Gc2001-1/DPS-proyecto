"use client";

import {
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { auth } from "../../services/firebase";
import type { Rol } from "../../services/roles";

interface AuthContextValue {
  user: User | null;
  role: Rol | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Rol | null>(null);
  const [loading, setLoading] = useState(true);

  const loadRole = async (currentUser: User | null) => {
    if (!currentUser) {
      setRole(null);
      return;
    }

    const tokenResult = await currentUser.getIdTokenResult();
    const claimRole = tokenResult.claims.rol;

    setRole(
      claimRole === "administrador_ti" ||
        claimRole === "gerente" ||
        claimRole === "analista_nomina" ||
        claimRole === "asistente_planilla" ||
        claimRole === "jefe_inmediato" ||
        claimRole === "empleado"
        ? claimRole
        : null,
    );
  };

  useEffect(() => {
    return onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      try {
        await loadRole(currentUser);
      } catch (error) {
        console.error("No se pudo cargar el rol del usuario", error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  const refreshRole = async () => {
    if (!auth.currentUser) return;

    await auth.currentUser.getIdToken(true);
    await loadRole(auth.currentUser);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout, refreshRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider.");
  }

  return context;
}