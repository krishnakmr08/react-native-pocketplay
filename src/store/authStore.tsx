import { mmkvStorage } from "@/service/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  user: Record<string, any> | null;
  setUser: (user: Record<string, any>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
