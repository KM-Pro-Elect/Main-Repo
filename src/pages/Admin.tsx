
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, FileText, BarChart, Grid, Trash, Upload, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "../components/home/Header";
import { supabase } from "@/components/SupabaseClient";
import { useLoginTracker } from "@/hooks/useLoginTracker";
import { LoginTracker } from "@/components/admin/LoginTracker";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface PDF {
  id: number;
  name: string;
  file?: File;
}

const Admin = () => {
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeSection, setActiveSection] = useState<string>("manage-pdfs");

  // Record the current user's login
  useLoginTracker();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newPdf = {
        id: pdfs.length > 0 ? Math.max(...pdfs.map((pdf) => pdf.id)) + 1 : 1,
        name: selectedFile.name,
        file: selectedFile,
      };
      setPdfs([...pdfs, newPdf]);
      setSelectedFile(null);
      const fileInput = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  const handleEdit = (id: number) => {
    console.log(`Edit PDF with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    setPdfs(pdfs.filter((pdf) => pdf.id !== id));
  };

  const renderContent = () => {
    switch (activeSection) {
      case "manage-pdfs":
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">Admin - Manage PDFs</h1>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <Input id="file-upload" type="file" accept=".pdf" onChange={handleFileChange} className="max-w-md" />
                  <Button onClick={handleUpload} disabled={!selectedFile} className="bg-teal-500 hover:bg-teal-600">
                    <Upload className="mr-2 h-4 w-4" /> Upload New PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left">ID</th>
                    <th className="border px-4 py-2 text-left">PDF Name</th>
                    <th className="border px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pdfs.map((pdf) => (
                    <tr key={pdf.id}>
                      <td className="border px-4 py-2">{pdf.id}</td>
                      <td className="border px-4 py-2">{pdf.name}</td>
                      <td className="border px-4 py-2">
                        <div className="flex gap-2">
                          <Button onClick={() => handleEdit(pdf.id)} className="bg-blue-500 hover:bg-blue-600">
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button onClick={() => handleDelete(pdf.id)} variant="destructive">
                            <Trash className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      case "statistics":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Admin - User Login Statistics</h1>
            <LoginTracker />
          </div>
        );
      case "category":
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6">Category Management</h1>
            <p className="text-gray-600">Category management content will appear here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <SidebarProvider>
        <div className="flex w-full flex-grow">
          <Sidebar>
            <SidebarHeader className="text-lg font-semibold px-2 py-4">
              Admin Panel
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveSection("manage-pdfs")}
                    isActive={activeSection === "manage-pdfs"}
                    tooltip="Manage PDFs"
                  >
                    <FileText className="mr-2" />
                    <span>Manage PDFs</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveSection("statistics")}
                    isActive={activeSection === "statistics"}
                    tooltip="Statistics"
                  >
                    <BarChart className="mr-2" />
                    <span>Login Statistics</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveSection("category")}
                    isActive={activeSection === "category"}
                    tooltip="Category"
                  >
                    <Grid className="mr-2" />
                    <span>Category</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <div className="flex-grow p-6">
            <div className="mb-4 flex justify-between items-center">
              <SidebarTrigger className="md:hidden" />
            </div>
            {renderContent()}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Admin;