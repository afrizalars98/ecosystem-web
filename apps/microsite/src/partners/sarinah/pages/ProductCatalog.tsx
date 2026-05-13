import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar, SearchBar, Card, Badge, Skeleton } from "@wondr/design-system";
import { api } from "../../../core/api/client";

interface Product { id: string; name: string; category: string; price: number; image: string; rating: number; review_count: number; }

export const ProductCatalog = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    api.get<Product[]>(`/partners/sarinah/products${params.toString() ? `?${params}` : ""}`).then(setProducts).finally(() => setLoading(false));
  }, [search]);

  const fmt = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  return (
    <div>
      <TopBar title="Sarinah" onBack={() => navigate("/partners/sarinah")} rightAction={
        <button onClick={() => navigate("/partners/sarinah/cart")} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>&#128722;</button>
      } />
      <div style={{ padding: "0 var(--spacing-lg) var(--spacing-lg)" }}>
        <SearchBar placeholder="Cari produk..." value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch("")} style={{ marginBottom: "var(--spacing-lg)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--spacing-md)" }}>
          {loading ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height="200px" borderRadius="var(--radius-lg)" />) : products.map((p) => (
            <Card key={p.id} variant="elevated" clickable onClick={() => navigate(`/partners/sarinah/products/${p.id}`)}>
              <img src={p.image} alt={p.name} style={{ width: "100%", height: 140, objectFit: "cover" }} />
              <div style={{ padding: "var(--spacing-sm) var(--spacing-md) var(--spacing-md)" }}>
                <h3 style={{ fontSize: "12px", fontWeight: 600, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</h3>
                <Badge variant="neutral">{p.category}</Badge>
                <div style={{ marginTop: "var(--spacing-xs)" }}><span style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-accent-600)" }}>{fmt(p.price)}</span></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
