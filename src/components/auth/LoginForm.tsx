import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "../SupabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { GuestLoginButton } from "./GuestLoginButton"; // Import the GuestLoginButton

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user && !session.user.email?.endsWith("@neu.edu.ph")) {
          await supabase.auth.signOut();
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "Only @neu.edu.ph email addresses are allowed",
          });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [toast]);

  const validateEmail = (email: string) => email.endsWith("@neu.edu.ph");

  const onSubmit = async (data: LoginFormData) => {
    if (!validateEmail(data.email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please use your NEU email address",
      });
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Success!",
        description: "Redirecting to your dashboard...",
      });
      setTimeout(() => navigate("/home"), 1500);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="space-y-3">
          <h2 className="text-3xl font-semibold text-center">Welcome Back</h2>
          <p className="text-muted-foreground text-center text-lg">
            Please sign in to continue
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-base">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your NEU email"
                className="h-12 text-lg"
                {...register("email", { required: true })}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-base">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-12 text-lg"
                {...register("password", { required: true })}
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg">
              Sign In
            </Button>
          </form>
          
          <div className="flex items-center gap-4">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-gray-500 text-base">or</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          <GoogleSignInButton />
          <GuestLoginButton /> {/* Add the GuestLoginButton here */}
        </CardContent>
      </Card>
    </div>
  );
};