export interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: string;
  description: string;
  instructions?: string[];
  sets?: number;
  reps?: number;
}

export interface WorkoutTemplate {
  id: string;
  userId: string;
  name: string;
  exercises: Exercise[];
  duration: string;
  createdAt: Date;
}

export interface ScheduledWorkout {
  id: string;
  userId: string;
  templateId?: string;
  name: string;
  date: Date;
  time: string;
  completed: boolean;
  exercises: Exercise[];
} 