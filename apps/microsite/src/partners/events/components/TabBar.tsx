const TABS = [
  { label: "Discover", icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10L10 4l7 6v6a1 1 0 0 1-1 1h-3v-5H7v5H4a1 1 0 0 1-1-1v-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg> },
  { label: "Saved", icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 3h10v14l-5-3-5 3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg> },
  { label: "Tickets", icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 7l1-2h12l1 2v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M7 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
  { label: "Profile", icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3 17a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
];

export function TabBar({ active = 0 }: { active?: number }) {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      height: 82, paddingBottom: 20,
      background: "var(--we-surface)",
      borderTop: "1px solid var(--we-line)",
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      zIndex: 40,
    }}>
      {TABS.map((tab, i) => (
        <div key={tab.label} style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 4, paddingTop: 8,
          color: i === active ? "var(--we-ink)" : "var(--we-soft)",
          fontSize: 10, fontWeight: 500, letterSpacing: "-0.005em",
          cursor: "pointer",
        }}>
          <div style={{ width: 20, height: 20 }}>{tab.icon}</div>
          {tab.label}
        </div>
      ))}
    </div>
  );
}
