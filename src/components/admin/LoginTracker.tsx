
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

interface LoginRecord {
  id: string;
  user_name: string;
  user_role: string;
  login_time: string;
}

export const LoginTracker = () => {
  const [loginRecords, setLoginRecords] = useState<LoginRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLoginRecords = async () => {
      try {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Login Activity</CardTitle>
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
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Login Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loginRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No login records found.
                  </TableCell>
                </TableRow>
              ) : (
                loginRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.user_name}</TableCell>
                    <TableCell>{record.user_role}</TableCell>
                    <TableCell>
                      {new Date(record.login_time).toLocaleString()}
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