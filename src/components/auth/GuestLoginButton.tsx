import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const GuestLoginButton: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    console.log("Guest login button clicked");

    // Show toast with a short auto-dismiss timeout
    toast({
      title: "Logging in as Guest...",
      description: "Redirecting to the guest home page",
      duration: 1000, // Auto-dismiss in 1 second
    });

    // Redirect after a short delay
    setTimeout(() => {
      console.log("Redirecting to /guesthome");
      navigate("/guesthome");
    }, 1200); // Slightly longer than toast duration
  };

  return (
    <Button
      onClick={handleGuestLogin}
      className="bg-white border flex items-center gap-3 text-black font-semibold w-72 px-6 py-3 rounded-2xl border-black hover:bg-gray-50 transition-colors mx-auto"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="Guest icon"
        className="w-6 h-6"
      />
      Continue as Guest
    </Button>
  );
};
