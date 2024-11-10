import { create } from "zustand";

interface UserState {
  userId: string | null;
  nickname: string | null;
  avatar: string | null;
  accessToken: string | null;
  setUser: (
    userId: string,
    nickname: string,
    avatar: string,
    accessToken: string
  ) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  nickname: null,
  avatar: null,
  accessToken: null,
  setUser: (userId, nickname, avatar, accessToken) =>
    set({ userId, nickname, avatar, accessToken }),
  clearUser: () =>
    set({ userId: null, nickname: null, avatar: null, accessToken: null }),
}));
