import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { User, Trophy, Calendar, Dumbbell } from "lucide-react";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  displayName: string;
  email: string;
  joinedDate: string;
  workoutsCompleted: number;
  personalBests: number;
  streak: number;
}

export default function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;

      const profileRef = doc(db, 'userProfiles', currentUser.uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        setProfile(profileSnap.data() as UserProfile);
      } else {
        // Create default profile
        const defaultProfile: UserProfile = {
          displayName: currentUser.displayName || 'Fitness Enthusiast',
          email: currentUser.email || '',
          joinedDate: new Date().toISOString(),
          workoutsCompleted: 0,
          personalBests: 0,
          streak: 0
        };
        await setDoc(profileRef, defaultProfile);
        setProfile(defaultProfile);
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dumbbell className="w-6 h-6" />
            <span className="text-xl font-bold">LiftLearn Repeat</span>
          </div>
          <Button variant="ghost" onClick={() => navigate("/Logout")}>Log out</Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="bg-primary/10 p-4 rounded-full">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile?.displayName}</h1>
            <p className="text-muted-foreground">{profile?.email}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Dumbbell className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Workouts Completed</p>
                <p className="text-2xl font-bold">{profile?.workoutsCompleted}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Personal Bests</p>
                <p className="text-2xl font-bold">{profile?.personalBests}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{profile?.streak} days</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Member Since */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Member Since</h2>
          <p className="text-muted-foreground">
            {new Date(profile?.joinedDate || '').toLocaleDateString()}
          </p>
        </Card>
      </main>
    </div>
  );
}
