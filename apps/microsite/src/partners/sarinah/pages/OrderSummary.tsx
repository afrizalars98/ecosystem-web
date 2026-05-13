import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar, Button, Card, Input, Spinner } from "@wondr/design-system";
import { api } from "../../../core/api/client";
import { usePayment } from "../../../shared/hooks/usePayment";

interface CartItemResponse { product: { id: string; name: string; price: number }; quantity: number; subtotal: number; }
interface CartResponse { items: CartItemResponse[]; total: number; }

export const OrderSummary = () => {
  const navigate = useNavigate();
  const { pay, isProcessing, error: paymentError } = usePayment();
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => { api.get<CartResponse>("/partners/sarinah/cart").then(setCart).finally(() => setLoading(false)); }, []);

  const fmt = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  const handlePay = async () => {
    if (!cart) return;
    const order = await api.post<{ id: string }>("/partners/sarinah/orders", { shipping_name: shippingName, shipping_phone: shippingPhone, shipping_address: shippingAddress, notes });
    await pay({ partner_id: "sarinah", transaction_type: "order", payload: { order_id: order.id, items_count: cart.items.length }, amount: cart.total });
  };

  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: "64px" }}><Spinner size="lg" /></div>;
  if (!cart || cart.items.length === 0) { navigate("/partners/sarinah/cart"); return null; }

  return (
    <div>
      <TopBar title="Ringkasan Pesanan" onBack={() => navigate("/partners/sarinah/cart")} />
      <div style={{ padding: "var(--spacing-lg)" }}>
        <Card variant="outlined">
          <div style={{ padding: "var(--spacing-md)" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "var(--spacing-md)" }}>Item ({cart.items.length})</h3>
            {cart.items.map((item) => (
              <div key={item.product.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "var(--spacing-xs)" }}>
                <span style={{ color: "var(--color-neutral-600)" }}>{item.product.name} x{item.quantity}</span>
                <span style={{ fontWeight: 600 }}>{fmt(item.subtotal)}</span>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ marginTop: "var(--spacing-2xl)", display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600 }}>Informasi Pengiriman</h3>
          <Input label="Nama Penerima" value={shippingName} onChange={(e) => setShippingName(e.target.value)} />
          <Input label="No. Telepon" value={shippingPhone} onChange={(e) => setShippingPhone(e.target.value)} />
          <Input label="Alamat Pengiriman" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} placeholder="Jl. contoh No. 1, Jakarta" />
          <Input label="Catatan (opsional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div style={{ marginTop: "var(--spacing-2xl)", padding: "var(--spacing-lg)", backgroundColor: "var(--color-neutral-50)", borderRadius: "var(--radius-lg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
            <span style={{ fontWeight: 600 }}>Total Pembayaran</span><span style={{ fontWeight: 700, color: "var(--color-accent-600)" }}>{fmt(cart.total)}</span>
          </div>
        </div>

        {paymentError && <p style={{ color: "var(--color-error)", fontSize: "13px", textAlign: "center", marginTop: "var(--spacing-md)" }}>{paymentError}</p>}

        <Button fullWidth size="lg" disabled={!shippingName || !shippingPhone || !shippingAddress || isProcessing} onClick={handlePay} style={{ marginTop: "var(--spacing-2xl)" }}>
          {isProcessing ? "Memproses..." : `Bayar ${fmt(cart.total)}`}
        </Button>
      </div>
    </div>
  );
};
