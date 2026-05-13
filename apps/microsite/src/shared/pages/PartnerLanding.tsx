import { useNavigate } from "react-router-dom";
import { Button, TopBar, Badge } from "@wondr/design-system";
import { getPartner } from "../../partners/registry";

export const PartnerLanding = ({ partnerId }: { partnerId: string }) => {
  const navigate = useNavigate();
  const partner = getPartner(partnerId);

  if (!partner) return <div style={{ padding: "24px", textAlign: "center" }}>Partner tidak ditemukan</div>;

  return (
    <div>
      <TopBar title={partner.name} onBack={() => navigate("/")} />
      <div style={{ padding: "var(--spacing-lg)" }}>
        <div style={{ textAlign: "center", marginBottom: "var(--spacing-2xl)" }}>
          <img src={partner.icon} alt={partner.name} style={{ width: 80, height: 80, borderRadius: "var(--radius-xl)", marginBottom: "var(--spacing-md)" }} />
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "var(--spacing-xs)" }}>{partner.name}</h2>
          <Badge variant={partner.category === "healthcare" ? "primary" : "accent"}>{partner.category}</Badge>
          <p style={{ fontSize: "14px", color: "var(--color-neutral-500)", marginTop: "var(--spacing-md)", lineHeight: 1.6 }}>{partner.description}</p>
        </div>

        <Button fullWidth size="lg" onClick={() => navigate(`/partners/${partnerId}/${partnerId === "rspi" ? "doctors" : "products"}`)}>
          {partnerId === "rspi" ? "Lihat Dokter" : "Lihat Produk"}
        </Button>
      </div>
    </div>
  );
};
