import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Exercise } from '@/types/workout';
import { Plus, X } from 'lucide-react';

interface CreateWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workout: any) => void;
  exercises: Exercise[];
}

const CreateWorkoutModal: React.FC<CreateWorkoutModalProps> = ({
  isOpen,
  onClose,
  onSave,
  exercises
}) => {
  const [workoutName, setWorkoutName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Array<{
    exercise: Exercise;
    sets: number;
    reps: number;
  }>>([]);

  const handleAddExercise = (exercise: Exercise) => {
    setSelectedExercises([
      ...selectedExercises,
      { exercise, sets: 3, reps: 10 }
    ]);
  };

  const handleRemoveExercise = (index: number) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      name: workoutName,
      exercises: selectedExercises,
      createdAt: new Date()
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Workout</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Workout Name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Add Exercises</h3>
            <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
              {exercises.map(exercise => (
                <Button
                  key={exercise.id}
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleAddExercise(exercise)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {exercise.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Selected Exercises</h3>
            {selectedExercises.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <p className="font-medium">{item.exercise.name}</p>
                  <div className="flex space-x-4 mt-1">
                    <Input
                      type="number"
                      className="w-20"
                      placeholder="Sets"
                      value={item.sets}
                      onChange={(e) => {
                        const newExercises = [...selectedExercises];
                        newExercises[index].sets = parseInt(e.target.value);
                        setSelectedExercises(newExercises);
                      }}
                    />
                    <Input
                      type="number"
                      className="w-20"
                      placeholder="Reps"
                      value={item.reps}
                      onChange={(e) => {
                        const newExercises = [...selectedExercises];
                        newExercises[index].reps = parseInt(e.target.value);
                        setSelectedExercises(newExercises);
                      }}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveExercise(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!workoutName || selectedExercises.length === 0}>
              Create Workout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkoutModal; 