import * as React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/app/store/user";
import { Dumbbell, LineChart, Calendar, Trophy, Library, Clock, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const features = [
  {
    title: "Exercise Library",
    description: "Access a comprehensive database of exercises with detailed instructions and form tips.",
    icon: Library
  },
  {
    title: "Progress Tracking",
    description: "Visualize your strength gains and workout consistency with detailed charts and metrics.",
    icon: LineChart
  },
  {
    title: "Workout Planning",
    description: "Create and customize workout routines tailored to your fitness goals.",
    icon: Dumbbell
  },
  {
    title: "Training Calendar",
    description: "Schedule your workouts and maintain a consistent training routine.",
    icon: Calendar
  },
  {
    title: "Personal Records",
    description: "Track and celebrate your personal bests for every exercise.",
    icon: Trophy
  },
  {
    title: "Workout Timer",
    description: "Built-in rest timer and workout duration tracking for optimal training.",
    icon: Clock
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user } = useCurrentUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-6 w-6" />
            <span className="text-xl font-bold">LiftLearn Repeat</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {user ? (
              <>
                <Button variant="ghost" onClick={() => navigate("/profile")}>
                  Profile
                </Button>
                <Button variant="ghost" onClick={() => navigate("/logout")}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/signup")}>Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              Track Your Fitness Journey with Precision
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your all-in-one workout companion for tracking progress, planning routines,
              and achieving your fitness goals.
            </p>
            <Button size="lg" onClick={() => navigate(user ? "/profile" : "/signup")}>
              {user ? "View Profile" : "Get Started"}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow"
              >
                <feature.icon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
