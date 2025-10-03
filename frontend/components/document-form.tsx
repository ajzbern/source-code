"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/lib/server-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ArrowLeft, Save, FileText } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import RichTextEditor from "./rich-text-editor";

interface DocumentFormProps {
  projectId: string;
  initialData?: any;
  isEditing?: boolean;
}

export default function DocumentForm({
  projectId,
  initialData,
  isEditing = false,
}: DocumentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    status: initialData?.status || "CREATED",
    body: initialData?.body || initialData?.docBody || "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorSave = (content: string) => {
    setFormData((prev) => ({ ...prev, body: content }));
    toast({
      title: "Content saved",
      description: "Your document content has been saved to the form.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing
        ? `${API_URL}/documents/${initialData.id}`
        : `${API_URL}/documents`;

      const method = isEditing ? "PUT" : "POST";

      const payload: {
        [key: string]: any;
        projectId: string;
        ownerId: string | null;
        updatedAt: string;
      } = {
        ...formData,
        projectId,
        ownerId: localStorage.getItem("adminId"),
        updatedAt: new Date().toISOString(),
      };

      if (!isEditing) {
        payload.createdAt = new Date().toISOString();
        payload.createdBy = localStorage.getItem("adminName") || "Unknown";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "x-api-key": "thisisasdca",
          "Content-Type": "application/json",
          Authorization: `Authorization ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save document");

      const data = await res.json();

      toast({
        title: isEditing ? "Document updated" : "Document created",
        description: isEditing
          ? "Your document has been updated successfully."
          : "Your document has been created successfully.",
      });

      // Redirect to the document view page
      router.push(`/documents/${data.data.id}`);
    } catch (err) {
      console.error("Error saving document:", err);
      toast({
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to save document",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background">
      <div className="mx-auto max-w-6xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCancel}
          className="mb-6 hover:bg-muted flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="border shadow-md">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {isEditing ? "Edit Document" : "Create New Document"}
            </CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Document Title</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter document title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CREATED">Created</SelectItem>
                      <SelectItem value="REVIEW">Review</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter a brief description of the document"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Document Content</Label>
                <RichTextEditor
                  initialContent={formData.body}
                  onSave={handleEditorSave}
                  placeholder="Start writing your document content here..."
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {isEditing ? "Update Document" : "Create Document"}
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
