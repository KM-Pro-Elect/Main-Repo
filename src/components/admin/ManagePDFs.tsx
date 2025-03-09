
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Trash, Upload } from "lucide-react";

interface PDF {
  id: number;
  name: string;
  file?: File;
}

export const ManagePDFs = () => {
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin - Manage PDFs</h1>
      <Card className="mb-6 border shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Choose File</span>
              <Input 
                id="file-upload" 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange} 
                className="max-w-96 border-gray-300"
              />
            </div>
            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile} 
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload New PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white border rounded-md shadow-sm">
        <div className="grid grid-cols-3 p-4 bg-gray-50 border-b">
          <div className="font-medium">ID</div>
          <div className="font-medium">PDF Name</div>
          <div className="font-medium">Actions</div>
        </div>
        {pdfs.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No PDFs uploaded yet.
          </div>
        ) : (
          pdfs.map((pdf) => (
            <div key={pdf.id} className="grid grid-cols-3 p-4 border-b last:border-b-0">
              <div>{pdf.id}</div>
              <div>{pdf.name}</div>
              <div className="flex gap-2">
                <Button onClick={() => handleEdit(pdf.id)} variant="outline" size="sm" className="h-8">
                  <FileText className="h-3.5 w-3.5 mr-1 text-blue-500" /> View
                </Button>
                <Button onClick={() => handleDelete(pdf.id)} variant="outline" size="sm" className="h-8">
                  <Trash className="h-3.5 w-3.5 mr-1 text-red-500" /> Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
