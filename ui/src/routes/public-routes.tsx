import LandingPage from "@/pages/landing/LandingPage";
import type { RouteObject } from "react-router";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
];
