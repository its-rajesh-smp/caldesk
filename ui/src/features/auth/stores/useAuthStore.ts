import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/user";

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (data: { token: string; user: User }) => void;
  updateUser: (user: User) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;

  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      setAuth: ({ token, user }) => set({ token, user }),
      updateUser: (user) => set({ user }),
      clearAuth: () => set({ token: null, user: null }),
      isAuthenticated: () => !!get().token,

      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "auth-storage", // localStorage key
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
