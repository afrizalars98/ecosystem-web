import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar, Button, Card, Spinner } from "@wondr/design-system";
import { api } from "../../../core/api/client";

interface CartItemResponse { product: { id: string; name: string; image: string; price: number }; quantity: number; subtotal: number; }
interface CartResponse { items: CartItemResponse[]; total: number; }

export const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.get<CartResponse>("/partners/sarinah/cart").then(setCart).finally(() => setLoading(false)); }, []);

  const handleRemove = async (productId: string) => { const updated = await api.delete<CartResponse>(`/partners/sarinah/cart/${productId}`); setCart(updated); };
  const fmt = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: "64px" }}><Spinner size="lg" /></div>;

  return (
    <div>
      <TopBar title="Keranjang" onBack={() => navigate("/partners/sarinah/products")} />
      <div style={{ padding: "var(--spacing-lg)" }}>
        {!cart || cart.items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "var(--spacing-5xl) 0", color: "var(--color-neutral-500)" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "var(--spacing-sm)" }}>Keranjang kosong</p>
            <Button variant="ghost" onClick={() => navigate("/partners/sarinah/products")}>Mulai Belanja</Button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
              {cart.items.map((item) => (
                <Card key={item.product.id} variant="outlined">
                  <div style={{ display: "flex", gap: "var(--spacing-md)", padding: "var(--spacing-md)" }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: 64, height: 64, borderRadius: "var(--radius-md)", objectFit: "cover" }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "13px", fontWeight: 600 }}>{item.product.name}</h3>
                      <p style={{ fontSize: "12px", color: "var(--color-neutral-500)" }}>Qty: {item.quantity}</p>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-accent-600)" }}>{fmt(item.subtotal)}</p>
                    </div>
                    <button onClick={() => handleRemove(item.product.id)} style={{ background: "none", border: "none", color: "var(--color-error)", fontSize: "12px", cursor: "pointer", alignSelf: "flex-start" }}>Hapus</button>
                  </div>
                </Card>
              ))}
            </div>
            <div style={{ marginTop: "var(--spacing-2xl)", padding: "var(--spacing-lg)", backgroundColor: "var(--color-neutral-50)", borderRadius: "var(--radius-lg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
                <span style={{ fontWeight: 600 }}>Total</span><span style={{ fontWeight: 700 }}>{fmt(cart.total)}</span>
              </div>
            </div>
            <Button fullWidth size="lg" onClick={() => navigate("/partners/sarinah/checkout")} style={{ marginTop: "var(--spacing-lg)" }}>Lanjutkan ({cart.items.length} item)</Button>
          </>
        )}
      </div>
    </div>
  );
};
