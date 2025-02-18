import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Exercise, WorkoutTemplate } from '@/types/workout';
import { Plus, X } from 'lucide-react';

interface EditTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: WorkoutTemplate) => void;
  template: WorkoutTemplate;
  exercises: Exercise[];
}

const EditTemplateModal: React.FC<EditTemplateModalProps> = ({
  isOpen,
  onClose,
  onSave,
  template,
  exercises
}) => {
  const [name, setName] = useState(template.name);
  const [selectedExercises, setSelectedExercises] = useState(template.exercises);

  const handleAddExercise = (exercise: Exercise) => {
    setSelectedExercises([
      ...selectedExercises,
      { ...exercise, sets: 3, reps: 10 }
    ]);
  };

  const handleRemoveExercise = (index: number) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({
      ...template,
      name,
      exercises: selectedExercises,
      duration: `${selectedExercises.length * 5} min` // Simple duration calculation
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Workout Template</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Template Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            {selectedExercises.map((exercise, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <p className="font-medium">{exercise.name}</p>
                  <div className="flex space-x-4 mt-1">
                    <Input
                      type="number"
                      className="w-20"
                      placeholder="Sets"
                      value={exercise.sets || 3}
                      onChange={(e) => {
                        const newExercises = [...selectedExercises];
                        newExercises[index] = {
                          ...newExercises[index],
                          sets: parseInt(e.target.value)
                        };
                        setSelectedExercises(newExercises);
                      }}
                    />
                    <Input
                      type="number"
                      className="w-20"
                      placeholder="Reps"
                      value={exercise.reps || 10}
                      onChange={(e) => {
                        const newExercises = [...selectedExercises];
                        newExercises[index] = {
                          ...newExercises[index],
                          reps: parseInt(e.target.value)
                        };
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
            <Button onClick={handleSave} disabled={!name || selectedExercises.length === 0}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTemplateModal; 