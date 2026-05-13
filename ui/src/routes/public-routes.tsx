import { SpacedLayout } from "@/components/layouts/SpacedLayout";
import { Header } from "@/components/Header";
import AllAppointments from "@/pages/admin/AllAppointments";
import MyBookings from "@/pages/appointments/MyBookings";
import type { RouteObject } from "react-router";

export const publicRoutes: RouteObject[] = [
  {
    element: <SpacedLayout header={<Header />} />,
    children: [
      {
        path: "/",
        element: <AllAppointments />,
      },
      {
        path: "/my-bookings",
        element: <MyBookings />,
      },
    ],
  },
];
