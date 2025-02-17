import { create } from 'zustand';
import { User } from 'firebase/auth';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useCurrentUser = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
