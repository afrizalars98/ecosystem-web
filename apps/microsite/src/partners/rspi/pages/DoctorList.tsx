import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar, SearchBar, Card, Avatar, Badge, Skeleton } from "@wondr/design-system";
import { api } from "../../../core/api/client";

interface Doctor { id: string; name: string; specialty: string; photo: string; rating: number; review_count: number; consultation_fee: number; }

export const DoctorList = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    api.get<Doctor[]>(`/partners/rspi/doctors${params.toString() ? `?${params}` : ""}`).then(setDoctors).finally(() => setLoading(false));
  }, [search]);

  const fmt = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  return (
    <div>
      <TopBar title="Dokter" onBack={() => navigate("/partners/rspi")} />
      <div style={{ padding: "0 var(--spacing-lg) var(--spacing-lg)" }}>
        <SearchBar placeholder="Cari dokter atau spesialis..." value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch("")} style={{ marginBottom: "var(--spacing-lg)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
          {loading ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height="88px" borderRadius="var(--radius-lg)" />) : doctors.map((doc) => (
            <Card key={doc.id} variant="elevated" clickable onClick={() => navigate(`/partners/rspi/doctors/${doc.id}`)}>
              <div style={{ display: "flex", gap: "var(--spacing-md)", padding: "var(--spacing-md)" }}>
                <Avatar src={doc.photo} alt={doc.name} size="lg" />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: 2 }}>{doc.name}</h3>
                  <Badge variant="primary">{doc.specialty}</Badge>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "var(--spacing-sm)", fontSize: "12px", color: "var(--color-neutral-500)" }}>
                    <span>&#11088; {doc.rating} ({doc.review_count})</span>
                    <span style={{ fontWeight: 600, color: "var(--color-accent-600)" }}>{fmt(doc.consultation_fee)}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
