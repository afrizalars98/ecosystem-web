import { api } from "../../core/api/client";

export type EventCategory = "sport" | "music" | "festival" | "food" | "culture";

export interface EventSummary {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  partner: { name: string; logo_url: string };
  hero_image_url: string;
  starts_at: string;
  venue: { name: string; city: string };
  from_price_idr: number;
  featured: boolean;
  tag: string | null;
}

export interface Tier {
  id: string;
  name: string;
  sub: string;
  price_idr: number;
  available: number;
  cap: number;
  stripe: string;
}

export interface EventDetail extends EventSummary {
  about: string;
  tiers: Tier[];
  perks: { title: string; description: string }[];
  sponsors: { name: string }[];
}

export interface Order {
  id: string;
  event_id: string;
  event_title: string;
  tier_id: string;
  tier_name: string;
  qty: number;
  subtotal_idr: number;
  fee_idr: number;
  cashback_idr: number;
  total_idr: number;
  status: string;
  deeplink: string;
}

export const eventsApi = {
  listEvents: (category?: string) =>
    api.get<EventSummary[]>(`/partners/events/catalog${category ? `?category=${category}` : ""}`),
  getEvent: (slug: string) =>
    api.get<EventDetail>(`/partners/events/detail/${slug}`),
  createOrder: (data: { event_id: string; tier_id: string; qty: number }) =>
    api.post<Order>("/partners/events/order", data),
  getOrder: (id: string) =>
    api.get<Order>(`/partners/events/order/${id}`),
};
