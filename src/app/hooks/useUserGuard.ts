import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../store/user';
import { auth } from '@/lib/firebase';

export function useUserGuardContext() {
  const { user, setUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate, setUser]);

  return { user };
}
