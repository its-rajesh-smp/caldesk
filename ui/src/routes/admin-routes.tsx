import { Header } from "@/components/Header";
import { SpacedLayout } from "@/components/layouts/SpacedLayout";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import AllAppointments from "@/pages/admin/AllAppointments";
import { CreateAppointment } from "@/pages/admin/CreateAppointment";
import type { RouteObject } from "react-router";
import { RoleGuard } from "./guards/roleGuard";
import { UserRole } from "@/features/auth/types/user";

export const adminRoutes: RouteObject[] = [
  {
    element: (
      <RoleGuard role={UserRole.CLINIC}>
        <SpacedLayout header={<Header />} />
      </RoleGuard>
    ),
    path: "/admin",
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
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
