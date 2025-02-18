import { User } from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '@/lib/firebase';

interface UserState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const useCurrentUser = create<UserState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
}));

// Initialize auth listener
auth.onAuthStateChanged((user) => {
  useCurrentUser.getState().setUser(user);
});
