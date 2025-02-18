import { db } from '../lib/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

const exercises = [
  {
    name: 'Bench Press',
    category: 'Chest',
    equipment: 'Barbell',
    description: 'A compound exercise that targets the chest, shoulders, and triceps.',
    instructions: [
      'Lie on a flat bench with feet planted firmly on the ground',
      'Grip the barbell slightly wider than shoulder width',
      'Lower the bar to your chest with control',
      'Press the bar back up to the starting position'
    ]
  },
  {
    name: 'Squat',
    category: 'Legs',
    equipment: 'Barbell',
    description: 'A fundamental compound exercise for lower body strength.',
    instructions: [
      'Position the bar on your upper back',
      'Stand with feet shoulder-width apart',
      'Break at hips and knees simultaneously',
      'Lower until thighs are parallel to ground',
      'Drive through heels to return to starting position'
    ]
  },
  {
    name: 'Deadlift',
    category: 'Back',
    equipment: 'Barbell',
    description: 'A powerful compound movement targeting the entire posterior chain.',
    instructions: [
      'Stand with feet hip-width apart',
      'Grip the bar just outside your legs',
      'Keep back straight and chest up',
      'Pull the bar up by extending hips and knees',
      'Return the bar to ground with control'
    ]
  },
  {
    name: 'Pull-up',
    category: 'Back',
    equipment: 'Bodyweight',
    description: 'A compound upper body pulling exercise.',
    instructions: [
      'Hang from pull-up bar with hands slightly wider than shoulders',
      'Pull yourself up until chin clears the bar',
      'Lower yourself with control',
      'Repeat for desired reps'
    ]
  },
  {
    name: 'Overhead Press',
    category: 'Shoulders',
    equipment: 'Barbell',
    description: 'A compound pressing movement for shoulder development.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold barbell at shoulder level',
      'Press the bar overhead until arms are fully extended',
      'Lower bar back to shoulders with control'
    ]
  },
  {
    name: 'Romanian Deadlift',
    category: 'Legs',
    equipment: 'Barbell',
    description: 'A hip-hinge movement targeting hamstrings and lower back.',
    instructions: [
      'Hold barbell at hip level',
      'Push hips back while keeping back straight',
      'Lower bar along legs until you feel hamstring stretch',
      'Drive hips forward to return to starting position'
    ]
  },
  {
    name: 'Dumbbell Row',
    category: 'Back',
    equipment: 'Dumbbell',
    description: 'A unilateral back exercise for strength and muscle development.',
    instructions: [
      'Place one knee and hand on bench',
      'Hold dumbbell in free hand',
      'Pull dumbbell to ribcage',
      'Lower with control'
    ]
  },
  {
    name: 'Incline Bench Press',
    category: 'Chest',
    equipment: 'Barbell',
    description: 'An upper chest focused pressing movement.',
    instructions: [
      'Lie on incline bench (15-30 degrees)',
      'Grip barbell slightly wider than shoulders',
      'Lower bar to upper chest',
      'Press back to starting position'
    ]
  }
];

export const seedExercises = async () => {
  const exercisesRef = collection(db, 'exercises');
  
  for (const exercise of exercises) {
    try {
      await addDoc(exercisesRef, exercise);
      console.log(`Added exercise: ${exercise.name}`);
    } catch (error) {
      console.error(`Error adding ${exercise.name}:`, error);
    }
  }
}; 