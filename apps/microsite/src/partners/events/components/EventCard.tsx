import type { EventSummary } from "../api";

const CAT_COLORS: Record<string, string> = {
  sport: "var(--cat-sport)",
  music: "var(--cat-music)",
  festival: "var(--cat-festival)",
  food: "var(--cat-food)",
  culture: "var(--cat-culture)",
};

const CAT_GRADIENTS: Record<string, string> = {
  sport: "linear-gradient(135deg, #2A9D8F, #1B7A6F)",
  music: "linear-gradient(135deg, #7C3AED, #5B21B6)",
  festival: "linear-gradient(135deg, #E76F51, #C4533B)",
  food: "linear-gradient(135deg, #D08C00, #A06E00)",
  culture: "linear-gradient(135deg, #2A6FDB, #1E55B0)",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-US", { weekday: "short" });
  const date = d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  const time = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  return `${day} ${date} · ${time}`;
}

function formatPrice(idr: number) {
  if (idr >= 1000000) return `Rp ${(idr / 1000).toLocaleString("id-ID")}K`;
  return `Rp ${(idr / 1000).toFixed(0)}K`;
}

// Horizontal card (for scroll rail)
export function EventCardH({ event, onClick }: { event: EventSummary; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ width: 220, flexShrink: 0, background: "var(--we-surface)", border: "1px solid var(--we-line)", borderRadius: 16, overflow: "hidden", cursor: "pointer", display: "flex", flexDirection: "column" }}
    >
      <div style={{ height: 120, position: "relative", overflow: "hidden" }}>
        {event.hero_image_url ? (
          <img src={event.hero_image_url} alt={event.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: CAT_GRADIENTS[event.category] || "var(--we-mute)" }} />
        )}
        <div style={{ position: "absolute", top: 8, left: 8, background: "rgba(255,255,255,.92)", backdropFilter: "blur(6px)", color: "var(--we-ink)", fontFamily: "var(--ff-mono)", fontSize: "8.5px", letterSpacing: ".08em", padding: "4px 7px", borderRadius: 999, textTransform: "uppercase", fontWeight: 500 }}>
          {event.partner.name}
        </div>
        <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(255,255,255,.92)", fontSize: 10, fontWeight: 500, padding: "3px 8px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: CAT_COLORS[event.category] }} />
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </div>
      </div>
      <div style={{ padding: "10px 12px 14px" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "9.5px", color: "var(--we-muted)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>
          {formatDate(event.starts_at)}
        </div>
        <h4 style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em", margin: "0 0 6px", lineHeight: 1.2, color: "var(--we-ink)" }}>{event.title}</h4>
        <div style={{ fontSize: "11.5px", color: "var(--we-muted)", display: "flex", alignItems: "center", gap: 4 }}>
          {event.venue.name}, {event.venue.city}
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color: "var(--we-ink)", fontWeight: 600 }}>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 9, color: "var(--we-muted)", fontWeight: 400, marginRight: 4, letterSpacing: ".08em", textTransform: "uppercase" }}>From</span>
          {formatPrice(event.from_price_idr)}
        </div>
      </div>
    </div>
  );
}

// Vertical card (for list)
export function EventCardV({ event, onClick }: { event: EventSummary; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ margin: "0 20px 12px", background: "var(--we-surface)", border: "1px solid var(--we-line)", borderRadius: 16, overflow: "hidden", display: "grid", gridTemplateColumns: "96px 1fr", cursor: "pointer" }}
    >
      <div style={{ position: "relative" }}>
        {event.hero_image_url ? (
          <img src={event.hero_image_url} alt={event.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: CAT_GRADIENTS[event.category] || "var(--we-mute)" }} />
        )}
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontFamily: "var(--ff-mono)", fontSize: "9.5px", color: "var(--we-muted)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 4 }}>
          {formatDate(event.starts_at)}
        </div>
        <h4 style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-0.01em", margin: "0 0 5px", lineHeight: 1.2, color: "var(--we-ink)" }}>{event.title}</h4>
        <div style={{ fontSize: "11.5px", color: "var(--we-muted)", marginBottom: 8 }}>
          {event.venue.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "var(--we-ink)", fontWeight: 600 }}>
            <span style={{ fontFamily: "var(--ff-mono)", fontSize: 9, color: "var(--we-muted)", fontWeight: 400, marginRight: 4, letterSpacing: ".08em", textTransform: "uppercase" }}>From</span>
            {formatPrice(event.from_price_idr)}
          </span>
          {event.tag && (
            <span style={{
              fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 999,
              background: event.tag.includes("VIP") ? "var(--we-gold-50)" : event.tag === "New" ? "var(--we-primary-50)" : "var(--we-accent-50)",
              color: event.tag.includes("VIP") ? "var(--we-gold)" : event.tag === "New" ? "var(--we-primary)" : "var(--we-accent)",
            }}>
              {event.tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
