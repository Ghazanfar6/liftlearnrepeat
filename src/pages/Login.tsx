import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, setPersistence } from "firebase/auth";
import { browserLocalPersistence } from "firebase/auth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/planner");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // Configure persistence
      await setPersistence(auth, browserLocalPersistence);
      
      // Configure custom parameters
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });

      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google sign in successful", result.user);
      navigate("/planner");
    } catch (err) {
      console.error("Google sign in error:", err);
      setError("Could not sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 rounded">
            {error}
            <pre className="text-xs mt-2 text-muted-foreground">
              Try clearing your browser cache and cookies if the issue persists.
            </pre>
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full"
          variant="outline"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin mr-2 h-4 w-4 border-b-2 border-primary" />
              Signing in...
            </div>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                {/* Google icon */}
              </svg>
              Sign in with Google
            </>
          )}
        </Button>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="pl-1 underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
        </p>

        <p className="text-center text-sm">
          <Button
            variant="link"
            className="underline"
            onClick={() => navigate("/reset-password")}
          >
            Forgot your password?
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Login;
