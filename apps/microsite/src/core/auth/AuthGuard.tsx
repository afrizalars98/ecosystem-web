import { ReactNode } from "react";
import { Spinner } from "@wondr/design-system";
import { useAuth } from "./useAuth";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, error } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", flexDirection: "column", gap: "16px" }}>
        <Spinner size="lg" />
        <p style={{ color: "var(--color-neutral-500)", fontSize: "14px" }}>Memuat...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", flexDirection: "column", gap: "16px", padding: "24px", textAlign: "center" }}>
        <div style={{ fontSize: "48px" }}>!</div>
        <p style={{ color: "var(--color-neutral-800)", fontSize: "16px", fontWeight: 600 }}>
          {error || "Sesi tidak valid"}
        </p>
        <p style={{ color: "var(--color-neutral-500)", fontSize: "14px" }}>
          Silakan buka kembali dari aplikasi wondr.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
