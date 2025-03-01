import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient"; 
import { useToast } from "@/hooks/use-toast";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);

      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth check failed:", error);
        navigate("/");
        return;
      }

      // Redirect if no session
      if (!session) {
        navigate("/");
        return;
      }

      // Restrict access to NEU email users only
      if (!session.user.email?.endsWith("@neu.edu.ph")) {
        await supabase.auth.signOut();
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Only @neu.edu.ph email addresses are allowed",
        });
        navigate("/");
        return;
      }

      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          navigate("/");
          return;
        }

        if (!session.user.email?.endsWith("@neu.edu.ph")) {
          await supabase.auth.signOut();
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "Only @neu.edu.ph email addresses are allowed",
          });
          navigate("/");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
