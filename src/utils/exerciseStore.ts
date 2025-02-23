import { create } from 'zustand';
import { Exercise } from './activeWorkoutTypes';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ExerciseStore {
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
  muscleGroups: string[];
  equipment: string[];
  fetchExercises: () => Promise<void>;
  filterExercises: (
    muscleGroup: string | null,
    equipment: string | null,
    searchQuery: string
  ) => Exercise[];
}

export const useExerciseStore = create<ExerciseStore>((set, get) => ({
  exercises: [],
  loading: false,
  error: null,
  muscleGroups: [
    "All",
    "Chest",
    "Back",
    "Shoulders",
    "Biceps",
    "Triceps",
    "Legs",
    "Core",
    "Full Body"
  ],
  equipment: [
    "All",
    "Barbell",
    "Dumbbell",
    "Kettlebell",
    "Machine",
    "Bodyweight",
    "Resistance Band",
    "Cable",
    "Other"
  ],

  fetchExercises: async () => {
    set({ loading: true, error: null });
    try {
      const exercisesRef = collection(db, 'exercises');
      const exercisesSnap = await getDocs(exercisesRef);
      
      const exercises = exercisesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Exercise[];

      set({ exercises, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch exercises', loading: false });
    }
  },

  filterExercises: (muscleGroup, equipment, searchQuery) => {
    const { exercises } = get();
    return exercises.filter(exercise => {
      const matchesMuscle = !muscleGroup || exercise.targetMuscles.includes(muscleGroup);
      const matchesEquipment = !equipment || exercise.equipment.includes(equipment);
      const matchesSearch = !searchQuery || 
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.targetMuscles.some(muscle => 
          muscle.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      return matchesMuscle && matchesEquipment && matchesSearch;
    });
  },
}));
