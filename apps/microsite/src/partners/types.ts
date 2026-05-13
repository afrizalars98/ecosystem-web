import { RouteObject } from "react-router-dom";

export interface PartnerPlugin {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "healthcare" | "shopping";
  routes: RouteObject[];
  searchKeywords: string[];
}
