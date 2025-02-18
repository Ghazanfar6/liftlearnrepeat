import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Dumbbell, Clock } from 'lucide-react';
import { workoutService } from '@/services/workoutService';
import { useCurrentUser } from '@/app/store/user';
import { WorkoutTemplate, Exercise } from '@/types/workout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EditTemplateModal from './EditTemplateModal';

const WorkoutTemplates: React.FC = () => {
  const { user } = useCurrentUser();
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState<WorkoutTemplate | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const [templatesData, exercisesData] = await Promise.all([
          workoutService.getTemplates(user.uid),
          workoutService.getExercises()
        ]);
        setTemplates(templatesData);
        setExercises(exercisesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleCreateTemplate = async () => {
    if (!user) return;
    try {
      const newTemplate: Omit<WorkoutTemplate, 'id'> = {
        userId: user.uid,
        name: 'New Template',
        exercises: [],
        duration: '0 min',
        createdAt: new Date()
      };
      await workoutService.createTemplate(newTemplate);
      // Refresh templates list
      const updated = await workoutService.getTemplates(user.uid);
      setTemplates(updated);
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const handleEditTemplate = async (updatedTemplate: WorkoutTemplate) => {
    if (!user) return;
    try {
      await workoutService.updateTemplate(updatedTemplate.id, updatedTemplate);
      const updated = await workoutService.getTemplates(user.uid);
      setTemplates(updated);
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Workout Templates</h2>
          <Button onClick={handleCreateTemplate}>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(template => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Dumbbell className="h-4 w-4 mr-2" />
                    {template.exercises.length} exercises
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {template.duration}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setEditingTemplate(template)}>
                  Edit Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {editingTemplate && (
        <EditTemplateModal
          isOpen={!!editingTemplate}
          onClose={() => setEditingTemplate(null)}
          onSave={handleEditTemplate}
          template={editingTemplate}
          exercises={exercises}
        />
      )}
    </>
  );
};

export default WorkoutTemplates; 