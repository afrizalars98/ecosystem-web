import { Spinner } from "@wondr/design-system";

export const LoadingScreen = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", flexDirection: "column", gap: "16px" }}>
      <Spinner size="lg" />
      <p style={{ color: "var(--color-neutral-500)", fontSize: "14px" }}>Memuat...</p>
    </div>
  );
};
