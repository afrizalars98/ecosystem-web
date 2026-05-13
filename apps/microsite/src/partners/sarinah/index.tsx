import { registerPartner } from "../registry";
import { ProductCatalog } from "./pages/ProductCatalog";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { OrderSummary } from "./pages/OrderSummary";

registerPartner({
  id: "sarinah",
  name: "Sarinah",
  description: "Belanja produk lokal Indonesia terbaik — batik, kerajinan, kuliner nusantara.",
  icon: "https://placehold.co/100x100?text=Sarinah",
  category: "shopping",
  searchKeywords: ["belanja", "shopping", "batik", "kerajinan", "kuliner", "sarinah"],
  routes: [
    { path: "products", element: <ProductCatalog /> },
    { path: "products/:id", element: <ProductDetail /> },
    { path: "cart", element: <Cart /> },
    { path: "checkout", element: <OrderSummary /> },
  ],
});
