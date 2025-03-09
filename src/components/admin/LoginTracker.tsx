
import React, { useEffect, useState } from "react";
import { supabase } from "@/components/SupabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, Users } from "lucide-react";

interface LoginRecord {
  id: string;
  user_id: string;
  user_name: string;
  user_role?: string;
  login_time: string;
}

export const LoginTracker = () => {
  const [loginRecords, setLoginRecords] = useState<LoginRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLoginRecords = async () => {
      try {
        console.log("Fetching login records...");
        const { data, error } = await supabase
          .from('user_logins')
          .select('*')
          .order('login_time', { ascending: false });

        if (error) {
          console.error('Error fetching login records:', error);
          toast({
            variant: "destructive",
            title: "Failed to fetch login records",
            description: error.message,
          });
        } else {
          console.log("Login records fetched:", data);
          setLoginRecords(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          variant: "destructive",
          title: "Failed to fetch login records",
          description: "An unexpected error occurred",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLoginRecords();
  }, [toast]);

  // Format date for better readability
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Format time for better readability
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="bg-white pb-3">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-600" />
          User Login Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <Table>
            <TableCaption>
              {loginRecords.length === 0
                ? "No login records found."
                : "A list of recent user login activities."}
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-medium">Name</TableHead>
                {/* Only show Role column if user_role exists in any record */}
                {loginRecords.some(record => record.user_role) && (
                  <TableHead className="font-medium">Role</TableHead>
                )}
                <TableHead className="font-medium">Login Date</TableHead>
                <TableHead className="font-medium">Login Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No login records found.
                  </TableCell>
                </TableRow>
              ) : (
                loginRecords.map((record) => (
                  <TableRow key={record.id} className="hover:bg-gray-50 border-b">
                    <TableCell className="font-medium">{record.user_name}</TableCell>
                    {/* Only show Role cell if user_role exists in any record */}
                    {loginRecords.some(r => r.user_role) && (
                      <TableCell>
                        {record.user_role && (
                          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                            {record.user_role}
                          </span>
                        )}
                      </TableCell>
                    )}
                    <TableCell className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      <span>{formatDate(record.login_time)}</span>
                    </TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span>{formatTime(record.login_time)}</span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
