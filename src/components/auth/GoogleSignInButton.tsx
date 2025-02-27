import * as React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface GoogleSignInButtonProps {
  onSignIn?: (user: any) => void;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSignIn,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    
    // Show toast notification
    toast({
      title: "Signing in with Google...",
      description: "Please wait while we redirect you",
    });
    
    // Simulate sign in delay
    setTimeout(() => {
      // If there was an onSignIn callback provided, call it with mock user data
      if (onSignIn) {
        const mockUser = {
          id: "user-123",
          name: "Demo User",
          email: "demo@example.com",
          picture: "https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/fe6bfe8b0c9b30ba612426c6a75dbfb52d296dfc263988dc885b4da14877f425"
        };
        onSignIn(mockUser);
      }
      
      // Redirect to home page
      navigate("/home");
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Button
      onClick={handleSignIn}
      disabled={isLoading}
      className="bg-white border self-stretch flex min-w-60 min-h-[75px] items-center gap-5 text-[15px] text-black font-semibold justify-center flex-wrap my-auto px-[46px] py-[23px] rounded-[20px] border-black border-solid hover:bg-gray-50 transition-colors duration-200 max-md:px-5"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/fe6bfe8b0c9b30ba612426c6a75dbfb52d296dfc263988dc885b4da14877f425?placeholderIfAbsent=true"
        alt="Google logo"
        className="aspect-[1] object-contain w-[30px] self-stretch shrink-0 my-auto"
      />
      <span className="self-stretch my-auto">
        {isLoading ? "Signing in..." : "Continue with Google"}
      </span>
    </Button>
  );
};