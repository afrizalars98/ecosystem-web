import { registerPartner } from "../registry";
import { DiscoveryHub } from "./pages/DiscoveryHub";
import { EventDetailPage } from "./pages/EventDetail";
import { CheckoutPage } from "./pages/Checkout";

registerPartner({
  id: "events",
  name: "Wondr Events",
  description: "Discover and buy tickets to sports, music, and festival events across Indonesia",
  icon: "🎫",
  category: "event",
  searchKeywords: ["events", "tickets", "concert", "run", "marathon", "music", "festival"],
  routes: [
    { index: true, element: <DiscoveryHub /> },
    { path: "event/:slug", element: <EventDetailPage /> },
    { path: "checkout/:orderId", element: <CheckoutPage /> },
  ],
});
