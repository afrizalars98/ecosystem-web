import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { TopBar, Button, Card, Avatar, Input, Spinner } from "@wondr/design-system";
import { api } from "../../../core/api/client";
import { useAuth } from "../../../core/auth/useAuth";
import { usePayment } from "../../../shared/hooks/usePayment";

interface Doctor { id: string; name: string; specialty: string; photo: string; consultation_fee: number; }

export const BookingSummary = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { pay, isProcessing, error: paymentError } = usePayment();

  const slotId = searchParams.get("slotId") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState(user?.name || "");
  const [patientPhone, setPatientPhone] = useState(user?.phone || "");
  const [notes, setNotes] = useState("");

  useEffect(() => { api.get<Doctor>(`/partners/rspi/doctors/${doctorId}`).then(setDoctor).finally(() => setLoading(false)); }, [doctorId]);

  const fmt = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const handlePay = async () => {
    if (!doctor) return;
    const booking = await api.post<{ id: string }>("/partners/rspi/bookings", { doctor_id: doctorId, slot_id: slotId, patient_name: patientName, patient_phone: patientPhone, notes });
    await pay({ partner_id: "rspi", transaction_type: "booking", payload: { booking_id: booking.id, doctor_name: doctor.name, date, time }, amount: doctor.consultation_fee });
  };

  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: "64px" }}><Spinner size="lg" /></div>;
  if (!doctor) return <div style={{ padding: "24px", textAlign: "center" }}>Dokter tidak ditemukan</div>;

  return (
    <div>
      <TopBar title="Ringkasan Booking" onBack={() => navigate(-1)} />
      <div style={{ padding: "var(--spacing-lg)" }}>
        <Card variant="elevated">
          <div style={{ display: "flex", gap: "var(--spacing-md)", padding: "var(--spacing-lg)" }}>
            <Avatar src={doctor.photo} alt={doctor.name} size="md" />
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 600 }}>{doctor.name}</h3>
              <p style={{ fontSize: "12px", color: "var(--color-neutral-500)" }}>{doctor.specialty}</p>
              <p style={{ fontSize: "13px", color: "var(--color-neutral-800)", marginTop: "var(--spacing-xs)" }}>{fmtDate(date)} — {time}</p>
            </div>
          </div>
        </Card>

        <div style={{ marginTop: "var(--spacing-2xl)", display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
          <Input label="Nama Pasien" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
          <Input label="No. Telepon" value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} />
          <Input label="Catatan (opsional)" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Keluhan atau catatan untuk dokter" />
        </div>

        <div style={{ marginTop: "var(--spacing-2xl)", padding: "var(--spacing-lg)", backgroundColor: "var(--color-neutral-50)", borderRadius: "var(--radius-lg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <span style={{ color: "var(--color-neutral-600)" }}>Biaya Konsultasi</span>
            <span style={{ fontWeight: 700 }}>{fmt(doctor.consultation_fee)}</span>
          </div>
        </div>

        {paymentError && <p style={{ color: "var(--color-error)", fontSize: "13px", textAlign: "center", marginTop: "var(--spacing-md)" }}>{paymentError}</p>}

        <Button fullWidth size="lg" disabled={!patientName || !patientPhone || isProcessing} onClick={handlePay} style={{ marginTop: "var(--spacing-2xl)" }}>
          {isProcessing ? "Memproses..." : `Bayar ${fmt(doctor.consultation_fee)}`}
        </Button>
      </div>
    </div>
  );
};
