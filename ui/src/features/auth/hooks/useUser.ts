import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { getCurrentUser } from "../apis/getCurrentUser";
import { useAuthStore } from "../stores/useAuthStore";

export const useUser = () => {
  const { isAuthenticated, token } = useAuthStore();

  const {
    data: user,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", token],
    queryFn: getCurrentUser,
    enabled: isAuthenticated(),
  });

  useLayoutEffect(() => {
    if (user) {
      useAuthStore.getState().updateUser(user);
    }
  }, [user]);

  useLayoutEffect(() => {
    if (error) {
      useAuthStore.getState().clearAuth();
    }
  }, [isError]);

  return useAuthStore();
};
