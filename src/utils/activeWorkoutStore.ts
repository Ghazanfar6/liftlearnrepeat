import { create } from 'zustand';
import { Exercise } from './activeWorkoutTypes';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ActiveWorkout, ActiveWorkoutExercise, WorkoutTimer, Workout } from './activeWorkoutTypes';
interface ActiveWorkoutStore {
  activeWorkout: ActiveWorkout | null;
  timer: WorkoutTimer | null;
  startWorkout: (workout: Workout, userId: string) => void;
  endWorkout: () => Promise<void>;
  updateExerciseSet: (exerciseIndex: number, setIndex: number, reps: number, weight: number) => void;
  completeSet: (exerciseIndex: number, setIndex: number) => void;
  completeExercise: (exerciseIndex: number) => void;
  startRestTimer: (exerciseIndex: number, duration: number) => void;
  addExerciseNote: (exerciseIndex: number, note: string) => void;
}

export const useActiveWorkoutStore = create<ActiveWorkoutStore>((set, get) => ({
  activeWorkout: null,
  timer: null,

  startWorkout: (workout, userId) => {
    const activeWorkout: ActiveWorkout = {
      id: workout.id,
      userId,
      name: workout.name,
      startTime: new Date(),
      exercises: workout.exercises.map((exercise: any) => ({
        exercise: exercise.exercise,
        sets: exercise.sets.map((set: any) => ({
          reps: set.reps,
          weight: set.weight,
          actualReps: null,
          actualWeight: null,
          isComplete: false
        })),
        restBetweenSets: exercise.restBetweenSets || 60,
        isComplete: false,
        notes: ''
      })),
      isComplete: false
    };

    set({
      activeWorkout,
      timer: {
        startTime: new Date(),
        duration: 0,
        isRunning: true
      }
    });

    // Start the workout timer
    const interval = setInterval(() => {
      const { timer } = get();
      if (timer && timer.isRunning) {
        set({
          timer: {
            ...timer,
            duration: Math.floor((new Date().getTime() - timer.startTime.getTime()) / 1000)
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  },

  endWorkout: async () => {
    const { activeWorkout, timer } = get();
    if (!activeWorkout || !timer) return;

    const workoutData = {
      ...activeWorkout,
      endTime: new Date(),
      duration: timer.duration,
      isComplete: true
    };

    try {
      // Save completed workout to Firestore
      const workoutRef = doc(db, 'completedWorkouts', `${activeWorkout.userId}_${new Date().getTime()}`);
      await setDoc(workoutRef, {
        ...workoutData,
        startTime: Timestamp.fromDate(workoutData.startTime),
        endTime: Timestamp.fromDate(workoutData.endTime)
      });

      set({ activeWorkout: null, timer: null });
    } catch (error) {
      console.error('Failed to save workout:', error);
      throw error;
    }
  },

  updateExerciseSet: (exerciseIndex, setIndex, reps, weight) => {
    const { activeWorkout } = get();
    if (!activeWorkout) return;

    const updatedExercises = [...activeWorkout.exercises];
    updatedExercises[exerciseIndex].sets[setIndex] = {
      ...updatedExercises[exerciseIndex].sets[setIndex],
      actualReps: reps,
      actualWeight: weight
    };

    set({ activeWorkout: { ...activeWorkout, exercises: updatedExercises } });
  },

  completeSet: (exerciseIndex, setIndex) => {
    const { activeWorkout } = get();
    if (!activeWorkout) return;

    const updatedExercises = [...activeWorkout.exercises];
    updatedExercises[exerciseIndex].sets[setIndex].isComplete = true;

    set({ activeWorkout: { ...activeWorkout, exercises: updatedExercises } });
  },

  completeExercise: (exerciseIndex) => {
    const { activeWorkout } = get();
    if (!activeWorkout) return;

    const updatedExercises = [...activeWorkout.exercises];
    updatedExercises[exerciseIndex].isComplete = true;

    set({ activeWorkout: { ...activeWorkout, exercises: updatedExercises } });
  },

  startRestTimer: (exerciseIndex, duration) => {
    // Implement rest timer logic here
    console.log(`Starting ${duration}s rest timer for exercise ${exerciseIndex}`);
  },

  addExerciseNote: (exerciseIndex, note) => {
    const { activeWorkout } = get();
    if (!activeWorkout) return;

    const updatedExercises = [...activeWorkout.exercises];
    updatedExercises[exerciseIndex].notes = note;

    set({ activeWorkout: { ...activeWorkout, exercises: updatedExercises } });
  }
}));
