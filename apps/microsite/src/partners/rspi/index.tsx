import { registerPartner } from "../registry";
import { DoctorList } from "./pages/DoctorList";
import { DoctorDetail } from "./pages/DoctorDetail";
import { SlotPicker } from "./pages/SlotPicker";
import { BookingSummary } from "./pages/BookingSummary";

registerPartner({
  id: "rspi",
  name: "RS Pondok Indah Bintaro",
  description: "Layanan kesehatan terpadu — konsultasi dokter, booking jadwal, dan pembayaran.",
  icon: "https://placehold.co/100x100?text=RSPI",
  category: "healthcare",
  searchKeywords: ["rumah sakit", "dokter", "kesehatan", "booking", "hospital"],
  routes: [
    { path: "doctors", element: <DoctorList /> },
    { path: "doctors/:id", element: <DoctorDetail /> },
    { path: "doctors/:id/slots", element: <SlotPicker /> },
    { path: "booking/:doctorId", element: <BookingSummary /> },
  ],
});
