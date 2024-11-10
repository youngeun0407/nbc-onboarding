import { create } from "zustand";

interface User {
  nickname: string;
  profileImage: string;
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user, token) => {
    localStorage.setItem("access_token", token);
    set({ user, isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem("access_token");
    set({ user: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
