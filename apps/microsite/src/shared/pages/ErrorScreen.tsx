import { useRouteError } from "react-router-dom";

export const ErrorScreen = () => {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", flexDirection: "column", gap: "16px", padding: "24px", textAlign: "center" }}>
      <div style={{ fontSize: "48px", color: "var(--color-error)" }}>!</div>
      <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-neutral-900)" }}>Terjadi Kesalahan</h1>
      <p style={{ fontSize: "14px", color: "var(--color-neutral-500)" }}>{error?.statusText || error?.message || "Halaman tidak ditemukan."}</p>
    </div>
  );
};
