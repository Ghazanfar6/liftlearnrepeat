# LiftLearn Repeat - Workout Tracker

A modern workout tracking application built with React, TypeScript, and Tailwind CSS.

## Features

- Exercise Library with detailed instructions
- Progress Tracking with charts and metrics
- Workout Planning and customization
- Training Calendar
- Personal Records tracking
- Workout Timer
- Dark/Light mode support
- Responsive design

## Authentication Features

- Email/Password authentication
- Google Sign-in integration
- Password reset functionality
- Protected routes
- User profile management
- Persistent user sessions
- Secure authentication state management

## Getting Started

1. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password and Google providers)
   - Create a Firestore database
   - Copy your Firebase config

2. Configure Firebase:
   - Update `src/lib/firebase.ts` with your Firebase configuration

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Firebase (Authentication & Firestore)
- Zustand (State Management)
- Lucide Icons
- Radix UI

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  │   └── ui/        # Shadcn UI components
  ├── contexts/      # React contexts
  ├── hooks/         # Custom React hooks
  ├── lib/           # Utility functions and configurations
  ├── pages/         # Page components
  │   ├── Home.tsx   # Landing page
  │   ├── Login.tsx  # Login page
  │   ├── SignUp.tsx # Sign up page
  │   ├── Profile.tsx # User profile page
  │   └── ResetPassword.tsx # Password reset page
  ├── App.tsx        # Main App component
  ├── main.tsx       # Entry point
  └── index.css      # Global styles
```

## Authentication Flow

1. **Sign Up**:
   - Users can create an account using email/password
   - Users can sign up with Google
   - Upon successful registration, a user profile is created in Firestore

2. **Login**:
   - Users can log in with email/password
   - Users can log in with Google
   - Failed login attempts show appropriate error messages

3. **Password Reset**:
   - Users can request a password reset link
   - Reset link is sent to their email

4. **Profile Management**:
   - Users can view their profile information
   - Profile shows workout statistics
   - Tracks personal bests and workout streaks
#   l i f t l e a r n r e p e a t 
 
 