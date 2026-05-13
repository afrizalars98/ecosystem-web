import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { api, ApiError } from "../api/client";

export interface AuthUser {
  id: string;
  wondr_user_id: string;
  name: string;
  phone: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  error: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authenticate = useCallback(async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      // Dev bypass: skip auth in development mode
      if (import.meta.env.DEV) {
        setUser({
          id: "dev-user-001",
          wondr_user_id: "wondr-dev-123",
          name: "Dev User",
          phone: "+6281234567890",
        });
        setIsLoading(false);
        return;
      }
      setError("Token tidak ditemukan. Silakan buka dari aplikasi wondr.");
      setIsLoading(false);
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.delete("token");
    window.history.replaceState({}, "", url.pathname);

    try {
      const data = await api.post<{ user: AuthUser }>("/auth/validate-token", { token });
      setUser(data.user);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.status === 401
          ? "Sesi tidak valid. Silakan buka kembali dari aplikasi wondr."
          : "Terjadi kesalahan. Silakan coba lagi."
        );
      } else {
        setError("Tidak dapat terhubung ke server.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return (
    <AuthContext.Provider value={{ user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
