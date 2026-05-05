import { SpacedLayout } from "@/components/layouts/SpacedLayout";
import LandingPage from "@/pages/landing/LandingPage";
import type { RouteObject } from "react-router";

export const publicRoutes: RouteObject[] = [
  {
    element: <SpacedLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },
];
