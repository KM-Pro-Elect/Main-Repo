import React, { useState } from "react";
import { supabase } from "../SupabaseClient";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const GoogleSignInButton: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);

    // Show toast notification
    toast({
      title: "Signing in with Google...",
      description: "Please wait while we redirect you",
    });

    // Initiate Google OAuth sign-in
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {redirectTo: `${window.location.origin}/home`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
          hd: "neu.edu.ph", // Restrict to NEU emails
        },
      },
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: error.message,
      });
      setIsLoading(false);
    } else {
      setTimeout(() => navigate("/home"), 1500);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      disabled={isLoading}
      className="bg-white border flex items-center gap-5 text-black font-semibold px-6 py-3 rounded-lg border-black hover:bg-gray-50 transition-colors"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/fe6bfe8b0c9b30ba612426c6a75dbfb52d296dfc263988dc885b4da14877f425"
        alt="Google logo"
        className="w-6 h-6"
      />
      {isLoading ? "Signing in..." : "Continue with Google"}
    </Button>
  );
};
