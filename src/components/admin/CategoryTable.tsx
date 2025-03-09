import { useState } from "react";
import { Edit, EyeOff, FolderPlus, ShieldBan, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryDialog } from "./CategoryDialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Type definitions
export type CategoryStatus = "active" | "hidden" | "blocked";

export interface Category {
  id: string;
  name: string;
  description: string;
  status: CategoryStatus;
  policiesCount: number;
  createdAt: string;
}

// Sample data
const initialCategories: Category[] = [
  {
    id: "1",
    name: "Academic Policies",
    description: "Policies related to academic matters and procedures",
    status: "active",
    policiesCount: 12,
    createdAt: "2023-04-12T10:30:00Z",
  },
  {
    id: "2",
    name: "Administrative Policies",
    description: "Policies governing administrative functions",
    status: "active",
    policiesCount: 8,
    createdAt: "2023-04-15T14:20:00Z",
  },
  {
    id: "3",
    name: "Student Affairs",
    description: "Policies related to student life and campus activities",
    status: "hidden",
    policiesCount: 5,
    createdAt: "2023-04-18T09:15:00Z",
  },
  {
    id: "4",
    name: "Faculty Guidelines",
    description: "Guidelines and policies for faculty members",
    status: "blocked",
    policiesCount: 9,
    createdAt: "2023-04-20T11:45:00Z",
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: CategoryStatus }) => {
  const variants = {
    active: "bg-green-100 text-green-800 hover:bg-green-200",
    hidden: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    blocked: "bg-red-100 text-red-800 hover:bg-red-200",
  };

  const labels = {
    active: "Active",
    hidden: "Hidden",
    blocked: "Blocked",
  };

  return (
    <Badge className={cn("font-medium", variants[status])} variant="outline">
      {labels[status]}
    </Badge>
  );
};

export const CategoryTable = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"add" | "edit">("add");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [filterStatus, setFilterStatus] = useState<CategoryStatus | "all">("all");

  // Handlers
  const handleAdd = () => {
    setDialogAction("add");
    setSelectedCategory(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setDialogAction("edit");
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  const handleBlock = (id: string) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, status: "blocked" } : category
      )
    );
    toast({
      title: "Category Blocked",
      description: "The category has been blocked successfully.",
    });
  };

  const handleHide = (id: string) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, status: "hidden" } : category
      )
    );
    toast({
      title: "Category Hidden",
      description: "The category has been hidden successfully.",
    });
  };

  const handleRemove = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
    toast({
      title: "Category Removed",
      description: "The category has been removed successfully.",
    });
  };

  const handleSaveCategory = (category: Omit<Category, "id" | "createdAt">) => {
    if (dialogAction === "add") {
      const newCategory: Category = {
        ...category,
        id: `${categories.length + 1}`,
        policiesCount: 0,
        createdAt: new Date().toISOString(),
      };
      setCategories([...categories, newCategory]);
      toast({
        title: "Category Added",
        description: "The new category has been added successfully.",
      });
    } else if (dialogAction === "edit" && selectedCategory) {
      setCategories(
        categories.map((c) =>
          c.id === selectedCategory.id ? { ...c, ...category } : c
        )
      );
      toast({
        title: "Category Updated",
        description: "The category has been updated successfully.",
      });
    }
    setIsDialogOpen(false);
  };

  // Filter categories
  const filteredCategories =
    filterStatus === "all"
      ? categories
      : categories.filter((category) => category.status === filterStatus);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Manage and organize policy categories
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterStatus("all")}
              className={cn(
                "text-sm font-medium",
                filterStatus === "all" && "bg-secondary text-secondary-foreground"
              )}
            >
              All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterStatus("active")}
              className={cn(
                "text-sm font-medium",
                filterStatus === "active" && "bg-green-100 text-green-800"
              )}
            >
              Active
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterStatus("hidden")}
              className={cn(
                "text-sm font-medium",
                filterStatus === "hidden" && "bg-amber-100 text-amber-800"
              )}
            >
              Hidden
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterStatus("blocked")}
              className={cn(
                "text-sm font-medium",
                filterStatus === "blocked" && "bg-red-100 text-red-800"
              )}
            >
              Blocked
            </Button>
          </div>
          <Button onClick={handleAdd} className="animate-hover-lift animate-click">
            <FolderPlus size={16} className="mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-admin-border shadow-subtle overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden md:table-cell">Policies</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No categories found
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id} className="group animate-hover-lift">
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {category.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {category.policiesCount}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={category.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(category)}
                        className="h-8 w-8 p-0"
                        aria-label="Edit"
                      >
                        <Edit size={16} className="text-gray-500 hover:text-brand-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleHide(category.id)}
                        className="h-8 w-8 p-0"
                        aria-label="Hide"
                        disabled={category.status === "hidden"}
                      >
                        <EyeOff size={16} className="text-gray-500 hover:text-amber-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBlock(category.id)}
                        className="h-8 w-8 p-0"
                        aria-label="Block"
                        disabled={category.status === "blocked"}
                      >
                        <ShieldBan size={16} className="text-gray-500 hover:text-red-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(category.id)}
                        className="h-8 w-8 p-0"
                        aria-label="Remove"
                      >
                        <Trash2 size={16} className="text-gray-500 hover:text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogAction}
        initialData={selectedCategory}
        onSave={handleSaveCategory}
      />
    </div>
  );
};