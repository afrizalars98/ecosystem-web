import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { eventsApi, type EventDetail as EventDetailType, type Tier } from "../api";
import { TabBar } from "../components/TabBar";
import "../events.css";

const CAT_GRADIENTS: Record<string, string> = {
  sport: "linear-gradient(135deg, #2A9D8F, #1B7A6F)",
  music: "linear-gradient(135deg, #7C3AED, #5B21B6)",
  festival: "linear-gradient(135deg, #E76F51, #C4533B)",
  food: "linear-gradient(135deg, #D08C00, #A06E00)",
  culture: "linear-gradient(135deg, #2A6FDB, #1E55B0)",
};

const STRIPE_COLORS: Record<string, string> = {
  primary: "var(--we-primary)",
  gold: "var(--we-gold)",
  violet: "#7C3AED",
  coral: "var(--we-accent)",
  muted: "var(--we-soft)",
};

function formatPrice(idr: number) {
  return `Rp ${idr.toLocaleString("id-ID")}`;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }) + " WIB";
}

export function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventDetailType | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    if (slug) eventsApi.getEvent(slug).then(setEvent).catch(() => {});
  }, [slug]);

  if (!event) {
    return (
      <div style={{ background: "var(--we-paper)", minHeight: "100vh", maxWidth: 375, margin: "0 auto", display: "grid", placeItems: "center" }}>
        <div style={{ width: 24, height: 24, border: "2px solid var(--we-primary)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  const tier = event.tiers.find((t) => t.id === selectedTier);

  async function handleBuy() {
    if (!selectedTier || !event) return;
    setOrdering(true);
    try {
      const order = await eventsApi.createOrder({ event_id: event.id, tier_id: selectedTier, qty });
      navigate(`../checkout/${order.id}`);
    } catch {
      alert("Failed to create order");
    } finally {
      setOrdering(false);
    }
  }

  return (
    <div style={{ background: "var(--we-paper)", minHeight: "100vh", maxWidth: 375, margin: "0 auto", position: "relative", fontFamily: "var(--ff-sans)", color: "var(--we-ink)", paddingBottom: 140 }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
        {event.hero_image_url ? (
          <img src={event.hero_image_url} alt={event.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: CAT_GRADIENTS[event.category] || "var(--we-ink)" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.7) 100%)" }} />
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute", top: 52, left: 16, zIndex: 10,
            width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,.15)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,.2)", color: "#fff", cursor: "pointer",
            display: "grid", placeItems: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        {/* Content */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "16px 20px", color: "#fff" }}>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.75)", marginBottom: 6 }}>
            {event.category.toUpperCase()} · {event.partner.name}
          </div>
          <h1 style={{ margin: 0, fontSize: "var(--t-display)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.04 }}>
            {event.title}
          </h1>
          <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 12, color: "rgba(255,255,255,.85)" }}>
            <span>{formatDate(event.starts_at)}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,.5)", alignSelf: "center" }} />
            <span>{event.venue.name}</span>
          </div>
        </div>
      </div>

      {/* About */}
      <div style={{ padding: "20px 20px 0" }}>
        <h3 style={{ fontSize: "var(--t-h3)", fontWeight: 500, margin: "0 0 8px" }}>About</h3>
        <p style={{ fontSize: "var(--t-body)", lineHeight: 1.55, color: "var(--we-muted)", margin: 0 }}>{event.about}</p>
      </div>

      {/* Countdown */}
      <div style={{ margin: "20px 20px", padding: "14px 16px", background: "var(--we-primary-50)", borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: ".08em", color: "var(--we-primary)", fontWeight: 500 }}>
          {formatDate(event.starts_at)} · {formatTime(event.starts_at)}
        </span>
      </div>

      {/* Ticket tiers */}
      <div style={{ padding: "0 20px" }}>
        <h3 style={{ fontSize: "var(--t-h2)", fontWeight: 500, margin: "0 0 14px" }}>
          Pick your <em style={{ fontFamily: "var(--ff-serif)", fontStyle: "italic", fontWeight: 400 }}>tier</em>
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {event.tiers.map((t) => (
            <TierCard key={t.id} tier={t} selected={selectedTier === t.id} onSelect={() => setSelectedTier(t.id)} />
          ))}
        </div>
      </div>

      {/* Perks */}
      {event.perks.length > 0 && (
        <div style={{ margin: "24px 20px 0" }}>
          <h3 style={{ fontSize: "var(--t-h3)", fontWeight: 500, margin: "0 0 10px" }}>Wondr Perks</h3>
          {event.perks.map((p) => (
            <div key={p.title} style={{
              padding: "14px 16px", borderRadius: 14, color: "#fff",
              background: "linear-gradient(135deg, var(--we-primary), var(--we-primary-2))",
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>{p.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Sponsors */}
      {event.sponsors.length > 0 && (
        <div style={{ padding: "24px 20px 0" }}>
          <div style={{ fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--we-muted)", marginBottom: 12 }}>Sponsors</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {event.sponsors.map((s) => (
              <div key={s.name} style={{
                height: 48, background: "var(--we-mute)", borderRadius: 10, border: "1px solid var(--we-line)",
                display: "grid", placeItems: "center", fontSize: 11, color: "var(--we-muted)", fontWeight: 500,
              }}>
                {s.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky buy bar */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 375,
        background: "var(--we-surface)", borderTop: "1px solid var(--we-line)",
        padding: "12px 20px 28px", zIndex: 40,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        {tier ? (
          <>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{tier.name}</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{formatPrice(tier.price_idr * qty)}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 32, height: 32, borderRadius: 999, border: "1px solid var(--we-line)", background: "var(--we-surface)", cursor: "pointer", fontSize: 16 }}>−</button>
              <span style={{ fontFamily: "var(--ff-mono)", fontSize: 14, minWidth: 20, textAlign: "center" }}>{qty}</span>
              <button onClick={() => setQty(Math.min(10, qty + 1))} style={{ width: 32, height: 32, borderRadius: 999, border: "1px solid var(--we-line)", background: "var(--we-surface)", cursor: "pointer", fontSize: 16 }}>+</button>
            </div>
            <button
              onClick={handleBuy}
              disabled={ordering}
              style={{
                height: 44, padding: "0 20px", background: "var(--we-ink)", color: "#fff",
                border: 0, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}
            >
              {ordering ? "..." : "Buy →"}
            </button>
          </>
        ) : (
          <div style={{ flex: 1, textAlign: "center", fontSize: 14, color: "var(--we-muted)" }}>
            Select a tier to continue
          </div>
        )}
      </div>

      <TabBar />
    </div>
  );
}

function TierCard({ tier, selected, onSelect }: { tier: Tier; selected: boolean; onSelect: () => void }) {
  const soldOut = tier.available <= 0;
  const low = tier.available > 0 && tier.available <= 20;

  return (
    <div
      onClick={soldOut ? undefined : onSelect}
      style={{
        background: "var(--we-surface)", borderRadius: 14, overflow: "hidden",
        border: selected ? `2px solid var(--we-primary)` : "1px solid var(--we-line)",
        opacity: soldOut ? 0.5 : 1,
        cursor: soldOut ? "default" : "pointer",
        display: "grid", gridTemplateColumns: "4px 1fr",
      }}
    >
      <div style={{ background: STRIPE_COLORS[tier.stripe] || "var(--we-primary)" }} />
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 style={{ fontSize: "var(--t-h3)", fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>{tier.name}</h4>
          <span style={{ fontSize: 16, fontWeight: 600 }}>{formatPrice(tier.price_idr)}</span>
        </div>
        <div style={{ fontSize: "var(--t-sm)", color: "var(--we-muted)", marginTop: 4 }}>{tier.sub}</div>
        {low && (
          <div style={{ marginTop: 6, fontSize: 11, fontWeight: 600, color: "var(--we-accent)" }}>
            {tier.available} left — selling fast
          </div>
        )}
        {soldOut && (
          <div style={{ marginTop: 6, fontSize: 11, fontWeight: 600, color: "var(--we-soft)" }}>Sold out</div>
        )}
      </div>
    </div>
  );
}
