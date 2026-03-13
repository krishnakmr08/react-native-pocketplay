import { appAxios } from "@/service/apiInterceptors";
import { mmkvStorage } from "@/service/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Play {
  _id: string;
  description: string;
  likes: number;
  rating: number;
  starred: number;
  title: string;
  genre: string;
  stream_url: string;
  thumbnail_url: string;
}

interface PlayStore {
  live: Play[];
  topLiked: Play[];
  topRated: Play[];
  topStarred: Play[];
  fetchPlayData: () => Promise<void>;
  clearData: () => void;
}

export const usePlayStore = create<PlayStore>()(
  persist(
    (set) => ({
      live: [],
      topLiked: [],
      topRated: [],
      topStarred: [],

      fetchPlayData: async () => {
        try {
          const res = await appAxios.get("/play/list");
          const data = res.data;

          set({
            live: data.live ?? [],
            topLiked: data.top_liked ?? [],
            topRated: data.top_rated ?? [],
            topStarred: data.top_starred ?? [],
          });
        } catch (error) {
          console.error("Failed to fetch plays data", error);

          set({
            live: [],
            topLiked: [],
            topRated: [],
            topStarred: [],
          });
        }
      },

      clearData: () => {
        set({
          live: [],
          topLiked: [],
          topRated: [],
          topStarred: [],
        });
      },
    }),
    {
      name: "play-storage",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
