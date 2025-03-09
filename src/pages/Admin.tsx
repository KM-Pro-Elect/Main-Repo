
import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ManagePDFs } from "@/components/admin/ManagePDFs";
import { CategoryManagement } from "@/components/admin/CategoryManagement";
import { LoginTracker } from "@/components/admin/LoginTracker";
import { useLoginTracker } from "@/hooks/useLoginTracker";

const Admin = () => {
  const [activeSection, setActiveSection] = useState<string>("statistics");

  // Record the current user's login
  useLoginTracker();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AdminHeader />

      <div className="flex flex-1 pt-0">
        <AdminSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          {activeSection === "manage-pdfs" && <ManagePDFs />}
          
          {activeSection === "statistics" && (
            <>
              <h1 className="text-2xl font-bold mb-6 text-gray-800">User Login Statistics</h1>
              <LoginTracker />
            </>
          )}
          
          {activeSection === "category" && <CategoryManagement />}
        </main>
      </div>
    </div>
  );
};

export default Admin;
