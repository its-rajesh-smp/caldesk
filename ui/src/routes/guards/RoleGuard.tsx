import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import type { UserRole } from "@/features/auth/types/user";
import { Navigate, Outlet } from "react-router";

export const RoleGuard = ({
  role,
  children,
}: {
  role: UserRole;
  children?: React.ReactNode;
}) => {
  const { user, token, hasHydrated } = useAuthStore();

  if (!hasHydrated) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return null;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
