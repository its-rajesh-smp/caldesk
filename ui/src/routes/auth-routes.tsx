import { SpacedLayout } from "@/components/layouts/SpacedLayout";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import LoginPage from "@/pages/auth/LoginPage";
import OtpVerificationPage from "@/pages/auth/OtpVerificationPage";
import RegistrationPage from "@/pages/auth/RegistrationPage";
import type { RouteObject } from "react-router";

export const authRoutes: RouteObject[] = [
  {
    element: <SpacedLayout spacingType="auth" />,
    children: [
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/verify-otp",
        element: <OtpVerificationPage />,
      },
    ],
  },
];
