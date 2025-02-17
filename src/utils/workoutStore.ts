import { create } from 'zustand';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Exercise } from '@/pages/ExerciseLibrary';

interface WorkoutExercise {
  exercise: Exercise;
  sets: Array<{
    reps: number;
    weight: number;
  }>;
  restBetweenSets: number;
}

interface Workout {
  id: string;
  userId: string;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  createdAt: Date;
  updatedAt: Date;
}

interface WorkoutStore {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  fetchWorkouts: (userId: string) => Promise<void>;
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: [],
  loading: false,
  error: null,

  fetchWorkouts: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const workoutsRef = collection(db, 'workouts');
      const q = query(workoutsRef, where('userId', '==', userId));
      const workoutsSnap = await getDocs(q);
      
      const workouts = workoutsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Workout[];

      set({ workouts, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch workouts', loading: false });
    }
  }
}));
