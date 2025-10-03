"use client";

import React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_URL } from "@/app/lib/server-config";

type CompletionStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "DONE"
  | "ASSIGNED"
  | "PLANNING"
  | "ON_HOLD";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  skills: string[];
  location: string;
  assignedTasks?: number;
  completedTasks?: number;
}

interface Document {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  status: string;
}

interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  text: string;
  commentorId: string;
  taskId: string;
  projectId: string;
}

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  due?: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  projectName?: string;
  assignedEmployees?: { name: string; id: string }[];
  comments?: Comment[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  projectType: string;
  completionStatus: CompletionStatus;
  complexity: string;
  timeEstimate: number;
  createdAt: string;
  employeesWorkingOn: Employee[];
  documents: Document[];
  tasks: Task[];
  ownerId: string;
}

// Colors for charts
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];
const STATUS_COLORS = {
  DONE: "#10b981",
  IN_PROGRESS: "#3b82f6",
  ASSIGNED: "#f59e0b",
  NOT_STARTED: "#6b7280",
  PLANNING: "#8b5cf6",
  ON_HOLD: "#ec4899",
};

export default function ProjectReportsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = React.use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("all");
  const router = useRouter();

  // Prepare data for charts
  const projectStatusData = project
    ? [
        {
          name: "Not Started",
          value: project.tasks.filter((p) => p.status === "NOT_STARTED").length,
        },
        {
          name: "In Progress",
          value: project.tasks.filter((p) => p.status === "IN_PROGRESS").length,
        },
        {
          name: "Assigned",
          value: project.tasks.filter((p) => p.status === "ASSIGNED").length,
        },
        {
          name: "Completed",
          value: project.tasks.filter((p) => p.status === "DONE").length,
        },
      ].filter((item) => item.value > 0)
    : [];

  const taskStatusData = project
    ? [
        {
          name: "Done",
          value: project.tasks.filter((t) => t.status === "DONE").length,
        },
        {
          name: "In Progress",
          value: project.tasks.filter((t) => t.status === "IN_PROGRESS").length,
        },
        {
          name: "Assigned",
          value: project.tasks.filter((t) => t.status === "ASSIGNED").length,
        },
        {
          name: "Not Started",
          value: project.tasks.filter((t) => t.status === "NOT_STARTED").length,
        },
      ].filter((item) => item.value > 0)
    : [];

  const projectProgressData = project
    ? project.tasks
        .filter((t) => t.name)
        .map((task) => ({
          name:
            task.name.length > 15
              ? task.name.substring(0, 15) + "..."
              : task.name,
          progress:
            task.status === "DONE"
              ? 100
              : task.status === "IN_PROGRESS"
              ? 50
              : task.status === "ASSIGNED"
              ? 25
              : 0,
          status: task.status,
          priority: task.priority,
        }))
    : [];

  const employeePerformanceData = project
    ? project.employeesWorkingOn.map((employee) => {
        const assignedTasks = project.tasks.filter((task) =>
          task.assignedEmployees?.some((e) => e.id === employee.id)
        ).length;

        const completedTasks = project.tasks.filter(
          (task) =>
            task.status === "DONE" &&
            task.assignedEmployees?.some((e) => e.id === employee.id)
        ).length;

        return {
          name:
            employee.name.length > 15
              ? employee.name.substring(0, 15) + "..."
              : employee.name,
          assigned: assignedTasks,
          completed: completedTasks,
          efficiency:
            assignedTasks > 0
              ? Math.round((completedTasks / assignedTasks) * 100)
              : 0,
        };
      })
    : [];

  // Format date for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return "Invalid Date";
    }
  };

  // Export report as CSV
  const exportReportCSV = (reportType: string) => {
    if (!project) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    let data: any[] = [];

    switch (reportType) {
      case "project":
        csvContent +=
          "Task Name,Description,Progress,Status,Priority,Due Date\n";
        data = project.tasks.map((t) => [
          `"${t.name}"`,
          `"${t.description}"`,
          t.status === "DONE"
            ? 100
            : t.status === "IN_PROGRESS"
            ? 50
            : t.status === "ASSIGNED"
            ? 25
            : 0,
          t.status,
          t.priority,
          formatDate(t.due),
        ]);
        break;
      case "tasks":
        csvContent += "Task Name,Status,Priority,Due Date,Assigned To\n";
        data = project.tasks.map((t) => [
          `"${t.name}"`,
          t.status,
          t.priority,
          formatDate(t.due),
          t.assignedEmployees && t.assignedEmployees.length > 0
            ? `"${t.assignedEmployees.map((e) => e.name).join(", ")}"`
            : "Unassigned",
        ]);
        break;
      case "team":
        csvContent +=
          "Employee Name,Role,Department,Assigned Tasks,Completed Tasks,Efficiency\n";
        data = project.employeesWorkingOn.map((e) => {
          const assignedTasks = project.tasks.filter((task) =>
            task.assignedEmployees?.some((emp) => emp.id === e.id)
          ).length;

          const completedTasks = project.tasks.filter(
            (task) =>
              task.status === "DONE" &&
              task.assignedEmployees?.some((emp) => emp.id === e.id)
          ).length;

          return [
            `"${e.name}"`,
            `"${e.role}"`,
            `"${e.department || "General"}"`,
            assignedTasks,
            completedTasks,
            assignedTasks > 0
              ? Math.round((completedTasks / assignedTasks) * 100) + "%"
              : "0%",
          ];
        });
        break;
    }

    data.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${reportType}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/projects/${resolvedParams.projectId}`,
          {
            method: "GET",
            headers: {
              "x-api-key": "thisisasdca",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.status === 401) {
          router.push("/sign-in");
          return;
        }

        const result = await response.json();

        if (result.success && result.data) {
          setProject(result.data);
        } else {
          setError("Failed to load project data");
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        console.error("Error fetching project data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [resolvedParams.projectId, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-4 p-4 md:p-8">
              <div className="flex items-center justify-between">
                  <Button
                      variant="outline"
                      className="hidden md:inline-flex"
                      onClick={() => router.back()}
                  >
                      Back
                  </Button>
                  
            

          <h1 className="text-2xl font-bold tracking-tight">
            {project ? `${project.name} - Reports & Analytics` : "Loading..."}
          </h1>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-[500px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Loading reports...</h3>
              <p className="text-sm text-muted-foreground">
                Please wait while we generate your reports.
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex h-[500px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium text-red-500">
                Error loading reports
              </h3>
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : !project ? (
          <div className="flex h-[500px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Project not found</h3>
              <p className="text-sm text-muted-foreground">
                The requested project could not be found or you don't have
                access to it.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.push("/")}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="team">Team Performance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {project.tasks.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {project.tasks.filter((t) => t.status === "DONE").length}{" "}
                      completed
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Team Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {project.employeesWorkingOn.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Across{" "}
                      {
                        new Set(
                          project.employeesWorkingOn.map((e) => e.department)
                        ).size
                      }{" "}
                      departments
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {project.documents.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Project documentation
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Overall Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {project.tasks.length > 0
                        ? Math.round(
                            (project.tasks.filter((t) => t.status === "DONE")
                              .length /
                              project.tasks.length) *
                              100
                          )
                        : 0}
                      %
                    </div>
                    <div className="mt-2">
                      <Progress
                        value={
                          project.tasks.length > 0
                            ? Math.round(
                                (project.tasks.filter(
                                  (t) => t.status === "DONE"
                                ).length /
                                  project.tasks.length) *
                                  100
                              )
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Task Status</CardTitle>
                    <CardDescription>
                      Distribution of task statuses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={taskStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {taskStatusData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                STATUS_COLORS[
                                  entry.name
                                    .toUpperCase()
                                    .replace(
                                      " ",
                                      "_"
                                    ) as keyof typeof STATUS_COLORS
                                ] || COLORS[index % COLORS.length]
                              }
                            />
                          ))}
                        </Pie>
                        <Legend />
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Task Priority</CardTitle>
                    <CardDescription>
                      Distribution of task priorities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: "High",
                              value: project.tasks.filter(
                                (t) => t.priority.toLowerCase() === "high"
                              ).length,
                            },
                            {
                              name: "Medium",
                              value: project.tasks.filter(
                                (t) => t.priority.toLowerCase() === "medium"
                              ).length,
                            },
                            {
                              name: "Low",
                              value: project.tasks.filter(
                                (t) => t.priority.toLowerCase() === "low"
                              ).length,
                            },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          <Cell fill="#ef4444" /> {/* High - Red */}
                          <Cell fill="#f59e0b" /> {/* Medium - Amber */}
                          <Cell fill="#10b981" /> {/* Low - Green */}
                        </Pie>
                        <Legend />
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Task Progress</CardTitle>
                  <CardDescription>
                    Completion percentage by task
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={projectProgressData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 70,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar
                        dataKey="progress"
                        name="Progress (%)"
                        fill="#8884d8"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Task Reports</CardTitle>
                    <CardDescription>
                      Detailed view of all tasks
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportReportCSV("tasks")}
                  >
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 gap-4 border-b bg-muted/50 p-4 font-medium">
                      <div>Task</div>
                      <div>Status</div>
                      <div>Priority</div>
                      <div>Due Date</div>
                      <div>Assigned To</div>
                      <div>Progress</div>
                    </div>
                    <div className="divide-y">
                      {project.tasks.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No tasks found
                        </div>
                      ) : (
                        project.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="grid grid-cols-6 gap-4 p-4 items-center"
                          >
                            <div className="font-medium">{task.name}</div>
                            <div>
                              <Badge
                                variant={
                                  task.status === "DONE"
                                    ? "default"
                                    : task.status === "IN_PROGRESS"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  task.status === "DONE"
                                    ? "bg-green-500 hover:bg-green-600"
                                    : task.status === "IN_PROGRESS"
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : task.status === "ASSIGNED"
                                    ? "bg-amber-500 hover:bg-amber-600"
                                    : ""
                                }
                              >
                                {task.status.replace("_", " ")}
                              </Badge>
                            </div>
                            <div>
                              <Badge
                                variant={
                                  task.priority.toLowerCase() === "high"
                                    ? "destructive"
                                    : task.priority.toLowerCase() === "medium"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {task.priority}
                              </Badge>
                            </div>
                            <div>{task.due ? formatDate(task.due) : "N/A"}</div>
                            <div>
                              {task.assignedEmployees &&
                              task.assignedEmployees.length > 0
                                ? task.assignedEmployees
                                    .map((e) => e.name)
                                    .join(", ")
                                : "Unassigned"}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={
                                    task.status === "DONE"
                                      ? 100
                                      : task.status === "IN_PROGRESS"
                                      ? 50
                                      : task.status === "ASSIGNED"
                                      ? 25
                                      : 0
                                  }
                                  className="h-2 w-full max-w-24"
                                />
                                <span className="text-xs">
                                  {task.status === "DONE"
                                    ? 100
                                    : task.status === "IN_PROGRESS"
                                    ? 50
                                    : task.status === "ASSIGNED"
                                    ? 25
                                    : 0}
                                  %
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Task Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={taskStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {taskStatusData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                STATUS_COLORS[
                                  entry.name
                                    .toUpperCase()
                                    .replace(
                                      " ",
                                      "_"
                                    ) as keyof typeof STATUS_COLORS
                                ] || COLORS[index % COLORS.length]
                              }
                            />
                          ))}
                        </Pie>
                        <Legend />
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tasks by Priority</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: "High",
                              value: project.tasks.filter(
                                (t) => t.priority.toLowerCase() === "high"
                              ).length,
                            },
                            {
                              name: "Medium",
                              value: project.tasks.filter(
                                (t) => t.priority.toLowerCase() === "medium"
                              ).length,
                            },
                            {
                              name: "Low",
                              value: project.tasks.filter(
                                (t) => t.priority.toLowerCase() === "low"
                              ).length,
                            },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          <Cell fill="#ef4444" /> {/* High - Red */}
                          <Cell fill="#f59e0b" /> {/* Medium - Amber */}
                          <Cell fill="#10b981" /> {/* Low - Green */}
                        </Pie>
                        <Legend />
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Tasks Due Soon</CardTitle>
                  <CardDescription>
                    Tasks with upcoming deadlines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 gap-4 border-b bg-muted/50 p-4 font-medium">
                      <div>Task</div>
                      <div>Status</div>
                      <div>Priority</div>
                      <div>Due Date</div>
                    </div>
                    <div className="divide-y">
                      {project.tasks
                        .filter(
                          (t) =>
                            t.due &&
                            new Date(t.due) > new Date() &&
                            t.status !== "DONE"
                        )
                        .sort(
                          (a, b) =>
                            new Date(a.due!).getTime() -
                            new Date(b.due!).getTime()
                        )
                        .slice(0, 5)
                        .map((task) => (
                          <div
                            key={task.id}
                            className="grid grid-cols-4 gap-4 p-4 items-center"
                          >
                            <div className="font-medium">{task.name}</div>
                            <div>
                              <Badge
                                variant={
                                  task.status === "DONE"
                                    ? "default"
                                    : task.status === "IN_PROGRESS"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  task.status === "DONE"
                                    ? "bg-green-500 hover:bg-green-600"
                                    : task.status === "IN_PROGRESS"
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : task.status === "ASSIGNED"
                                    ? "bg-amber-500 hover:bg-amber-600"
                                    : ""
                                }
                              >
                                {task.status.replace("_", " ")}
                              </Badge>
                            </div>
                            <div>
                              <Badge
                                variant={
                                  task.priority.toLowerCase() === "high"
                                    ? "destructive"
                                    : task.priority.toLowerCase() === "medium"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {task.priority}
                              </Badge>
                            </div>
                            <div>{formatDate(task.due)}</div>
                          </div>
                        ))}
                      {project.tasks.filter(
                        (t) =>
                          t.due &&
                          new Date(t.due) > new Date() &&
                          t.status !== "DONE"
                      ).length === 0 && (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No upcoming tasks found
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team Performance Tab */}
            <TabsContent value="team" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Team Performance</CardTitle>
                    <CardDescription>
                      Employee task completion metrics
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportReportCSV("team")}
                  >
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 border-b bg-muted/50 p-4 font-medium">
                      <div>Employee</div>
                      <div>Role</div>
                      <div>Department</div>
                      <div>Tasks</div>
                      <div>Efficiency</div>
                    </div>
                    <div className="divide-y">
                      {project.employeesWorkingOn.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No team members found
                        </div>
                      ) : (
                        project.employeesWorkingOn.map((employee) => {
                          const assignedTasks = project.tasks.filter((task) =>
                            task.assignedEmployees?.some(
                              (e) => e.id === employee.id
                            )
                          ).length;

                          const completedTasks = project.tasks.filter(
                            (task) =>
                              task.status === "DONE" &&
                              task.assignedEmployees?.some(
                                (e) => e.id === employee.id
                              )
                          ).length;

                          return (
                            <div
                              key={employee.id}
                              className="grid grid-cols-5 gap-4 p-4 items-center"
                            >
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-sm">{employee.role}</div>
                              <div className="text-sm">
                                {employee.department || "General"}
                              </div>
                              <div>
                                {completedTasks}/{assignedTasks}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <Progress
                                    value={
                                      assignedTasks > 0
                                        ? Math.round(
                                            (completedTasks / assignedTasks) *
                                              100
                                          )
                                        : 0
                                    }
                                    className="h-2 w-full max-w-24"
                                  />
                                  <span className="text-xs">
                                    {assignedTasks > 0
                                      ? Math.round(
                                          (completedTasks / assignedTasks) * 100
                                        )
                                      : 0}
                                    %
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Employee Performance</CardTitle>
                  <CardDescription>
                    Task completion efficiency by employee
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={employeePerformanceData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 70,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar
                        dataKey="assigned"
                        name="Assigned Tasks"
                        fill="#8884d8"
                      />
                      <Bar
                        dataKey="completed"
                        name="Completed Tasks"
                        fill="#82ca9d"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Department Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={Array.from(
                            new Set(
                              project.employeesWorkingOn.map(
                                (e) => e.department || "General"
                              )
                            )
                          ).map((dept) => ({
                            name: dept,
                            value: project.employeesWorkingOn.filter(
                              (e) => (e.department || "General") === dept
                            ).length,
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {Array.from(
                            new Set(
                              project.employeesWorkingOn.map(
                                (e) => e.department || "General"
                              )
                            )
                          )
                            .map((dept) => ({
                              name: dept,
                              value: project.employeesWorkingOn.filter(
                                (e) => (e.department || "General") === dept
                              ).length,
                            }))
                            .map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                        </Pie>
                        <Legend />
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Role Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={Array.from(
                            new Set(
                              project.employeesWorkingOn.map((e) => e.role)
                            )
                          ).map((role) => ({
                            name: role,
                            value: project.employeesWorkingOn.filter(
                              (e) => e.role === role
                            ).length,
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {Array.from(
                            new Set(
                              project.employeesWorkingOn.map((e) => e.role)
                            )
                          )
                            .map((role) => ({
                              name: role,
                              value: project.employeesWorkingOn.filter(
                                (e) => e.role === role
                              ).length,
                            }))
                            .map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                        </Pie>
                        <Legend />
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Document Reports</CardTitle>
                    <CardDescription>
                      Overview of project documentation
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 gap-4 border-b bg-muted/50 p-4 font-medium">
                      <div>Document</div>
                      <div>Created By</div>
                      <div>Created Date</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {project.documents.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No documents found
                        </div>
                      ) : (
                        project.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="grid grid-cols-4 gap-4 p-4 items-center"
                          >
                            <div className="font-medium">{doc.name}</div>
                            <div>{doc.createdBy}</div>
                            <div>{formatDate(doc.createdAt)}</div>
                            <div>
                              <Badge
                                variant={
                                  doc.status === "DONE" ||
                                  doc.status === "CREATED"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  doc.status === "DONE"
                                    ? "bg-green-500 hover:bg-green-600"
                                    : doc.status === "CREATED"
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : doc.status === "DRAFT"
                                    ? "bg-amber-500 hover:bg-amber-600"
                                    : ""
                                }
                              >
                                {doc.status.replace("_", " ")}
                              </Badge>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: "Created",
                              value: project.documents.filter(
                                (d) => d.status === "CREATED"
                              ).length,
                            },
                            {
                              name: "Draft",
                              value: project.documents.filter(
                                (d) => d.status === "DRAFT"
                              ).length,
                            },
                            {
                              name: "Done",
                              value: project.documents.filter(
                                (d) => d.status === "DONE"
                              ).length,
                            },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          <Cell fill="#3b82f6" /> {/* Created - Blue */}
                          <Cell fill="#f59e0b" /> {/* Draft - Amber */}
                          <Cell fill="#10b981" /> {/* Done - Green */}
                        </Pie>
                        <Legend />
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Document Creation Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={project.documents
                          .map((doc) => ({
                            name:
                              doc.name.length > 15
                                ? doc.name.substring(0, 15) + "..."
                                : doc.name,
                            date: new Date(doc.createdAt).getTime(),
                            createdBy: doc.createdBy,
                          }))
                          .sort((a, b) => a.date - b.date)}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 70,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={70}
                        />
                        <YAxis
                          tickFormatter={(value) =>
                            new Date(value).toLocaleDateString()
                          }
                          type="number"
                          domain={["dataMin", "dataMax"]}
                          hide
                        />
                        <RechartsTooltip
                          formatter={(value: any) =>
                            new Date(value).toLocaleDateString()
                          }
                          labelFormatter={(label) => `Document: ${label}`}
                        />
                        <Legend />
                        <Bar
                          dataKey="date"
                          name="Creation Date"
                          fill="#8884d8"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
