
import { useEffect } from "react";
import { supabase } from "@/components/SupabaseClient";
import { useToast } from "@/hooks/use-toast";

export const useLoginTracker = () => {
  const { toast } = useToast();

  useEffect(() => {
    const recordLogin = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { error } = await supabase.from('user_logins').insert([
            { 
              user_id: user.id,
              user_name: user.user_metadata?.full_name || user.email,
              user_role: user.user_metadata?.role || 'User',
              login_time: new Date().toISOString(),
            }
          ]);

          if (error) {
            console.error('Failed to record login:', error);
            toast({
              variant: "destructive",
              title: "Failed to record login",
              description: error.message,
            });
          }
        }
      } catch (error) {
        console.error('Error recording login:', error);
      }
    };

    recordLogin();
  }, [toast]);

  return null;
};
