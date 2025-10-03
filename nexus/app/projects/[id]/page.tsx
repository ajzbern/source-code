"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Star,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { apiRequest } from "@/app/lib/server_config";

// TypeScript Interfaces
interface Employee {
  id: string;
  name: string;
  email: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  skills: string[];
  status: string;
  department: string;
  employerId: string;
  location: string;
}

interface Document {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  ownerId: string;
  name: string;
  views: number;
  description: string;
  status: string;
  body: string;
  projectId: string;
}

interface Comment {
  id: string;
  user: { name: string; avatar?: string; initials: string };
  text: string;
  createdAt: string;
  commentorId: string;
}

interface AssignedEmployee {
  id: string;
  name: string;
}

interface Task {
  id: string;
  createdAt: string;
  updatedAt: string;
  due: string;
  name: string;
  description: string;
  tag: string;
  status: "ASSIGNED" | "IN_PROGRESS" | "DONE";
  priority: "High" | "Medium" | "Low";
  projectId: string;
  ownerId: string;
  comments?: Comment[];
  assignedEmployees: AssignedEmployee[];
  title?: string;
  uiStatus?: "todo" | "in-progress" | "completed";
}

interface Project {
  id: string;
  name: string;
  description: string;
  completionStatus: "NOT_STARTED" | "IN_PROGRESS" | "DONE";
  complexity: string;
  projectType: string;
  createdAt: string;
  updatedAt: string;
  timeEstimate: number;
  ownerId: string;
  employeesWorkingOn: Employee[];
  documents: Document[];
  tasks: Task[];
  starred?: boolean;
}

// Helper Functions
function stringToDate(dateString: string): Date {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  return date;
}

function calculateProjectDueDate(
  createdAt: string,
  timeEstimate: number
): { dueDate: Date; formatted: string } {
  const startDate = stringToDate(createdAt);
  const hoursInMilliseconds = timeEstimate * 60 * 60 * 1000;
  const dueDate = new Date(startDate.getTime() + hoursInMilliseconds);
  const formatted = dueDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return { dueDate, formatted };
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
);

const ProjectPageSkeleton = () => (
  <div className="flex min-h-screen flex-col">
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <Skeleton className="h-8 w-32" />
        <div className="ml-auto flex items-center space-x-4">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </header>
    <main className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center">
        <Skeleton className="h-8 w-8 rounded-full mr-2" />
        <div className="flex-1">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-2 w-full mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Tabs defaultValue="tasks">
        <TabsList>
          {[...Array(3)].map((_, index) => (
            <TabsTrigger key={index} value={`tab-${index}`}>
              <Skeleton className="h-4 w-16" />
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="tasks" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[...Array(3)].map((_, colIndex) => (
              <div key={colIndex} className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <div className="space-y-2 min-h-[200px]">
                  {[...Array(3)].map((_, taskIndex) => (
                    <Card key={taskIndex}>
                      <CardHeader className="p-3 pb-0">
                        <Skeleton className="h-4 w-32" />
                      </CardHeader>
                      <CardContent className="p-3 pt-2">
                        <Skeleton className="h-3 w-full mb-2" />
                        <Skeleton className="h-3 w-3/4 mb-3" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Skeleton className="h-6 w-6 rounded-full mr-1" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                          <Skeleton className="h-3 w-8" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  </div>
);

// Main Component
export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [tasks, setTasks] = useState<{
    todo: Task[];
    "in-progress": Task[];
    completed: Task[];
  }>({
    todo: [],
    "in-progress": [],
    completed: [],
  });
  const [newComment, setNewComment] = useState("");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const commentsRef = useRef<HTMLDivElement>(null); // Added ref for comments

  const isTaskAssignedToCurrentEmployee = (task: Task): boolean => {
    return task.assignedEmployees.some(
      (emp) => emp.id === localStorage.getItem("employeeId")
    );
  };

  const updateTaskToInProgress = async (task: Task): Promise<void> => {
    const isAssigned = isTaskAssignedToCurrentEmployee(task);
    if (!isAssigned) {
      toast.error("You are not assigned to this task and cannot update it.");
      return;
    }
    try {
      const response = await apiRequest(`/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: task.name,
          description: task.description,
          tag: task.tag,
          priority: task.priority.toLowerCase(),
          ownerId: task.ownerId,
          status: "IN_PROGRESS",
        }),
      });
      if (!response.success) {
        throw new Error(
          response.message || "Failed to update task to In Progress"
        );
      }
    } catch (err) {
      localStorage.removeItem("employeeId");
      localStorage.removeItem("authToken");
      router.push("/login");
      throw err instanceof Error ? err : new Error("An error occurred");
    }
  };

  const updateTaskToCompleted = async (task: Task): Promise<void> => {
    const isAssigned = isTaskAssignedToCurrentEmployee(task);
    if (!isAssigned) {
      toast.error("You are not assigned to this task and cannot update it.");
      return;
    }
    try {
      const response = await apiRequest(`/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: task.name,
          description: task.description,
          tag: task.tag,
          priority: task.priority.toLowerCase(),
          ownerId: task.ownerId,
          status: "DONE",
        }),
      });
      if (!response.success) {
        throw new Error(
          response.message || "Failed to update task to Completed"
        );
      }
    } catch (err) {
      localStorage.removeItem("employeeId");
      localStorage.removeItem("authToken");
      router.push("/login");
      throw err instanceof Error ? err : new Error("An error occurred");
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const response = await apiRequest(`/projects/employees/${projectId}`, {
          method: "GET",
        });
        if (!response.success || !response.data) {
          throw new Error(response.message || "Failed to fetch project");
        }
        const apiProject: Project = response.data;

        const mappedTasks = apiProject.tasks.map((task) => {
          const uiStatus: "todo" | "in-progress" | "completed" =
            task.status === "ASSIGNED"
              ? "todo"
              : task.status === "IN_PROGRESS"
              ? "in-progress"
              : task.status === "DONE"
              ? "completed"
              : "todo";

          const mappedComments = (task.comments || []).map((comment) => {
            const commenter = apiProject.employeesWorkingOn.find(
              (emp) => emp.id === comment.commentorId
            );
            return {
              id: comment.id,
              user: {
                name: commenter?.name || "Unknown",
                initials:
                  commenter?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "UN",
              },
              text: comment.text,
              createdAt: comment.createdAt,
              commentorId: comment.commentorId,
            };
          });

          return {
            ...task,
            title: task.name,
            uiStatus,
            comments: mappedComments,
            assignedEmployees: task.assignedEmployees || [],
          };
        });

        setProject({
          ...apiProject,
          starred: false,
          tasks: mappedTasks,
        });
        setTasks({
          todo: mappedTasks.filter((task) => task.uiStatus === "todo"),
          "in-progress": mappedTasks.filter(
            (task) => task.uiStatus === "in-progress"
          ),
          completed: mappedTasks.filter(
            (task) => task.uiStatus === "completed"
          ),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        localStorage.removeItem("employeeId");
        localStorage.removeItem("authToken");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    const task = Object.values(tasks)
      .flat()
      .find((t) => t.id === draggableId);
    if (!task) return;
    const isAssigned = isTaskAssignedToCurrentEmployee(task);
    if (!isAssigned) {
      toast.error("You are not assigned to this task and cannot move it.");
      return;
    }
    const newTasks = { ...tasks };
    newTasks[source.droppableId as keyof typeof newTasks] = newTasks[
      source.droppableId as keyof typeof newTasks
    ].filter((t) => t.id !== draggableId);
    const updatedTask: Task = {
      ...task,
      uiStatus: destination.droppableId as "todo" | "in-progress" | "completed",
      status:
        destination.droppableId === "todo"
          ? "ASSIGNED"
          : destination.droppableId === "in-progress"
          ? "IN_PROGRESS"
          : "DONE",
    };
    if (destination.droppableId === "in-progress") {
      updateTaskToInProgress(updatedTask)
        .then(() => {
          newTasks[destination.droppableId as keyof typeof newTasks] = [
            ...newTasks[destination.droppableId as keyof typeof newTasks].slice(
              0,
              destination.index
            ),
            updatedTask,
            ...newTasks[destination.droppableId as keyof typeof newTasks].slice(
              destination.index
            ),
          ];
          setTasks(newTasks);
          setProject((prev) =>
            prev
              ? {
                  ...prev,
                  tasks: prev.tasks.map((t) =>
                    t.id === draggableId ? updatedTask : t
                  ),
                }
              : prev
          );
        })
        .catch((err) => {
          console.error("Failed to update task to In Progress:", err);
          toast.error("Failed to update task to In Progress");
        });
    } else if (destination.droppableId === "completed") {
      updateTaskToCompleted(updatedTask)
        .then(() => {
          newTasks[destination.droppableId as keyof typeof newTasks] = [
            ...newTasks[destination.droppableId as keyof typeof newTasks].slice(
              0,
              destination.index
            ),
            updatedTask,
            ...newTasks[destination.droppableId as keyof typeof newTasks].slice(
              destination.index
            ),
          ];
          setTasks(newTasks);
          setProject((prev) =>
            prev
              ? {
                  ...prev,
                  tasks: prev.tasks.map((t) =>
                    t.id === draggableId ? updatedTask : t
                  ),
                }
              : prev
          );
        })
        .catch((err) => {
          console.error("Failed to update task to Completed:", err);
          toast.error("Failed to update task to Completed");
        });
    } else {
      newTasks[destination.droppableId as keyof typeof newTasks] = [
        ...newTasks[destination.droppableId as keyof typeof newTasks].slice(
          0,
          destination.index
        ),
        updatedTask,
        ...newTasks[destination.droppableId as keyof typeof newTasks].slice(
          destination.index
        ),
      ];
      setTasks(newTasks);
      setProject((prev) =>
        prev
          ? {
              ...prev,
              tasks: prev.tasks.map((t) =>
                t.id === draggableId ? updatedTask : t
              ),
            }
          : prev
      );
    }
  };

  const addComment = async (
    taskId: string,
    comment: string,
    employeeId: string
  ) => {
    try {
      const response = await apiRequest(`/employees/add-comment`, {
        method: "POST",
        body: JSON.stringify({
          taskId: taskId,
          comment: comment,
          commentorId: employeeId,
        }),
      });
      if (!response.success) {
        localStorage.removeItem("employeeId");
        localStorage.removeItem("authToken");
        router.push("/login");
        throw new Error(response.message || "Failed to add comment");
      }
      return response.data;
    } catch (err) {
      throw err instanceof Error ? err : new Error("An error occurred");
    }
  };

  const handleAddComment = async (taskId: string) => {
    if (!newComment.trim() || !project) return;

    const employeeId = localStorage.getItem("employeeId");
    if (!employeeId) {
      toast.error("You must be logged in to add a comment.");
      router.push("/login");
      return;
    }

    try {
      const commentData = await addComment(taskId, newComment, employeeId);

      const commenter = project.employeesWorkingOn.find(
        (emp) => emp.id === employeeId
      );
      const newCommentObj: Comment = {
        id: commentData?.id || `comment-${Date.now()}`,
        user: {
          name: commenter?.name || "You",
          initials:
            commenter?.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "YO",
        },
        text: newComment,
        createdAt: commentData?.createdAt || new Date().toISOString(),
        commentorId: employeeId,
      };

      const updatedTasks = { ...tasks };
      Object.keys(updatedTasks).forEach((column) => {
        const taskIndex = updatedTasks[
          column as keyof typeof updatedTasks
        ].findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          updatedTasks[column as keyof typeof updatedTasks][taskIndex] = {
            ...updatedTasks[column as keyof typeof updatedTasks][taskIndex],
            comments: [
              ...(updatedTasks[column as keyof typeof updatedTasks][taskIndex]
                .comments || []),
              newCommentObj,
            ],
          };
        }
      });

      const updatedProjectTasks = project.tasks.map((t) =>
        t.id === taskId
          ? { ...t, comments: [...(t.comments || []), newCommentObj] }
          : t
      );

      if (activeTask && activeTask.id === taskId) {
        setActiveTask({
          ...activeTask,
          comments: [...(activeTask.comments || []), newCommentObj],
        });
      }

      setTasks(updatedTasks);
      setProject((prev) =>
        prev ? { ...prev, tasks: updatedProjectTasks } : prev
      );
      setNewComment("");

      // Scroll to bottom of comments
      if (commentsRef.current) {
        commentsRef.current.scrollTo({
          top: commentsRef.current.scrollHeight,
          behavior: "smooth",
        });
      }

      toast.success("Comment added successfully!");
    } catch (err) {
      console.error("Failed to add comment:", err);
      toast.error("Failed to add comment. Please try again.");
    }
  };

  if (isLoading) return <ProjectPageSkeleton />;
  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>Project not found</div>;

  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(
    (task) => task.uiStatus === "completed"
  ).length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const dueDate = calculateProjectDueDate(
    project.createdAt,
    project.timeEstimate
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold tracking-tight mr-2">
                {project.name}
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setProject({ ...project, starred: !project.starred })
                }
                className="text-muted-foreground hover:text-primary"
              >
                <Star
                  className={`h-5 w-5 ${
                    project.starred ? "fill-primary text-primary" : ""
                  }`}
                />
              </Button>
            </div>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Duplicate Project</DropdownMenuItem>
                <DropdownMenuItem>Archive Project</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Delete Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress}%</div>
              <Progress value={progress} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Due Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="text-2xl font-bold">{dueDate.formatted}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {Math.ceil(
                  (dueDate.dueDate.getTime() - new Date().getTime()) /
                    (24 * 60 * 60 * 1000)
                )}{" "}
                days remaining
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex -space-x-2">
                {project.employeesWorkingOn.map((member) => (
                  <Avatar
                    key={member.id}
                    className="border-2 border-background h-8 w-8"
                  >
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {project.employeesWorkingOn.length} team members
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant={
                  project.tasks.some((t) => t.priority === "High")
                    ? "destructive"
                    : project.tasks.some((t) => t.priority === "Medium")
                    ? "default"
                    : "secondary"
                }
                className="text-lg"
              >
                {project.tasks.some((t) => t.priority === "High")
                  ? "High"
                  : project.tasks.some((t) => t.priority === "Medium")
                  ? "Medium"
                  : "Low"}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">
                Set on {stringToDate(project.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tasks">
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks" className="mt-4">
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid gap-4 md:grid-cols-3">
                {(["todo", "in-progress", "completed"] as const).map(
                  (status) => (
                    <div key={status} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-muted-foreground">
                          {status === "todo"
                            ? "To Do"
                            : status === "in-progress"
                            ? "In Progress"
                            : "Completed"}{" "}
                          ({tasks[status].length})
                        </h3>
                      </div>
                      <Droppable droppableId={status}>
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-2 min-h-[200px]"
                          >
                            {tasks[status].map((task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                                isDragDisabled={
                                  !isTaskAssignedToCurrentEmployee(task)
                                }
                              >
                                {(provided) => (
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`cursor-grab active:cursor-grabbing
                                    ${
                                      task.uiStatus === "completed"
                                        ? "border-l-4 border-l-green-500"
                                        : ""
                                    }
                                    hover:bg-muted/50 transition-colors`}
                                    onClick={() => setActiveTask(task)}
                                  >
                                    <CardHeader className="p-3 pb-0">
                                      <div className="flex items-center justify-between">
                                        <CardTitle className="text-sm font-medium flex items-center">
                                          {task.uiStatus === "completed" && (
                                            <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                                          )}
                                          {task.title}
                                        </CardTitle>
                                        {isTaskAssignedToCurrentEmployee(
                                          task
                                        ) && (
                                          <Badge className="bg-blue-500 text-white rounded-full text-xs">
                                            Mine
                                          </Badge>
                                        )}
                                      </div>
                                    </CardHeader>
                                    <CardContent className="p-3 pt-2">
                                      <p className="text-xs text-muted-foreground line-clamp-2">
                                        {task.description}
                                      </p>
                                      <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center">
                                          <Avatar className="h-6 w-6 mr-1">
                                            <AvatarFallback>
                                              {task.assignedEmployees[0]
                                                ?.name[0] || "UN"}
                                            </AvatarFallback>
                                          </Avatar>
                                          <div className="flex items-center text-xs text-muted-foreground">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {stringToDate(
                                              task.due
                                            ).toLocaleDateString("en-US", {
                                              month: "short",
                                              day: "numeric",
                                            })}
                                          </div>
                                        </div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                          <MessageSquare className="h-3 w-3 mr-1" />
                                          {task.comments?.length || 0}
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )
                )}
              </div>
            </DragDropContext>
          </TabsContent>

          <TabsContent value="team" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage team members and their roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.employeesWorkingOn.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Files</CardTitle>
                <CardDescription>Manage files and documents</CardDescription>
              </CardHeader>
              <CardContent>
                {project.documents.length === 0 ? (
                  <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                    <div className="text-center">
                      <h3 className="text-lg font-medium">No files uploaded</h3>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {project.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() =>
                          router.push(
                            `/projects/${project.id}/document/${doc.id}`
                          )
                        }
                      >
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Enhanced Drawer with Auto-Scrolling Comments */}
      <Dialog.Root
        open={!!activeTask}
        onOpenChange={(open) => !open && setActiveTask(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-20" />
          <Dialog.Content className="fixed top-0 right-0 h-full w-full max-w-lg bg-background border-l border-muted shadow-lg z-30 transform transition-transform duration-300 ease-in-out flex flex-col">
            {activeTask && (
              <>
                <div className="flex items-center justify-between p-4 border-b">
                  <Dialog.Title className="text-lg font-bold text-foreground truncate max-w-[80%]">
                    {activeTask.title}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </Dialog.Close>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {activeTask.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            Assignees
                          </p>
                          <p className="text-sm">
                            {activeTask.assignedEmployees.length > 0
                              ? activeTask.assignedEmployees
                                  .map((emp) => emp.name)
                                  .join(", ")
                              : "Unassigned"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            Due Date
                          </p>
                          <p className="text-sm">
                            {stringToDate(activeTask.due).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-foreground">
                      Comments ({activeTask.comments?.length || 0})
                    </h4>
                    <div
                      ref={commentsRef}
                      className="max-h-64 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-background"
                    >
                      {!activeTask.comments ||
                      activeTask.comments.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No comments yet. Be the first to comment!
                        </p>
                      ) : (
                        activeTask.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="flex space-x-3 p-3 bg-muted/30 rounded-md border border-muted hover:bg-muted/50 transition-colors"
                          >
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage
                                src={comment.user.avatar}
                                alt={comment.user.name}
                              />
                              <AvatarFallback>
                                {comment.user.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-foreground">
                                  {comment.user.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {stringToDate(
                                    comment.createdAt
                                  ).toLocaleString()}
                                </p>
                              </div>
                              <p className="text-sm text-foreground mt-1">
                                {comment.text}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t">
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Add a comment..."
                      className="min-h-[100px] resize-none border-muted focus:ring-primary"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                      onClick={() => handleAddComment(activeTask.id)}
                      disabled={!newComment.trim()}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Post Comment
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
