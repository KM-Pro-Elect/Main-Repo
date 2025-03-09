
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
          console.log("Recording login for user:", user.id);
          
          // Check if the user_logins table exists
          const { error: tableCheckError } = await supabase
            .from('user_logins')
            .select('count', { count: 'exact', head: true });
          
          if (tableCheckError && tableCheckError.code === '42P01') {
            console.log('The user_logins table does not exist. Creating it now...');
            
            // Create the table if it doesn't exist
            const { error: createTableError } = await supabase.rpc('create_user_logins_table');
            
            if (createTableError) {
              console.error('Failed to create user_logins table:', createTableError);
              
              toast({
                variant: "destructive",
                title: "Database setup required",
                description: "Please create the user_logins table in Supabase with columns: id, user_id, user_name, login_time",
                duration: 10000,
              });
              
              return;
            }
          }
          
          // Try to insert the login record
          const { error } = await supabase.from('user_logins').insert([
            { 
              user_id: user.id,
              user_name: user.user_metadata?.full_name || user.email,
              // Either use role from metadata or default to 'User'
              // Only add user_role if it exists in the table
              login_time: new Date().toISOString(),
            }
          ]);

          if (error) {
            console.error('Failed to record login:', error);
            
            if (error.message.includes("role")) {
              // Try again without the role field
              const { error: retryError } = await supabase.from('user_logins').insert([
                { 
                  user_id: user.id,
                  user_name: user.user_metadata?.full_name || user.email,
                  login_time: new Date().toISOString(),
                }
              ]);
              
              if (retryError) {
                toast({
                  variant: "destructive",
                  title: "Failed to record login",
                  description: retryError.message,
                  duration: 5000,
                });
              }
            } else {
              toast({
                variant: "destructive",
                title: "Failed to record login",
                description: error.message,
                duration: 5000,
              });
            }
          } else {
            console.log("Login recorded successfully");
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
