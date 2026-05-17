import { createBrowserRouter } from "react-router";
import { adminRoutes } from "./admin-routes";
import { authRoutes } from "./auth-routes";
import { publicRoutes } from "./public-routes";
import { clinicRoutes } from "./clinic-routes";

export const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
  ...adminRoutes,
  ...clinicRoutes,
]);
