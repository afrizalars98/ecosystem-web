import { createBrowserRouter, RouteObject } from "react-router-dom";
import { AppShell } from "../layout/AppShell";
import { getPartners } from "../../partners/registry";
import { Directory } from "../../shared/pages/Directory";
import { PartnerLanding } from "../../shared/pages/PartnerLanding";
import { ErrorScreen } from "../../shared/pages/ErrorScreen";

export function createAppRouter(): ReturnType<typeof createBrowserRouter> {
  const partnerRoutes: RouteObject[] = getPartners().flatMap((partner) =>
    partner.routes.map((route) => ({
      ...route,
      path: `partners/${partner.id}/${route.path || ""}`.replace(/\/+$/, ""),
    }))
  );

  const partnerLandings: RouteObject[] = getPartners().map((partner) => ({
    path: `partners/${partner.id}`,
    element: <PartnerLanding partnerId={partner.id} />,
  }));

  return createBrowserRouter([
    {
      element: <AppShell />,
      errorElement: <ErrorScreen />,
      children: [
        { index: true, element: <Directory /> },
        ...partnerLandings,
        ...partnerRoutes,
      ],
    },
  ]);
}
