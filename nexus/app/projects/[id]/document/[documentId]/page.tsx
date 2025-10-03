"use client";

import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  Save,
  Database,
  Workflow,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { exportToDocx } from "@/components/docx-export";
import MermaidToImage from "@/components/mermaid-to-image";
import { API_URL } from "@/app/lib/server_config";
import { formatISODate } from "@/app/lib/date_helpers";

interface DocumentData {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    description: string;
    status: string;
    body: string | null;
    docBody?: string;
    erDiagram?: string;
    useCaseDiagram?: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    views: number;
    project: {
      id: string;
      name: string;
      description: string;
      projectType: string;
      complexity: string;
      completionStatus: string;
      ownerId: string;
    };
  };
}

interface Section {
  section: string;
  content: Array<{
    subsection?: string;
    content?:
      | string
      | Array<{
          subsubsection?: string;
          content: string;
        }>;
  }>;
}

export default function ViewDocument({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [parsedDocBody, setParsedDocBody] = useState<Section[]>([]);
  const [activeTab, setActiveTab] = useState("content");
 

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const res = await fetch(
          `${API_URL}/documents/employees/${resolvedParams.documentId}`,
          {
            method: "GET",
            headers: {
              "x-api-key": "thisisasdca",
              "Content-Type": "application/json",
              Authorization: `Authorization ${localStorage.getItem(
                "authToken"
              )}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch document");

        const data = await res.json();
        setDocument(data);

        // Parse docBody if it exists
        if (data.data.docBody) {
          try {
            const parsedBody = JSON.parse(data.data.docBody);
            setParsedDocBody(parsedBody);
          } catch (e) {
            console.error("Failed to parse document body:", e);
          }
        }

        // Set edited body from body or docBody
        setEditedBody(data.data.body || data.data.docBody || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, [resolvedParams.documentId]);

  const getStatusVariant = (
    status: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "APPROVED":
        return "default";
      case "REVIEW":
      case "CREATED":
        return "secondary";
      case "REJECTED":
        return "destructive";
      case "ARCHIVED":
        return "outline";
      case "DRAFT":
      default:
        return "secondary";
    }
  };

  const handleBack = () => {
    router.back();
  };

  const toggleEdit = () => {
    if (!document?.data) return;
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditedBody(document.data.body || document.data.docBody || "");
      setHasChanges(false);
    }
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!document?.data) return;
    setEditedBody(e.target.value);
    setHasChanges(
      e.target.value !== (document.data.body || document.data.docBody || "")
    );
  };

  const handleSave = async () => {
    if (!hasChanges || !document?.data) return;

    try {
      const res = await fetch(
        `${API_URL}/documents/employees/${resolvedParams.documentId}`,
        {
          method: "PUT",
          headers: {
            "x-api-key": "thisisasdca",
            "Content-Type": "application/json",
            Authorization: `Authorization ${localStorage.getItem(
              "accessToken"
            )}`,
          },
          body: JSON.stringify({
            name: document.data.name,
            description: document.data.description,
            projectId: document.data.project.id,
            body: editedBody,
            status: document.data.status,
            updatedAt: new Date().toISOString(),
            ownerId: localStorage.getItem("adminId"),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to save document");

      const updatedData = await res.json();
      setDocument(updatedData);
      setIsEditing(false);
      setHasChanges(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes");
        window.location.href = "/login";
    }
  };

  const handleDownloadDocx = async () => {
    if (!document?.data) return;

    try {
      // Export to DOCX
      const success = await exportToDocx(
        document.data,
        parsedDocBody,
        formatISODate
      );

      if (!success) {
        setError("Failed to generate document. Please try again.");
      }
    } catch (err) {
      console.error("Error generating DOCX:", err);
      setError("Failed to generate document. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !document?.success) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Card className="border-destructive/20">
          <CardContent className="pt-6">
            <p className="text-destructive">
              {error || document?.message || "Failed to load document"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const docData = document.data;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="hover:bg-muted flex items-center transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Documents
          </Button>
          {/* Uncomment if you want to enable the Edit button */}
          {/* <Button
            variant="outline"
            size="sm"
            onClick={toggleEdit}
            className="gap-2 transition-colors duration-200"
          >
            <PenLine className="h-4 w-4" />
            {isEditing ? "Cancel" : "Edit Document"}
          </Button> */}
        </div>

        <Card className="overflow-hidden border shadow-md bg-card transition-all duration-200 hover:shadow-lg mb-6">
          <CardHeader className="pb-4 bg-card border-b">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-primary/10 p-2.5">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-semibold leading-tight">
                    {docData.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {docData.description}
                  </p>
                </div>
              </div>
              <Badge
                variant={getStatusVariant(docData.status)}
                className="text-xs font-medium px-2.5 py-1"
              >
                {docData.status.charAt(0) +
                  docData.status.slice(1).toLowerCase()}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 pt-6">
            {/* Project Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2">
                Project Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/50 p-5 rounded-lg">
                {[
                  { label: "Project Name", value: docData.project.name || "" },
                  { label: "Description", value: docData.project.description },
                  {
                    label: "Type",
                    value: docData.project.projectType,
                    capitalize: true,
                  },
                  {
                    label: "Complexity",
                    value: docData.project.complexity,
                    capitalize: true,
                  },
                  {
                    label: "Status",
                    value: docData.project.completionStatus,
                    capitalize: true,
                    format: (value: string) => value.replace(/_/g, " "),
                  },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium">
                      {item.format
                        ? item.format(item.value)
                        : item.capitalize
                        ? item.value.charAt(0).toUpperCase() +
                          item.value.slice(1).toLowerCase()
                        : item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Content Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger
                  value="content"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="er-diagram"
                  className="flex items-center gap-2"
                >
                  <Database className="h-4 w-4" />
                  ER Diagram
                </TabsTrigger>
                <TabsTrigger
                  value="use-case"
                  className="flex items-center gap-2"
                >
                  <Workflow className="h-4 w-4" />
                  Use Case
                </TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h2 className="text-lg font-semibold">Document Content</h2>
                  {isEditing && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleSave}
                      disabled={!hasChanges}
                      className="gap-2 transition-colors duration-200"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <Textarea
                    value={editedBody}
                    onChange={handleBodyChange}
                    className="min-h-[400px] w-full p-4 font-mono text-sm rounded-lg border border-muted focus:ring-2 focus:ring-primary transition-all duration-200"
                    placeholder="Edit your Markdown content here..."
                  />
                ) : parsedDocBody.length > 0 ? (
                  <div className="space-y-6">
                    <Accordion type="multiple" className="w-full">
                      {parsedDocBody.map((section, index) => (
                        <AccordionItem
                          key={index}
                          value={`section-${index}`}
                          className="border rounded-lg px-4 py-2 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <AccordionTrigger className="text-xl font-bold hover:no-underline">
                            {section.section}
                          </AccordionTrigger>
                          <AccordionContent className="pt-4">
                            {section.content.map((subsectionData, subIndex) => (
                              <div key={subIndex} className="mb-6">
                                {subsectionData.subsection && (
                                  <h3 className="text-lg font-semibold mb-3 text-primary-700 border-b pb-1">
                                    {subsectionData.subsection}
                                  </h3>
                                )}

                                {typeof subsectionData.content === "string" ? (
                                  <div className="prose prose-sm max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                      {subsectionData.content}
                                    </ReactMarkdown>
                                  </div>
                                ) : (
                                  Array.isArray(subsectionData.content) && (
                                    <div className="space-y-4 pl-4">
                                      {subsectionData.content.map(
                                        (subsubsection, ssIndex) => (
                                          <div key={ssIndex} className="mb-4">
                                            {subsubsection.subsubsection && (
                                              <h4 className="text-md font-medium mb-2 text-primary-600">
                                                {subsubsection.subsubsection}
                                              </h4>
                                            )}
                                            <div className="prose prose-sm max-w-none pl-2">
                                              <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                              >
                                                {subsubsection.content + "\n"}
                                              </ReactMarkdown>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none p-6 rounded-lg shadow-sm border border-muted">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1
                            className="text-2xl font-bold mt-6 mb-4 text-foreground dark:text-white"
                            {...props}
                          />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2
                            className="text-xl font-semibold mt-5 mb-3 text-foreground dark:text-white"
                            {...props}
                          />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="text-lg font-medium mt-4 mb-2 text-foreground dark:text-white"
                            {...props}
                          />
                        ),
                        p: ({ node, ...props }) => (
                          <p
                            className="mb-4 text-muted-foreground dark:text-gray-300"
                            {...props}
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc list-inside mb-4 text-muted-foreground dark:text-gray-300"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="list-decimal list-inside mb-4 text-muted-foreground dark:text-gray-300"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li
                            className="ml-4 text-muted-foreground dark:text-gray-300"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {docData.body || "No content available"}
                    </ReactMarkdown>
                  </div>
                )}
              </TabsContent>

              {/* ER Diagram Tab */}
              <TabsContent value="er-diagram" className="space-y-4">
                <div className="border-b pb-2">
                  <h2 className="text-lg font-semibold">
                    Entity Relationship Diagram
                  </h2>
                </div>
                <div className="p-6 rounded-lg shadow-sm border border-muted bg-white overflow-auto">
                  {docData.erDiagram ? (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Entity Relationship Diagram
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-2 sm:p-6">
                        <div className="bg-white rounded-md overflow-auto border p-4">
                          <MermaidToImage
                            chart={docData.erDiagram}
                            backgroundColor="#ffffff"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No ER diagram available
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* Use Case Diagram Tab */}
              <TabsContent value="use-case" className="space-y-4">
                <div className="border-b pb-2">
                  <h2 className="text-lg font-semibold">Use Case Diagram</h2>
                </div>
                <div className="p-6 rounded-lg shadow-sm border border-muted bg-white overflow-auto">
                  {docData.useCaseDiagram ? (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Use Case Diagram
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-2 sm:p-6">
                        <div className="bg-white rounded-md overflow-auto border p-4">
                          <MermaidToImage
                            chart={docData.useCaseDiagram}
                            backgroundColor="#ffffff"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No use case diagram available
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-6 border-t pt-4 pb-6 text-sm text-muted-foreground bg-muted/20">
            {[
              { icon: User, text: `Created by: ${docData.createdBy}` },
              {
                icon: Calendar,
                text: `Created: ${formatISODate(docData.createdAt)}`,
              },
              {
                icon: Clock,
                text: `Last Updated: ${formatISODate(docData.updatedAt)}`,
              },
              { icon: Eye, text: `${docData.views} views` },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                <span>{item.text}</span>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadDocx}
              className="ml-auto flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Download DOCX
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
