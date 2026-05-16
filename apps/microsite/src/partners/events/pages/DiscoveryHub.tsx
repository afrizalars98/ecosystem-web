import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { eventsApi, type EventSummary } from "../api";
import { EventCardH, EventCardV } from "../components/EventCard";
import { TabBar } from "../components/TabBar";
import "../events.css";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "sport", label: "Sport", color: "var(--cat-sport)" },
  { key: "music", label: "Music", color: "var(--cat-music)" },
  { key: "festival", label: "Festival", color: "var(--cat-festival)" },
  { key: "food", label: "Food", color: "var(--cat-food)" },
];

export function DiscoveryHub() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    eventsApi.listEvents(filter === "all" ? undefined : filter).then(setEvents).catch(() => {});
  }, [filter]);

  const featured = events.find((e) => e.featured);
  const sportEvents = events.filter((e) => e.category === "sport" || e.category === "festival");
  const musicEvents = events.filter((e) => e.category === "music");

  return (
    <div style={{ background: "var(--we-paper)", minHeight: "100vh", maxWidth: 375, margin: "0 auto", position: "relative", fontFamily: "var(--ff-sans)", color: "var(--we-ink)", paddingBottom: 82 }}>
      {/* Top bar */}
      <div style={{
        paddingTop: "calc(env(safe-area-inset-top, 54px) + 12px)",
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, background: "var(--we-ink)", color: "#fff",
            display: "grid", placeItems: "center", fontWeight: 600, fontSize: 14, letterSpacing: "-0.02em",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 30%, var(--we-primary-2), transparent 60%)", opacity: 0.7 }} />
            <span style={{ position: "relative", zIndex: 2 }}>W</span>
          </div>
          <div style={{ lineHeight: 1 }}>
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em", display: "block" }}>Wondr Events</span>
            <span style={{ fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--we-muted)", display: "block", marginTop: 3 }}>by AIDLC · BNI</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{
        margin: "0 20px 12px", height: 44, background: "var(--we-surface)", border: "1px solid var(--we-line)",
        borderRadius: 14, display: "flex", alignItems: "center", padding: "0 14px", gap: 10, color: "var(--we-muted)", fontSize: 14,
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        <span style={{ flex: 1 }}>Search events, artists, venues</span>
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, padding: "0 20px 14px", overflowX: "auto" }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            style={{
              height: 34, padding: "0 14px", borderRadius: 999,
              background: filter === c.key ? "var(--we-ink)" : "var(--we-surface)",
              color: filter === c.key ? "#fff" : "var(--we-ink)",
              border: filter === c.key ? "1px solid var(--we-ink)" : "1px solid var(--we-line)",
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", letterSpacing: "-0.005em", cursor: "pointer",
            }}
          >
            {c.color && <span style={{ width: 6, height: 6, borderRadius: "50%", background: filter === c.key ? "#fff" : c.color, opacity: 0.7 }} />}
            {c.label}
          </button>
        ))}
      </div>

      {/* Featured hero */}
      {featured && (
        <div
          onClick={() => navigate(`event/${featured.slug}`)}
          style={{
            margin: "4px 20px 22px", borderRadius: 20, overflow: "hidden", position: "relative",
            height: 200, color: "#fff", cursor: "pointer",
            boxShadow: "0 12px 30px rgba(10,14,31,.18)",
          }}
        >
          {featured.hero_image_url ? (
            <img src={featured.hero_image_url} alt={featured.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #7C3AED 0%, #2A6FDB 100%)" }} />
          )}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.7) 100%)",
          }} />
          <span style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(255,255,255,.16)", backdropFilter: "blur(10px)",
            fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: ".14em",
            padding: "5px 9px", borderRadius: 999, textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,.2)",
          }}>
            ★ Featured
          </span>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "16px 18px" }}>
            <div style={{ fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.75)", marginBottom: 6 }}>
              {featured.category.toUpperCase()} · CONCERT
            </div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: "-0.018em", lineHeight: 1.05 }}>
              {featured.title}
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, fontSize: 12, color: "rgba(255,255,255,.85)" }}>
              <span>{new Date(featured.starts_at).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })} · {new Date(featured.starts_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,.5)" }} />
              <span>{featured.venue.name}, {featured.venue.city}</span>
            </div>
          </div>
        </div>
      )}

      {/* Happening this week */}
      <div style={{ display: "flex", alignItems: "baseline", padding: "0 20px", margin: "6px 0 10px" }}>
        <h3 style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.015em", margin: 0 }}>
          Happening <em style={{ fontFamily: "var(--ff-serif)", fontStyle: "italic", fontWeight: 400 }}>this</em> week
        </h3>
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--we-primary)", fontWeight: 500, cursor: "pointer" }}>See all</span>
      </div>
      <div style={{ display: "flex", gap: 12, padding: "0 20px 18px", overflowX: "auto" }}>
        {events.map((e) => (
          <EventCardH key={e.id} event={e} onClick={() => navigate(`event/${e.slug}`)} />
        ))}
      </div>

      {/* Running & races */}
      {sportEvents.length > 0 && (
        <>
          <div style={{ display: "flex", alignItems: "baseline", padding: "0 20px", margin: "6px 0 10px" }}>
            <h3 style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.015em", margin: 0 }}>
              Running & <em style={{ fontFamily: "var(--ff-serif)", fontStyle: "italic", fontWeight: 400 }}>races</em>
            </h3>
            <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--we-primary)", fontWeight: 500 }}>See all</span>
          </div>
          {sportEvents.map((e) => (
            <EventCardV key={e.id} event={e} onClick={() => navigate(`event/${e.slug}`)} />
          ))}
        </>
      )}

      {/* Music & concerts */}
      {musicEvents.length > 0 && (
        <>
          <div style={{ display: "flex", alignItems: "baseline", padding: "0 20px", margin: "14px 0 10px" }}>
            <h3 style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.015em", margin: 0 }}>
              Music & <em style={{ fontFamily: "var(--ff-serif)", fontStyle: "italic", fontWeight: 400 }}>concerts</em>
            </h3>
            <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--we-primary)", fontWeight: 500 }}>See all</span>
          </div>
          {musicEvents.map((e) => (
            <EventCardV key={e.id} event={e} onClick={() => navigate(`event/${e.slug}`)} />
          ))}
        </>
      )}

      <TabBar active={0} />
    </div>
  );
}
