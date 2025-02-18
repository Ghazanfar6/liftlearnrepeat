import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';
import { workoutService } from '@/services/workoutService';
import { useCurrentUser } from '@/app/store/user';
import { ScheduledWorkout } from '@/types/workout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const WorkoutScheduler: React.FC = () => {
  const { user } = useCurrentUser();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [workouts, setWorkouts] = useState<ScheduledWorkout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) return;
      try {
        const data = await workoutService.getScheduledWorkouts(user.uid);
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [user]);

  const handleScheduleWorkout = async () => {
    if (!user) return;
    try {
      const newWorkout: Omit<ScheduledWorkout, 'id'> = {
        userId: user.uid,
        name: 'New Workout',
        date: selectedDate,
        time: selectedTime,
        completed: false,
        exercises: []
      };
      await workoutService.scheduleWorkout(newWorkout);
      // Refresh workouts list
      const updated = await workoutService.getScheduledWorkouts(user.uid);
      setWorkouts(updated);
    } catch (error) {
      console.error('Error scheduling workout:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Date & Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <input
                  type="date"
                  className="border rounded-md p-2"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <input
                  type="time"
                  className="border rounded-md p-2"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleScheduleWorkout}>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Workout
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workouts.map(workout => (
                <div key={workout.id} className="flex items-center justify-between">
                  <span>{workout.name}</span>
                  <span>{workout.date.toDateString()} {workout.time}</span>
                </div>
              ))}
              {workouts.length === 0 && <p className="text-muted-foreground">No upcoming workouts scheduled</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkoutScheduler; 