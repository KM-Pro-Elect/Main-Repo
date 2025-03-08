import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../SupabaseClient";
import { useToast } from "@/hooks/use-toast";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
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

      // Allow guest access to the /home route
      if (location.pathname === "/home") {
        setIsLoading(false);
        return;
      }

      // Redirect if no session (for non-guest routes)
      if (!session) {
        navigate("/");
        return;
      }

      // Restrict access to @neu.edu.ph email users only (for non-guest routes)
      const userEmail = session.user.email;
      if (!userEmail || !userEmail.endsWith("@neu.edu.ph")) {
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
  }, [navigate, toast, location.pathname]);

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