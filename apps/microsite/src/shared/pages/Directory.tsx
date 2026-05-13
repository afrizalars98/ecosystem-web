import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Badge, SearchBar, FilterChips } from "@wondr/design-system";
import type { FilterChip } from "@wondr/design-system";
import { api } from "../../core/api/client";

interface Partner {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

const categoryChips: FilterChip[] = [
  { id: "healthcare", label: "Healthcare" },
  { id: "shopping", label: "Shopping" },
];

export const Directory = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    const query = params.toString();

    api.get<Partner[]>(`/partners${query ? `?${query}` : ""}`)
      .then(setPartners)
      .finally(() => setLoading(false));
  }, [search, category]);

  return (
    <div style={{ padding: "var(--spacing-lg)" }}>
      <h1 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "var(--spacing-lg)" }}>wondr Ecosystem</h1>

      <SearchBar
        placeholder="Cari partner..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
        style={{ marginBottom: "var(--spacing-sm)" }}
      />

      <FilterChips chips={categoryChips} selected={category} onSelect={setCategory} />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)", marginTop: "var(--spacing-lg)" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "var(--color-neutral-500)" }}>Memuat...</p>
        ) : partners.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--color-neutral-500)" }}>Tidak ada partner ditemukan</p>
        ) : (
          partners.map((partner) => (
            <Card key={partner.id} variant="elevated" clickable onClick={() => navigate(`/partners/${partner.id}`)}>
              <div style={{ display: "flex", gap: "var(--spacing-md)", padding: "var(--spacing-lg)" }}>
                <img src={partner.icon} alt={partner.name} style={{ width: 56, height: 56, borderRadius: "var(--radius-lg)", objectFit: "cover" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", marginBottom: "var(--spacing-xs)" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 600 }}>{partner.name}</h3>
                    <Badge variant={partner.category === "healthcare" ? "primary" : "accent"}>{partner.category}</Badge>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--color-neutral-500)", lineHeight: 1.5 }}>{partner.description}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
