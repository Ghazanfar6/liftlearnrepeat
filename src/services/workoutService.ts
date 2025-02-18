import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Exercise, WorkoutTemplate, ScheduledWorkout } from '@/types/workout';

export const workoutService = {
  // Exercise Library
  async getExercises(): Promise<Exercise[]> {
    const exercisesRef = collection(db, 'exercises');
    const snapshot = await getDocs(exercisesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exercise));
  },

  // Templates
  async createTemplate(template: Omit<WorkoutTemplate, 'id'>): Promise<string> {
    const templatesRef = collection(db, 'workoutTemplates');
    const docRef = await addDoc(templatesRef, {
      ...template,
      createdAt: new Date()
    });
    return docRef.id;
  },

  async getTemplates(userId: string): Promise<WorkoutTemplate[]> {
    const templatesRef = collection(db, 'workoutTemplates');
    const q = query(templatesRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WorkoutTemplate));
  },

  async updateTemplate(templateId: string, template: WorkoutTemplate): Promise<void> {
    const templateRef = doc(db, 'workoutTemplates', templateId);
    await updateDoc(templateRef, {
      ...template,
      updatedAt: new Date()
    });
  },

  // Scheduled Workouts
  async scheduleWorkout(workout: Omit<ScheduledWorkout, 'id'>): Promise<string> {
    const workoutsRef = collection(db, 'scheduledWorkouts');
    const docRef = await addDoc(workoutsRef, workout);
    return docRef.id;
  },

  async getScheduledWorkouts(userId: string): Promise<ScheduledWorkout[]> {
    const workoutsRef = collection(db, 'scheduledWorkouts');
    const q = query(workoutsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ScheduledWorkout));
  },

  async completeWorkout(workoutId: string): Promise<void> {
    const workoutRef = doc(db, 'scheduledWorkouts', workoutId);
    await updateDoc(workoutRef, { completed: true });
  }
}; 