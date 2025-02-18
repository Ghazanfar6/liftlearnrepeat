import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Dumbbell, User, LogOut, Moon, Sun } from 'lucide-react';
import { useCurrentUser } from '@/app/store/user';
import { useTheme } from '@/hooks/use-theme';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => navigate("/planner")}
        >
          <Dumbbell className="h-6 w-6" />
          <span className="text-xl font-bold">LiftLearn Repeat</span>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/planner")}>
              <Dumbbell className="h-4 w-4 mr-2" />
              Workouts
            </Button>
            <Button variant="ghost" onClick={() => navigate("/profile")}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" onClick={() => navigate("/logout")}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 