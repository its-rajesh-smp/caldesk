import { Header } from "@/components/Header";
import { SpacedLayout } from "@/components/layouts/SpacedLayout";
import { ClinicDashboard } from "@/pages/clinic/ClinicDashboard";
import type { RouteObject } from "react-router";

export const clinicRoutes: RouteObject[] = [
  {
    element: <SpacedLayout header={<Header />} />,
    path: "/clinic",
    children: [
      {
        element: <ClinicDashboard />,
        path: "dashboard",
      },
    ],
  },
];
