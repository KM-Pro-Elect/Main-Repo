
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
import { Eye, Mail, Pencil, Trash, User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface UserRecord {
  id: string;
  user_id: string;
  email: string;
  action: string;
  details: string | null;
  created_at: string;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    action: "",
    details: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log("Fetching users...");
      
      // Try to get data from user_management table
      const { data, error } = await supabase
        .from('user_management')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // If table doesn't exist, try to create it
        if (error.code === "42P01") {
          console.log("Table doesn't exist, creating it...");
          await createUserManagementTable();
          toast({
            title: "User Management Table Created",
            description: "The user management table has been created successfully.",
          });
          setUsers([]);
        } else {
          console.error('Error fetching users:', error);
          toast({
            variant: "destructive",
            title: "Failed to fetch users",
            description: error.message,
          });
        }
      } else {
        console.log("Users fetched:", data);
        setUsers(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Failed to fetch users",
        description: "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const createUserManagementTable = async () => {
    try {
      // Create the table using SQL
      const { error } = await supabase.rpc('create_user_management_table');
      
      if (error) {
        console.error('Error creating table:', error);
        toast({
          variant: "destructive",
          title: "Failed to create user management table",
          description: error.message,
        });
        
        // Show toast with instructions for manually creating the table
        toast({
          variant: "destructive",
          title: "Database setup required",
          description: "Please create a user_management table in Supabase with columns: id, user_id, email, action, details, created_at",
          duration: 10000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditUser = (user: UserRecord) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      action: user.action,
      details: user.details || ""
    });
    setIsDialogOpen(true);
  };

  const handleViewUser = (user: UserRecord) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleDeleteUser = (user: UserRecord) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    
    try {
      const { error } = await supabase
        .from('user_management')
        .delete()
        .eq('id', selectedUser.id);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Failed to delete user",
          description: error.message,
        });
      } else {
        toast({
          title: "User deleted",
          description: "The user has been deleted successfully.",
        });
        
        // Refresh the user list
        fetchUsers();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Failed to delete user",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    
    try {
      const { error } = await supabase
        .from('user_management')
        .update({
          email: formData.email,
          action: formData.action,
          details: formData.details
        })
        .eq('id', selectedUser.id);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Failed to update user",
          description: error.message,
        });
      } else {
        toast({
          title: "User updated",
          description: "The user has been updated successfully.",
        });
        
        // Refresh the user list
        fetchUsers();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Failed to update user",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsDialogOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="bg-white pb-3">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <User className="h-5 w-5 text-gray-600" />
          User Management
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
              {users.length === 0
                ? "No users found. Users will appear here when they sign in."
                : "A list of all registered users."}
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-medium w-1/4">ID</TableHead>
                <TableHead className="font-medium w-1/4">User ID</TableHead>
                <TableHead className="font-medium w-1/4">Action</TableHead>
                <TableHead className="font-medium w-1/4">Details</TableHead>
                <TableHead className="font-medium w-1/4">Created At</TableHead>
                <TableHead className="font-medium w-1/4">Email</TableHead>
                <TableHead className="font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No users found. Users will appear here when they sign in.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50 border-b">
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.user_id}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {user.action}
                      </span>
                    </TableCell>
                    <TableCell>{user.details || "-"}</TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-gray-500" />
                        <span>{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewUser(user)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to the user information here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="action" className="text-right">
                Action
              </Label>
              <Select
                value={formData.action}
                onValueChange={(value) => setFormData({ ...formData, action: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="register">Register</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="details" className="text-right">
                Details
              </Label>
              <Input
                id="details"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about the user.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedUser && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">ID:</Label>
                  <div className="col-span-3">{selectedUser.id}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">User ID:</Label>
                  <div className="col-span-3">{selectedUser.user_id}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Email:</Label>
                  <div className="col-span-3">{selectedUser.email}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Action:</Label>
                  <div className="col-span-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {selectedUser.action}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Details:</Label>
                  <div className="col-span-3">{selectedUser.details || "-"}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium">Created At:</Label>
                  <div className="col-span-3">{formatDate(selectedUser.created_at)}</div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
