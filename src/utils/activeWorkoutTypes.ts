import { Exercise } from '@/pages/ExerciseLibrary';

export interface WorkoutSet {
  reps: number;
  weight: number;
  actualReps: number | null;
  actualWeight: number | null;
  isComplete: boolean;
}

export interface ActiveWorkoutExercise {
  exercise: Exercise;
  sets: WorkoutSet[];
  restBetweenSets: number;
  isComplete: boolean;
  notes: string;
}

export interface ActiveWorkout {
  id: string;
  userId: string;
  name: string;
  startTime: Date;
  exercises: ActiveWorkoutExercise[];
  isComplete: boolean;
}

export interface WorkoutTimer {
  startTime: Date;
  duration: number;
  isRunning: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscles: string[];
  equipment: string[];
  description: string;
  // Add other necessary fields
}
