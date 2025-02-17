import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth as firebaseAuth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      setSuccess(true);
      setError("");
    } catch (err) {
      setError("Failed to send reset email");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Reset Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to receive a password reset link
          </p>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleResetPassword} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {success && (
              <p className="text-sm text-green-500 text-center">
                Password reset email sent! Check your inbox.
              </p>
            )}

            <Button type="submit" className="w-full py-6" variant="default">
              Send Reset Link
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Button variant="link" className="p-0 text-blue-600 hover:text-blue-800" onClick={() => navigate("/Login")}>
            Log in
          </Button>
        </p>
      </div>
    </div>
  );
}
