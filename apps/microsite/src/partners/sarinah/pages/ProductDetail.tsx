import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TopBar, Button, Badge, Spinner } from "@wondr/design-system";
import { api } from "../../../core/api/client";

interface Product { id: string; name: string; category: string; price: number; image: string; description: string; stock: number; rating: number; review_count: number; }

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => { api.get<Product>(`/partners/sarinah/products/${id}`).then(setProduct).finally(() => setLoading(false)); }, [id]);

  const fmt = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  const handleAddToCart = async () => {
    setAdding(true);
    try { await api.post("/partners/sarinah/cart", { product_id: id, quantity: 1 }); navigate("/partners/sarinah/cart"); } finally { setAdding(false); }
  };

  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: "64px" }}><Spinner size="lg" /></div>;
  if (!product) return <div style={{ padding: "24px", textAlign: "center" }}>Produk tidak ditemukan</div>;

  return (
    <div>
      <TopBar title="Detail Produk" onBack={() => navigate("/partners/sarinah/products")} />
      <img src={product.image} alt={product.name} style={{ width: "100%", height: 280, objectFit: "cover" }} />
      <div style={{ padding: "var(--spacing-lg)" }}>
        <Badge variant="neutral">{product.category}</Badge>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginTop: "var(--spacing-sm)" }}>{product.name}</h2>
        <div style={{ fontSize: "12px", color: "var(--color-neutral-500)", marginTop: "var(--spacing-xs)" }}>&#11088; {product.rating} ({product.review_count} ulasan) · Stok: {product.stock}</div>
        <p style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-accent-600)", marginTop: "var(--spacing-md)" }}>{fmt(product.price)}</p>
        <p style={{ fontSize: "14px", color: "var(--color-neutral-600)", lineHeight: 1.6, marginTop: "var(--spacing-lg)" }}>{product.description}</p>
        <Button fullWidth size="lg" disabled={product.stock === 0 || adding} onClick={handleAddToCart} style={{ marginTop: "var(--spacing-2xl)" }}>
          {adding ? "Menambahkan..." : product.stock === 0 ? "Stok Habis" : "Tambah ke Keranjang"}
        </Button>
      </div>
    </div>
  );
};
