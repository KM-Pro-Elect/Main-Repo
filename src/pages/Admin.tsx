
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash, Upload } from "lucide-react";
import { Link } from "react-router-dom";

interface PDF {
  id: number;
  name: string;
  file?: File;
}

const Admin = () => {
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newPdf = {
        id: pdfs.length > 0 ? Math.max(...pdfs.map(pdf => pdf.id)) + 1 : 1,
        name: selectedFile.name,
        file: selectedFile
      };
      setPdfs([...pdfs, newPdf]);
      setSelectedFile(null);
      // Reset the file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  const handleEdit = (id: number) => {
    // In a real app, this would open a modal or navigate to an edit page
    console.log(`Edit PDF with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    setPdfs(pdfs.filter(pdf => pdf.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header similar to Home UI */}
      <header className="w-full bg-white border-b border-gray-200 py-4 px-5">
        <div className="max-w-[1374px] mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-5">
            <div className="flex items-center gap-5">
              {/* NEU Logo with Redirect */}
              <a href="https://neuvle.neu.edu.ph/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/a15453eaca75974dc02d292e7448c7126333252cba35c6000812ad07e30db737?placeholderIfAbsent=true"
                  alt="NEUPoliSeek Logo"
                  className="aspect-[1] object-contain w-[101px] shrink-0"
                />
              </a>

              <div className="flex items-center gap-5 ml-10">
                <Link to="/home" className="text-black text-[22px] font-semibold hover:text-yellow-500 transition-colors duration-200">
                  Home
                </Link>
                <button className="text-black text-[22px] font-semibold hover:text-yellow-500 transition-colors duration-200">
                  About Us
                </button>
                <button className="text-black text-[22px] font-semibold hover:text-yellow-500 transition-colors duration-200">
                  Contact
                </button>
              </div>
            </div>
          </nav>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 relative">
              <button onClick={toggleDropdown}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/f559f5b5469f122ba5ac3cc86b241e2d5ee59aacf2762f8f04be06dedbc42300?placeholderIfAbsent=true"
                  alt="Profile Picture"
                  className="aspect-[1.05] object-contain w-20 shrink-0"
                />
              </button>

              {/* Dropdown Arrow */}
              <button onClick={toggleDropdown}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/e3c6b0ec50df45b58e99e24af78e19b0/a173d29bb6ba64cd7034e49a4aa0e670371f0ca6d331a87a20afdb8ab45c065c?placeholderIfAbsent=true"
                  alt="Menu"
                  className="aspect-[1] object-contain w-[50px] shrink-0"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <Link 
                    to="/"
                    className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100 border border-black rounded-lg transition-colors duration-200 font-semibold"
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Admin - Manage PDFs</h1>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="max-w-md"
              />
              <Button 
                onClick={handleUpload} 
                disabled={!selectedFile}
                className="bg-teal-500 hover:bg-teal-600"
              >
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
                      <Button 
                        onClick={() => handleEdit(pdf.id)} 
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button 
                        onClick={() => handleDelete(pdf.id)} 
                        variant="destructive"
                      >
                        <Trash className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
