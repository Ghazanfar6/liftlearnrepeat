import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  
  useEffect(() => {
    auth.signOut().then(() => {
      navigate('/');
    });
  }, [navigate]);

  return null;
}
