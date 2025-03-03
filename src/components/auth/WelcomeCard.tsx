import * as React from "react";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const WelcomeCard: React.FC = () => {
  const [user, setUser] = React.useState<any>(null);
  const navigate = useNavigate();

  const handleSignIn = (userData: any) => {
    setUser(userData);
    console.log("User signed in:", userData);
  };

  return (
    <div className="relative w-full flex flex-col items-end pr-20">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/6e1ca6255a5fa5ec19a97960cdd8c96150dc6488689026e51e06f3eb025082f9?placeholderIfAbsent=true"
        alt="NEU Logo"
        className="absolute top-[-100px] left-[-300px] w-[100px]"
      />
      <Card className="mr-[-350px] bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border z-0 flex min-w-60 min-h-[700px] w-[560px] items-center gap-[40px] overflow-hidden justify-center flex-wrap grow shrink my-auto px-[100px] py-[119px] rounded-[20px] border-black border-solid max-md:max-w-full max-md:px-5 max-md:py-[100px]">
        <div className="self-stretch min-w-60 text-[40px] text-black font-bold text-center flex-wrap my-auto p-2.5">
          <span className="block font-semibold text-[35px]">Welcome to</span>
          <span className="block text-[50px]">NEUPoliSeek!</span>
        </div>
        {user ? (
          <div className="flex flex-col items-center gap-4">
            <img 
              src={user.picture} 
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
            <p className="text-lg font-medium">Welcome, {user.name}!</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <Button onClick={() => navigate("/home")} className="mt-4">
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <GoogleSignInButton onSignIn={handleSignIn} />
          </div>
        )}
      </Card>
    </div>
  );
};
