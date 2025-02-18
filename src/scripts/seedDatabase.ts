import '../lib/firebase.js';
import { seedExercises } from '../utils/seedExercises.js';

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    await seedExercises();
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
  process.exit(0);
};

// Run the seed
seedDatabase(); 