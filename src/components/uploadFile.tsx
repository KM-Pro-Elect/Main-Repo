import React, { useState } from "react";
import { supabase } from "../components/SupabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const BUCKET_NAME = "NEUPoliSeek"; // Change this to your bucket name

export const UploadFile: React.FC = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a file to upload.",
      });
      return;
    }

    setIsUploading(true);
    const filePath = `uploads/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file);

    if (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message,
      });
    } else {
      toast({
        title: "Upload Successful!",
        description: "Your file has been uploaded.",
      });

      // Get the public URL
      const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
      setPreviewUrl(data.publicUrl);
    }

    setIsUploading(false);
  };

  return (
    <div className="p-4 space-y-4">
      <Input type="file" onChange={handleFileChange} accept="image/*" />
      {previewUrl && <img src={previewUrl} alt="Preview" className="max-w-full h-auto" />}
      <Button onClick={handleUpload} disabled={isUploading} className="w-full">
        {isUploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};
