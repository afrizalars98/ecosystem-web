import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { eventsApi, type Order } from "../api";
import "../events.css";

function formatPrice(idr: number) {
  return `Rp ${idr.toLocaleString("id-ID")}`;
}

export function CheckoutPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [showDeeplink, setShowDeeplink] = useState(false);

  useEffect(() => {
    if (orderId) eventsApi.getOrder(orderId).then(setOrder).catch(() => {});
  }, [orderId]);

  if (!order) {
    return (
      <div style={{ background: "var(--we-paper)", minHeight: "100vh", maxWidth: 375, margin: "0 auto", display: "grid", placeItems: "center" }}>
        <div style={{ textAlign: "center", color: "var(--we-muted)", fontSize: 14 }}>Loading order...</div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--we-paper)", minHeight: "100vh", maxWidth: 375, margin: "0 auto", fontFamily: "var(--ff-sans)", color: "var(--we-ink)" }}>
      {/* Header */}
      <div style={{ padding: "52px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => navigate(-1)}
          style={{ width: 36, height: 36, borderRadius: 999, background: "var(--we-surface)", border: "1px solid var(--we-line)", cursor: "pointer", display: "grid", placeItems: "center" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <h1 style={{ fontSize: "var(--t-h1)", fontWeight: 500, margin: 0, letterSpacing: "-0.02em" }}>Checkout</h1>
      </div>

      {/* Order summary */}
      <div style={{ margin: "0 20px 16px", background: "var(--we-surface)", border: "1px solid var(--we-line)", borderRadius: 16, padding: 18 }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--we-muted)", marginBottom: 10 }}>Order summary</div>
        <h3 style={{ fontSize: "var(--t-h3)", fontWeight: 500, margin: "0 0 4px" }}>{order.event_title}</h3>
        <div style={{ fontSize: "var(--t-sm)", color: "var(--we-muted)", marginBottom: 12 }}>{order.tier_name} × {order.qty}</div>

        <div style={{ borderTop: "1px dashed var(--we-line)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--t-body)" }}>
            <span style={{ color: "var(--we-muted)" }}>Subtotal</span>
            <span>{formatPrice(order.subtotal_idr)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--t-body)" }}>
            <span style={{ color: "var(--we-muted)" }}>Service fee</span>
            <span>{formatPrice(order.fee_idr)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--t-body)", color: "var(--we-primary)" }}>
            <span>Wondr Cashback</span>
            <span>−{formatPrice(order.cashback_idr)}</span>
          </div>
          <div style={{ borderTop: "1px solid var(--we-line)", paddingTop: 12, display: "flex", justifyContent: "space-between", fontSize: "var(--t-h3)", fontWeight: 600 }}>
            <span>Total</span>
            <span>{formatPrice(order.total_idr)}</span>
          </div>
        </div>
      </div>

      {/* Wondr perks */}
      <div style={{
        margin: "0 20px 16px", padding: "14px 16px", borderRadius: 14,
        background: "linear-gradient(135deg, var(--we-primary), var(--we-primary-2))", color: "#fff",
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Wondr Cashback applied</div>
        <div style={{ fontSize: 12, opacity: 0.85 }}>Pay with BNI Wondr to receive {formatPrice(order.cashback_idr)} cashback</div>
      </div>

      {/* Order ID */}
      <div style={{ margin: "0 20px 24px", fontFamily: "var(--ff-mono)", fontSize: 11, color: "var(--we-muted)" }}>
        Order {order.id} · Reserved for 15 minutes
      </div>

      {/* CTA */}
      <div style={{ padding: "0 20px" }}>
        <button
          onClick={() => setShowDeeplink(true)}
          style={{
            width: "100%", height: 52, borderRadius: 999,
            background: "var(--we-ink)", color: "#fff", border: 0,
            fontSize: 16, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 8px 24px rgba(14,21,48,.25)",
          }}
        >
          Continue with Wondr →
        </button>
        <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "var(--we-muted)" }}>
          You'll be redirected to the Wondr app to complete payment
        </div>
      </div>

      {/* Deeplink sheet */}
      {showDeeplink && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(14,21,48,.5)" }} onClick={() => setShowDeeplink(false)} />
          <div style={{
            position: "relative", width: "100%", maxWidth: 375,
            background: "var(--we-surface)", borderRadius: "24px 24px 0 0",
            padding: "32px 24px 48px", textAlign: "center",
          }}>
            <div style={{ width: 40, height: 4, background: "var(--we-line)", borderRadius: 999, margin: "0 auto 24px" }} />
            <div style={{
              width: 56, height: 56, borderRadius: 14, background: "var(--we-ink)",
              margin: "0 auto 18px", display: "grid", placeItems: "center",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 30%, var(--we-primary-2), transparent 60%)", opacity: 0.7 }} />
              <span style={{ position: "relative", zIndex: 2, color: "#fff", fontWeight: 700, fontSize: 22 }}>W</span>
            </div>
            <h3 style={{ fontSize: "var(--t-h2)", fontWeight: 500, margin: "0 0 8px" }}>Opening Wondr...</h3>
            <p style={{ fontSize: "var(--t-body)", color: "var(--we-muted)", margin: "0 0 24px" }}>
              Completing payment of {formatPrice(order.total_idr)}
            </p>
            <div style={{
              width: 24, height: 24, border: "2px solid var(--we-primary)", borderTopColor: "transparent",
              borderRadius: "50%", margin: "0 auto",
              animation: "spin 1s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <button
              onClick={() => setShowDeeplink(false)}
              style={{
                marginTop: 24, fontSize: 13, color: "var(--we-muted)", background: "none",
                border: 0, cursor: "pointer", textDecoration: "underline",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
