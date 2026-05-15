import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar, Card, Badge, Button, Input, Spinner } from "@wondr/design-system";
import { api } from "../../../core/api/client";

interface EventData {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  capacity: number;
  remaining: number;
  status: string;
  image: string;
}

export const EventPage = () => {
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [buyError, setBuyError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get<EventData>("/partners/pocari/event").then(setEvent).finally(() => setLoading(false));
  }, []);

  const fmt = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const handleBuy = async () => {
    if (!event) return;
    setBuyError(null);
    setSubmitting(true);
    try {
      const ticket = await api.post<{
        id: string; event_name: string; event_date: string;
        event_location: string; buyer_name: string; price: number; status: string;
      }>("/partners/pocari/tickets", { name, phone, email });

      navigate("/partners/pocari/confirmation", { state: ticket });
    } catch (err: any) {
      setBuyError(err.message || "Gagal membeli tiket");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: "64px" }}><Spinner size="lg" /></div>;
  if (!event) return <div style={{ padding: "24px", textAlign: "center" }}>Event tidak ditemukan</div>;

  const isSoldOut = event.status === "sold_out";

  return (
    <div>
      <TopBar title="Pocari Sweat Run" onBack={() => navigate("/partners")} />

      <img
        src={event.image}
        alt={event.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />

      <div style={{ padding: "var(--spacing-lg)" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "var(--spacing-xs)" }}>{event.name}</h1>

        <div style={{ display: "flex", gap: "var(--spacing-sm)", marginBottom: "var(--spacing-md)" }}>
          <Badge variant={isSoldOut ? "error" : "success"}>{isSoldOut ? "Habis Terjual" : "Tersedia"}</Badge>
          <Badge variant="primary">{fmt(event.price)}</Badge>
        </div>

        <Card variant="outlined">
          <div style={{ padding: "var(--spacing-md)", display: "flex", flexDirection: "column", gap: "var(--spacing-sm)", fontSize: "14px" }}>
            <div><strong>Tanggal:</strong> {fmtDate(event.date)}</div>
            <div><strong>Lokasi:</strong> {event.location}</div>
            <div><strong>Slot:</strong> {event.remaining} / {event.capacity} tersedia</div>
          </div>
        </Card>

        <p style={{ marginTop: "var(--spacing-lg)", fontSize: "14px", lineHeight: 1.6, color: "var(--color-neutral-700)" }}>
          {event.description}
        </p>

        {!showForm ? (
          <Button
            fullWidth
            size="lg"
            disabled={isSoldOut}
            onClick={() => setShowForm(true)}
            style={{ marginTop: "var(--spacing-2xl)" }}
          >
            {isSoldOut ? "Habis Terjual" : "Beli Tiket"}
          </Button>
        ) : (
          <div style={{ marginTop: "var(--spacing-2xl)", display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
            <Input label="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="No. Telepon" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            {buyError && (
              <p style={{ color: "var(--color-error)", fontSize: "13px", textAlign: "center" }}>
                {buyError}
              </p>
            )}

            <Button
              fullWidth
              size="lg"
              disabled={!name || !phone || !email || submitting}
              onClick={handleBuy}
            >
              {submitting ? "Memproses..." : `Bayar ${fmt(event.price)}`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
