
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid } from "lucide-react";

export const CategoryManagement = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Category Management</h1>
      <Card className="border shadow-sm">
        <CardHeader className="bg-white pb-3">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Grid className="h-5 w-5 text-gray-600" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Category management content will appear here.</p>
        </CardContent>
      </Card>
    </>
  );
};
