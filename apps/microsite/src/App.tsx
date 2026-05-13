import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./core/auth/AuthProvider";
import { AuthGuard } from "./core/auth/AuthGuard";
import { createAppRouter } from "./core/router";

// Import partners (side-effect: registers plugins)
import "./partners/rspi";
import "./partners/sarinah";

const router = createAppRouter();

export const App = () => {
  return (
    <AuthProvider>
      <AuthGuard>
        <RouterProvider router={router} />
      </AuthGuard>
    </AuthProvider>
  );
};
