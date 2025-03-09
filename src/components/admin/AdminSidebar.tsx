
import React from "react";
import { FileText, BarChart, Grid } from "lucide-react";

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const AdminSidebar = ({ activeSection, setActiveSection }: AdminSidebarProps) => {
  return (
    <aside className="w-56 bg-gray-50 border-r border-gray-200 h-[calc(100vh-4rem)]">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Admin Panel</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setActiveSection("manage-pdfs")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                activeSection === "manage-pdfs" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Manage PDFs</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("statistics")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                activeSection === "statistics" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <BarChart className="h-5 w-5" />
              <span>Login Activity</span>
            </button>
          </li>
          <li>
          <button
            onClick={() => setActiveSection("category")} // Ensure this is correct
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
              activeSection === "category" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Grid className="h-5 w-5" />
            <span>Category</span>
          </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
