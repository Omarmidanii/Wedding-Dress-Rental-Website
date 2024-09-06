import { create } from "zustand";
import User from "../entities/User";

interface UserStore {
  user: User;
  setId: (id: number) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: { token: "" },
  setId: (id) => set((store) => ({ user: { ...store.user, id } })),
  setName: (name) => set((store) => ({ user: { ...store.user, name } })),
  setEmail: (email) => set((store) => ({ user: { ...store.user, email } })),
  setToken: (token) =>
    set((store) => ({ user: { ...store.user, token: token } })),
  setUser: (user) => set(() => ({ user: user })),
}));

export default useUserStore;
