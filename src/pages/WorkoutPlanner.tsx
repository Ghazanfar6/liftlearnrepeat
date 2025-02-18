import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Calendar, Dumbbell, Save, Clock, Target } from 'lucide-react';
import { useCurrentUser } from '@/app/store/user';
import Navigation from '@/components/Navigation';
import ExerciseLibrary from '@/components/workout/ExerciseLibrary';
import WorkoutScheduler from '@/components/workout/WorkoutScheduler';
import WorkoutTemplates from '@/components/workout/WorkoutTemplates';
import CreateWorkoutModal from '@/components/workout/CreateWorkoutModal';
import { Exercise } from '@/types/workout';
import { workoutService } from '@/services/workoutService';

const WorkoutPlanner: React.FC = () => {
  const { user } = useCurrentUser();
  const [activeView, setActiveView] = React.useState<'planner' | 'library' | 'templates'>('planner');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const templates = [
    {
      name: "Full Body Workout",
      exercises: 8,
      duration: "60 min",
      lastUsed: "2 days ago"
    },
    {
      name: "Upper Body Push",
      exercises: 6,
      duration: "45 min",
      lastUsed: "5 days ago"
    },
    // Add more templates as needed
  ];

  const recentWorkouts = [
    {
      name: "Morning Workout",
      date: "Today",
      duration: "45 min",
      exercises: 6
    },
    // Add more recent workouts
  ];

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await workoutService.getExercises();
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  const handleCreateWorkout = async (workoutData: any) => {
    if (!user) return;
    try {
      const template: Omit<WorkoutTemplate, 'id'> = {
        userId: user.uid,
        name: workoutData.name,
        exercises: workoutData.exercises,
        duration: '60 min', // Calculate based on exercises
        createdAt: new Date()
      };
      await workoutService.createTemplate(template);
      // Refresh templates
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'library':
        return <ExerciseLibrary />;
      case 'templates':
        return <WorkoutTemplates />;
      default:
        return <WorkoutScheduler />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Workout Planner</h1>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Workout
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveView('planner')}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Workout
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Plan your next training session</p>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveView('library')}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Dumbbell className="w-5 h-5 mr-2" />
                  Exercise Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Browse and add exercises</p>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveView('templates')}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Save className="w-5 h-5 mr-2" />
                  Saved Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your workout templates</p>
              </CardContent>
            </Card>
          </div>

          {/* Render active view */}
          {renderView()}

          <CreateWorkoutModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSave={handleCreateWorkout}
            exercises={exercises}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlanner; 