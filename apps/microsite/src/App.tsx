import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./core/router";

import "./partners/rspi";
import "./partners/sarinah";

const router = createAppRouter();

export const App = () => {
  return <RouterProvider router={router} />;
};
