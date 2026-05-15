import { registerPartner } from "../registry";
import { EventPage } from "./pages/EventPage";
import { TicketConfirmation } from "./pages/TicketConfirmation";

registerPartner({
  id: "pocari",
  name: "Pocari Sweat Run 2026",
  description: "Event lari Pocari Sweat x Wondr by BNI — beli tiket dan ikuti fun run di GBK Senayan.",
  icon: "https://placehold.co/100x100?text=Pocari",
  category: "event",
  searchKeywords: ["pocari", "sweat", "run", "lari", "event", "tiket", "gbk", "senayan"],
  routes: [
    { path: "", element: <EventPage /> },
    { path: "confirmation", element: <TicketConfirmation /> },
  ],
});
