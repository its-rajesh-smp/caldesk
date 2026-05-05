import { Header } from "@/components/Header";
import { SpacedLayout } from "@/components/layouts/SpacedLayout";
import AllAppointments from "@/pages/admin/AllAppointments";
import { CreateAppointment } from "@/pages/admin/CreateAppointment";
import type { RouteObject } from "react-router";

export const adminRoutes: RouteObject[] = [
  {
    element: <SpacedLayout header={<Header />} />,
    path: "/admin",
    children: [
      {
        path: "appointments",
        element: <AllAppointments />,
      },
      {
        path: "appointments/create",
        element: <CreateAppointment />,
      },
    ],
  },
];
