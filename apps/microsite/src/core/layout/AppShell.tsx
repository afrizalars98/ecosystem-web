import { Outlet } from "react-router-dom";
import { PageLayout } from "@wondr/design-system";

export const AppShell = () => {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};
