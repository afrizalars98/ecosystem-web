import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TopBar, Button, Avatar, Badge, Spinner } from "@wondr/design-system";
import { api } from "../../../core/api/client";

interface Doctor { id: string; name: string; specialty: string; photo: string; rating: number; review_count: number; experience_years: number; education: string; bio: string; consultation_fee: number; }

export const DoctorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.get<Doctor>(`/partners/rspi/doctors/${id}`).then(setDoctor).finally(() => setLoading(false)); }, [id]);

  const fmt = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: "64px" }}><Spinner size="lg" /></div>;
  if (!doctor) return <div style={{ padding: "24px", textAlign: "center" }}>Dokter tidak ditemukan</div>;

  return (
    <div>
      <TopBar title="Profil Dokter" onBack={() => navigate("/partners/rspi/doctors")} />
      <div style={{ padding: "var(--spacing-lg)" }}>
        <div style={{ textAlign: "center", marginBottom: "var(--spacing-2xl)" }}>
          <Avatar src={doctor.photo} alt={doctor.name} size="lg" />
          <h2 style={{ fontSize: "18px", fontWeight: 700, marginTop: "var(--spacing-md)" }}>{doctor.name}</h2>
          <Badge variant="primary">{doctor.specialty}</Badge>
          <div style={{ display: "flex", justifyContent: "center", gap: "var(--spacing-2xl)", marginTop: "var(--spacing-lg)", fontSize: "13px", color: "var(--color-neutral-600)" }}>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-neutral-900)" }}>{doctor.experience_years}</div><div>Tahun</div></div>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-neutral-900)" }}>&#11088; {doctor.rating}</div><div>{doctor.review_count} ulasan</div></div>
          </div>
        </div>
        <div style={{ marginBottom: "var(--spacing-2xl)" }}><h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "var(--spacing-sm)" }}>Tentang</h3><p style={{ fontSize: "14px", color: "var(--color-neutral-600)", lineHeight: 1.6 }}>{doctor.bio}</p></div>
        <div style={{ marginBottom: "var(--spacing-2xl)" }}><h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "var(--spacing-sm)" }}>Pendidikan</h3><p style={{ fontSize: "14px", color: "var(--color-neutral-600)" }}>{doctor.education}</p></div>
        <div style={{ marginBottom: "var(--spacing-2xl)" }}><h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "var(--spacing-sm)" }}>Biaya Konsultasi</h3><p style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-accent-600)" }}>{fmt(doctor.consultation_fee)}</p></div>
        <Button fullWidth size="lg" onClick={() => navigate(`/partners/rspi/doctors/${id}/slots`)}>Pilih Jadwal</Button>
      </div>
    </div>
  );
};
