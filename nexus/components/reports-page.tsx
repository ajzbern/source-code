"use client";

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
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";

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
import { apiRequest } from "@/app/lib/server_config";

type CompletionStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE";

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  tasks: number;
  completedTasks: number;
  priority: string;
  dueDate?: string;
  timeEstimate?: {
    dueDate: Date;
  };
  team: string[];
  completionStatus: CompletionStatus;
  complexity: string;
}

interface Task {
  id: string;
  name: string;
  status: string;
  priority: string;
  due?: string;
  projectId: string;
  projectName: string;
}

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  assignedTasks: number;
  completedTasks: number;
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
};

export default function ReportsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("all");
  const router = useRouter();

  // Prepare data for charts
  const projectStatusData = [
    {
      name: "Not Started",
      value: projects.filter((p) => p.completionStatus === "NOT_STARTED")
        .length,
    },
    {
      name: "In Progress",
      value: projects.filter((p) => p.completionStatus === "IN_PROGRESS")
        .length,
    },
    {
      name: "Completed",
      value: projects.filter((p) => p.completionStatus === "DONE").length,
    },
  ].filter((item) => item.value > 0);

  const taskStatusData = [
    { name: "Done", value: tasks.filter((t) => t.status === "DONE").length },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "IN_PROGRESS").length,
    },
    {
      name: "Assigned",
      value: tasks.filter((t) => t.status === "ASSIGNED").length,
    },
    {
      name: "Not Started",
      value: tasks.filter((t) => t.status === "NOT_STARTED").length,
    },
  ].filter((item) => item.value > 0);

  const projectProgressData = projects
    .filter((p) => p.name)
    .map((project) => ({
      name:
        project.name.length > 15
          ? project.name.substring(0, 15) + "..."
          : project.name,
      progress: project.progress,
      tasks: project.tasks,
      completed: project.completedTasks,
    }));

  const employeePerformanceData = employees
    .filter((e) => e.assignedTasks > 0)
    .map((employee) => ({
      name:
        employee.name.length > 15
          ? employee.name.substring(0, 15) + "..."
          : employee.name,
      assigned: employee.assignedTasks,
      completed: employee.completedTasks,
      efficiency:
        employee.assignedTasks > 0
          ? Math.round((employee.completedTasks / employee.assignedTasks) * 100)
          : 0,
    }));

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
    let csvContent = "data:text/csv;charset=utf-8,";
    let data: any[] = [];

    switch (reportType) {
      case "projects":
        csvContent +=
          "Project Name,Description,Progress,Tasks,Completed Tasks,Priority,Due Date,Status\n";
        data = projects.map((p) => [
          `"${p.name}"`,
          `"${p.description}"`,
          p.progress,
          p.tasks,
          p.completedTasks,
          p.priority,
          formatDate(p.dueDate),
          p.completionStatus,
        ]);
        break;
      case "tasks":
        csvContent += "Task Name,Project,Status,Priority,Due Date\n";
        data = tasks.map((t) => [
          `"${t.name}"`,
          `"${t.projectName}"`,
          t.status,
          t.priority,
          formatDate(t.due),
        ]);
        break;
      case "employees":
        csvContent +=
          "Employee Name,Role,Department,Assigned Tasks,Completed Tasks,Efficiency\n";
        data = employees.map((e) => [
          `"${e.name}"`,
          `"${e.role}"`,
          `"${e.department}"`,
          e.assignedTasks,
          e.completedTasks,
          e.assignedTasks > 0
            ? Math.round((e.completedTasks / e.assignedTasks) * 100) + "%"
            : "0%",
        ]);
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
    const fetchReportData = async () => {
      setIsLoading(true);
      try {
        const employeeId = localStorage.getItem("employeeId");
        if (employeeId) {
          const response = await apiRequest(
            `/employees/dashboard/${employeeId}`,
            {
              method: "GET",
            }
          );

          if (response && response.success && response.data) {
            // Process projects
            const projectsData = response.data.map((project: any) => {
              // Calculate progress based on completed tasks
              const totalTasks = project.tasks?.length || 0;
              const completedTasks =
                project.tasks?.filter((task: any) => task.status === "DONE")
                  .length || 0;
              const progress =
                totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

              // Get unique team member names
              const team = Array.from(
                new Set(
                  project.employeesWorkingOn?.map((emp: any) => emp.name) || []
                )
              );

              return {
                id: project.id,
                name: project.name || "Untitled Project",
                description: project.description || "No description available",
                progress: Math.round(progress),
                tasks: totalTasks,
                completedTasks: completedTasks,
                priority: project.priority || "Medium",
                dueDate: project.dueDate,
                team: team.length > 0 ? team : ["Unassigned"],
                completionStatus: project.completionStatus || "NOT_STARTED",
                complexity: project.complexity || "Medium",
              };
            });

            setProjects(projectsData);

            // Process tasks
            const tasksData: Task[] = [];
            response.data.forEach((project: any) => {
              if (project.tasks && project.tasks.length > 0) {
                project.tasks.forEach((task: any) => {
                  tasksData.push({
                    id: task.id,
                    name: task.name,
                    status: task.status || "ASSIGNED",
                    priority: task.priority || "Medium",
                    due: task.due,
                    projectId: project.id,
                    projectName: project.name,
                  });
                });
              }
            });

            setTasks(tasksData);

            // Process employees
            const employeesMap = new Map<string, Employee>();

            response.data.forEach((project: any) => {
              if (
                project.employeesWorkingOn &&
                project.employeesWorkingOn.length > 0
              ) {
                project.employeesWorkingOn.forEach((emp: any) => {
                  if (!employeesMap.has(emp.id)) {
                    employeesMap.set(emp.id, {
                      id: emp.id,
                      name: emp.name,
                      role: emp.role || "Employee",
                      department: emp.department || "General",
                      assignedTasks: 0,
                      completedTasks: 0,
                    });
                  }
                });
              }

              if (project.tasks && project.tasks.length > 0) {
                project.tasks.forEach((task: any) => {
                  if (
                    task.assignedEmployees &&
                    task.assignedEmployees.length > 0
                  ) {
                    task.assignedEmployees.forEach((assignee: any) => {
                      const employee = employeesMap.get(assignee.id);
                      if (employee) {
                        employee.assignedTasks += 1;
                        if (task.status === "DONE") {
                          employee.completedTasks += 1;
                        }
                        employeesMap.set(assignee.id, employee);
                      }
                    });
                  }
                });
              }
            });

            setEmployees(Array.from(employeesMap.values()));
          }
        } else {
          localStorage.removeItem("employeeId");
          localStorage.removeItem("authToken");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
        localStorage.removeItem("employeeId");
        localStorage.removeItem("authToken");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, []);

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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            Reports & Analytics
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
        ) : (
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="team">Team Performance</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Projects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{projects.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {
                        projects.filter((p) => p.completionStatus === "DONE")
                          .length
                      }{" "}
                      completed
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{tasks.length}</div>
                    <p className="text-xs text-muted-foreground">
                      {tasks.filter((t) => t.status === "DONE").length}{" "}
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
                    <div className="text-2xl font-bold">{employees.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Across {new Set(employees.map((e) => e.department)).size}{" "}
                      departments
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
                      {projects.length > 0
                        ? Math.round(
                            projects.reduce((acc, p) => acc + p.progress, 0) /
                              projects.length
                          )
                        : 0}
                      %
                    </div>
                    <div className="mt-2">
                      <Progress
                        value={
                          projects.length > 0
                            ? Math.round(
                                projects.reduce(
                                  (acc, p) => acc + p.progress,
                                  0
                                ) / projects.length
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
                    <CardTitle>Project Status</CardTitle>
                    <CardDescription>
                      Distribution of project statuses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={projectStatusData}
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
                          {projectStatusData.map((entry, index) => (
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
                                  entry.name.toUpperCase() as keyof typeof STATUS_COLORS
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
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Project Progress</CardTitle>
                  <CardDescription>
                    Completion percentage by project
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

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Project Reports</CardTitle>
                    <CardDescription>
                      Detailed view of all projects
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportReportCSV("projects")}
                  >
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-7 gap-4 border-b bg-muted/50 p-4 font-medium">
                      <div>Project</div>
                      <div>Status</div>
                      <div>Priority</div>
                      <div>Progress</div>
                      <div>Tasks</div>
                      <div>Due Date</div>
                      <div>Team Size</div>
                    </div>
                    <div className="divide-y">
                      {projects.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No projects found
                        </div>
                      ) : (
                        projects.map((project) => (
                          <div
                            key={project.id}
                            className="grid grid-cols-7 gap-4 p-4 items-center"
                          >
                            <div className="font-medium">{project.name}</div>
                            <div>
                              <Badge
                                variant={
                                  project.completionStatus === "DONE"
                                    ? "default"
                                    : project.completionStatus === "IN_PROGRESS"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  project.completionStatus === "DONE"
                                    ? "bg-green-500 hover:bg-green-600"
                                    : ""
                                }
                              >
                                {project.completionStatus.replace("_", " ")}
                              </Badge>
                            </div>
                            <div>
                              <Badge
                                variant={
                                  project.priority === "High"
                                    ? "destructive"
                                    : project.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {project.priority}
                              </Badge>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={project.progress}
                                  className="h-2 w-full max-w-24"
                                />
                                <span className="text-xs">
                                  {project.progress}%
                                </span>
                              </div>
                            </div>
                            <div>
                              {project.completedTasks}/{project.tasks}
                            </div>
                            <div>
                              {project.dueDate
                                ? formatDate(project.dueDate)
                                : "N/A"}
                            </div>
                            <div>{project.team.length}</div>
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
                    <CardTitle>Project Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={projectStatusData}
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
                          {projectStatusData.map((entry, index) => (
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
                    <CardTitle>Project Complexity</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: "High",
                              value: projects.filter(
                                (p) => p.complexity === "High"
                              ).length,
                            },
                            {
                              name: "Medium",
                              value: projects.filter(
                                (p) => p.complexity === "Medium"
                              ).length,
                            },
                            {
                              name: "Low",
                              value: projects.filter(
                                (p) => p.complexity === "Low"
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
                          {[
                            {
                              name: "High",
                              value: projects.filter(
                                (p) => p.complexity === "High"
                              ).length,
                            },
                            {
                              name: "Medium",
                              value: projects.filter(
                                (p) => p.complexity === "Medium"
                              ).length,
                            },
                            {
                              name: "Low",
                              value: projects.filter(
                                (p) => p.complexity === "Low"
                              ).length,
                            },
                          ].map((entry, index) => (
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
                    <div className="grid grid-cols-5 gap-4 border-b bg-muted/50 p-4 font-medium">
                      <div>Task</div>
                      <div>Project</div>
                      <div>Status</div>
                      <div>Priority</div>
                      <div>Due Date</div>
                    </div>
                    <div className="divide-y">
                      {tasks.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No tasks found
                        </div>
                      ) : (
                        tasks.map((task) => (
                          <div
                            key={task.id}
                            className="grid grid-cols-5 gap-4 p-4 items-center"
                          >
                            <div className="font-medium">{task.name}</div>
                            <div className="text-sm">{task.projectName}</div>
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
                                    : ""
                                }
                              >
                                {task.status.replace("_", " ")}
                              </Badge>
                            </div>
                            <div>
                              <Badge
                                variant={
                                  task.priority === "High" ||
                                  task.priority === "high"
                                    ? "destructive"
                                    : task.priority === "Medium" ||
                                      task.priority === "medium"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {task.priority}
                              </Badge>
                            </div>
                            <div>{task.due ? formatDate(task.due) : "N/A"}</div>
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
                                  entry.name.toUpperCase() as keyof typeof STATUS_COLORS
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
                              value: tasks.filter(
                                (t) =>
                                  t.priority === "High" || t.priority === "high"
                              ).length,
                            },
                            {
                              name: "Medium",
                              value: tasks.filter(
                                (t) =>
                                  t.priority === "Medium" ||
                                  t.priority === "medium"
                              ).length,
                            },
                            {
                              name: "Low",
                              value: tasks.filter(
                                (t) =>
                                  t.priority === "Low" || t.priority === "low"
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
                          {[
                            {
                              name: "High",
                              value: tasks.filter(
                                (t) =>
                                  t.priority === "High" || t.priority === "high"
                              ).length,
                            },
                            {
                              name: "Medium",
                              value: tasks.filter(
                                (t) =>
                                  t.priority === "Medium" ||
                                  t.priority === "medium"
                              ).length,
                            },
                            {
                              name: "Low",
                              value: tasks.filter(
                                (t) =>
                                  t.priority === "Low" || t.priority === "low"
                              ).length,
                            },
                          ].map((entry, index) => (
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
                      <div>Project</div>
                      <div>Status</div>
                      <div>Due Date</div>
                    </div>
                    <div className="divide-y">
                      {tasks
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
                            <div className="text-sm">{task.projectName}</div>
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
                                    : ""
                                }
                              >
                                {task.status.replace("_", " ")}
                              </Badge>
                            </div>
                            <div>{formatDate(task.due)}</div>
                          </div>
                        ))}
                      {tasks.filter(
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
                    onClick={() => exportReportCSV("employees")}
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
                      {employees.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No employees found
                        </div>
                      ) : (
                        employees.map((employee) => (
                          <div
                            key={employee.id}
                            className="grid grid-cols-5 gap-4 p-4 items-center"
                          >
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm">{employee.role}</div>
                            <div className="text-sm">{employee.department}</div>
                            <div>
                              {employee.completedTasks}/{employee.assignedTasks}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={
                                    employee.assignedTasks > 0
                                      ? Math.round(
                                          (employee.completedTasks /
                                            employee.assignedTasks) *
                                            100
                                        )
                                      : 0
                                  }
                                  className="h-2 w-full max-w-24"
                                />
                                <span className="text-xs">
                                  {employee.assignedTasks > 0
                                    ? Math.round(
                                        (employee.completedTasks /
                                          employee.assignedTasks) *
                                          100
                                      )
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
                            new Set(employees.map((e) => e.department))
                          ).map((dept) => ({
                            name: dept,
                            value: employees.filter(
                              (e) => e.department === dept
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
                            new Set(employees.map((e) => e.department))
                          )
                            .map((dept) => ({
                              name: dept,
                              value: employees.filter(
                                (e) => e.department === dept
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
                            new Set(employees.map((e) => e.role))
                          ).map((role) => ({
                            name: role,
                            value: employees.filter((e) => e.role === role)
                              .length,
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
                          {Array.from(new Set(employees.map((e) => e.role)))
                            .map((role) => ({
                              name: role,
                              value: employees.filter((e) => e.role === role)
                                .length,
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
          </Tabs>
        )}
      </main>
    </div>
  );
}
