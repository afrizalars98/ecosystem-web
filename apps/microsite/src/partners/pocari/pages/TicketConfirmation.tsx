import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TopBar, Card, Badge, Button } from "@wondr/design-system";
import { usePayment } from "../../../shared/hooks/usePayment";

interface TicketData {
  id: string;
  event_name: string;
  event_date: string;
  event_location: string;
  buyer_name: string;
  price: number;
  status: string;
}

export const TicketConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticket = location.state as TicketData | null;
  const { pay, isProcessing, error: paymentError } = usePayment();

  const fmt = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  useEffect(() => {
    if (ticket) {
      pay({
        partner_id: "pocari",
        transaction_type: "ticket",
        payload: { ticket_id: ticket.id, event_name: ticket.event_name, buyer_name: ticket.buyer_name },
        amount: ticket.price,
      });
    }
  }, []);

  if (!ticket) {
    return (
      <div>
        <TopBar title="Tiket" onBack={() => navigate("/partners")} />
        <div style={{ padding: "24px", textAlign: "center" }}>Tiket tidak ditemukan</div>
      </div>
    );
  }

  return (
    <div>
      <TopBar title="Konfirmasi Tiket" onBack={() => navigate("/partners")} />
      <div style={{ padding: "var(--spacing-lg)" }}>
        <Card variant="elevated">
          <div style={{ padding: "var(--spacing-lg)", display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700 }}>{ticket.event_name}</h2>
              <Badge variant="warning" style={{ marginTop: "var(--spacing-sm)" }}>Menunggu Pembayaran</Badge>
            </div>

            <div style={{ borderTop: "1px solid var(--color-neutral-200)", paddingTop: "var(--spacing-md)", fontSize: "14px", display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-neutral-500)" }}>Ticket ID</span>
                <span style={{ fontFamily: "monospace", fontSize: "12px" }}>{ticket.id.slice(0, 8)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-neutral-500)" }}>Nama</span>
                <span>{ticket.buyer_name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-neutral-500)" }}>Tanggal</span>
                <span>{fmtDate(ticket.event_date)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-neutral-500)" }}>Lokasi</span>
                <span>{ticket.event_location}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-neutral-500)" }}>Harga</span>
                <span style={{ fontWeight: 700 }}>{fmt(ticket.price)}</span>
              </div>
            </div>
          </div>
        </Card>

        {paymentError && (
          <p style={{ color: "var(--color-error)", fontSize: "13px", textAlign: "center", marginTop: "var(--spacing-md)" }}>
            {paymentError}
          </p>
        )}

        <Button
          fullWidth
          variant="outline"
          size="lg"
          onClick={() => navigate("/partners")}
          style={{ marginTop: "var(--spacing-2xl)" }}
        >
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
};
