"use client";

import { useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Task, TaskStatus } from "@/types/task";
import { AlertCircle, Calendar, Clock, Send, Tag, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the Comment interface to match the main code
interface Comment {
  id: string;
  user: { name: string; avatar?: string; initials: string };
  text: string;
  timestamp: string;
}

interface TaskDetailSidebarProps {
  task: Task;
  onClose: () => void;
  onAddComment: (content: string) => void;
  onStatusChange: (newStatus: TaskStatus) => void;
}

export function TaskDetailSidebar({
  task,
  onClose,
  onAddComment,
  onStatusChange,
}: TaskDetailSidebarProps) {
  const [comment, setComment] = useState("");

  const handleSubmitComment = () => {
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  const statusOptions = [
    { value: "todo", label: "To Do" },
    { value: "in_progress", label: "In Progress" },
    { value: "review", label: "In Review" },
    { value: "done", label: "Done" },
  ];

  const isPastDue = new Date(task.due) < new Date() && task.status !== "DONE";

  // Get the first assigned employee (or a default value if none)
  const assignedEmployee = task.assignedEmployees[0]?.name || "Unassigned";

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto p-0">
        <div
          className={cn(
            "h-1.5",
            task.priority === "High"
              ? "bg-red-500"
              : task.priority === "Medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          )}
        />

        <div className="p-6">
          <SheetHeader className="text-left mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            <SheetTitle className="text-xl font-semibold">
              {task.name}
            </SheetTitle>
            <p className="text-muted-foreground mt-2">{task.description}</p>
          </SheetHeader>

          <div className="space-y-6">
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {task.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs px-2 py-0"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-medium mb-1.5 text-muted-foreground">
                  Status
                </h4>
                <Select
                  value={task.status.toLowerCase()}
                  onValueChange={(value) => onStatusChange(value as TaskStatus)}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h4 className="text-xs font-medium mb-1.5 text-muted-foreground">
                  Assigned To
                </h4>
                <div className="flex items-center gap-2 h-8 px-3 border rounded-md">
                  <Avatar className="h-4 w-4">
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt={assignedEmployee}
                    />
                    <AvatarFallback>
                      {assignedEmployee
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{assignedEmployee}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-medium mb-1.5 text-muted-foreground">
                  Due Date
                </h4>
                <div className="flex items-center gap-2 text-xs h-8 px-3 border rounded-md">
                  {isPastDue ? (
                    <>
                      <AlertCircle className="h-3 w-3 text-destructive" />
                      <span className="text-destructive">
                        Overdue ({format(new Date(task.due), "MMM d")})
                      </span>
                    </>
                  ) : (
                    <>
                      <Calendar className="h-3 w-3" />
                      <span>{format(new Date(task.due), "MMM d, yyyy")}</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-medium mb-1.5 text-muted-foreground">
                  Created
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground h-8 px-3 border rounded-md">
                  <Clock className="h-3 w-3" />
                  <span>
                    {formatDistanceToNow(new Date(task.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-xs font-medium mb-3 text-muted-foreground">
                Comments
              </h4>
              <div className="space-y-4">
                {!task.comments || task.comments.length === 0 ? (
                  <div className="flex items-center justify-center h-16 border border-dashed rounded-md">
                    <p className="text-xs text-muted-foreground">
                      No comments yet
                    </p>
                  </div>
                ) : (
                  task.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex gap-2 animate-fade-in"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={comment.user.avatar || "/placeholder-user.jpg"}
                          alt={comment.user.name}
                        />
                        <AvatarFallback>
                          {comment.user.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-medium">
                            {comment.user.name}
                          </h5>
                          <span className="text-[10px] text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.timestamp), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <p className="text-xs mt-1">{comment.text}</p>
                      </div>
                    </div>
                  ))
                )}

                <div className="flex gap-2 mt-4">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-user.jpg" alt="You" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[60px] resize-none text-xs"
                    />
                    <Button
                      size="sm"
                      className="mt-2 h-7 text-xs"
                      onClick={handleSubmitComment}
                      disabled={!comment.trim()}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
