import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Category, CategoryStatus } from "./CategoryTable";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  initialData: Category | null;
  onSave: (category: Omit<Category, "id" | "createdAt">) => void;
}

export const CategoryDialog = ({
  open,
  onOpenChange,
  mode,
  initialData,
  onSave,
}: CategoryDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<CategoryStatus>("active");
  const [policiesCount, setPoliciesCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setStatus(initialData.status);
      setPoliciesCount(initialData.policiesCount);
    } else {
      setName("");
      setDescription("");
      setStatus("active");
      setPoliciesCount(0);
    }
  }, [mode, initialData, open]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Category name is required";
    if (!description.trim()) newErrors.description = "Category description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onSave({ name, description, status, policiesCount });
      setIsSubmitting(false);
    }, 500); // Simulate network delay
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === "add" ? "Add New Category" : "Edit Category"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Create a new category for organizing policies."
              : "Make changes to the selected category."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className={errors.name ? "text-destructive" : ""}>
              Category Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-destructive" : ""}
              placeholder="Enter category name"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className={errors.description ? "text-destructive" : ""}>
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? "border-destructive" : ""}
              placeholder="Enter category description"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>
          {mode === "edit" && (
            <div className="space-y-3">
              <Label>Status</Label>
              <RadioGroup
                value={status}
                onValueChange={(value) => setStatus(value as CategoryStatus)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="cursor-pointer">
                    Active
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hidden" id="hidden" />
                  <Label htmlFor="hidden" className="cursor-pointer">
                    Hidden
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="blocked" id="blocked" />
                  <Label htmlFor="blocked" className="cursor-pointer">
                    Blocked
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="animate-hover-lift animate-click"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="animate-hover-lift animate-click"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              <>{mode === "add" ? "Add Category" : "Save Changes"}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};