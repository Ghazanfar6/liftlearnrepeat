import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, Trophy, Dumbbell, Target } from 'lucide-react';
import { useCurrentUser } from '@/app/store/user';
import Navigation from '@/components/Navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface UserProfile {
  displayName: string;
  email: string;
  joinedDate: string;
  workoutsCompleted: number;
  personalBests: number;
  streak: number;
}

const Profile: React.FC = () => {
  const { user } = useCurrentUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setError("No user found");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching profile for user:", user.uid); // Debug log
        const profileRef = doc(db, 'userProfiles', user.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          console.log("Profile exists:", profileSnap.data()); // Debug log
          setProfile(profileSnap.data() as UserProfile);
        } else {
          console.log("Creating new profile"); // Debug log
          // Create default profile
          const defaultProfile: UserProfile = {
            displayName: user.displayName || 'Fitness Enthusiast',
            email: user.email || '',
            joinedDate: new Date().toISOString(),
            workoutsCompleted: 0,
            personalBests: 0,
            streak: 0
          };

          // Save the default profile to Firestore
          try {
            await setDoc(profileRef, defaultProfile);
            console.log("Default profile created successfully"); // Debug log
            setProfile(defaultProfile);
          } catch (error) {
            console.error("Error creating default profile:", error);
            setError("Failed to create profile");
          }
        }
      } catch (error) {
        console.error('Error fetching/creating profile:', error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !profile || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive">Error Loading Profile</h1>
            <p className="text-muted-foreground mt-2">
              {error || "There was an error loading your profile. Please try again later."}
            </p>
            {/* Add retry button */}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{profile.displayName}</h1>
          <p className="text-muted-foreground">{profile.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Dumbbell className="w-5 h-5 mr-2" />
                Workouts Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{profile.workoutsCompleted}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Trophy className="w-5 h-5 mr-2" />
                Personal Bests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{profile.personalBests}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Target className="w-5 h-5 mr-2" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{profile.streak} days</p>
            </CardContent>
          </Card>
        </div>

        {/* Member Since */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Member Since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              {new Date(profile.joinedDate).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
