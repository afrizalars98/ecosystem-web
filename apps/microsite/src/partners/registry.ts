import { PartnerPlugin } from "./types";

const plugins: PartnerPlugin[] = [];

export function registerPartner(plugin: PartnerPlugin) {
  plugins.push(plugin);
}

export function getPartners(): PartnerPlugin[] {
  return plugins;
}

export function getPartner(id: string): PartnerPlugin | undefined {
  return plugins.find((p) => p.id === id);
}
