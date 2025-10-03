"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  Filter,
  Plus,
  Search,
  Star,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MainNav } from "@/components/main-nav";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/app/lib/server_config";
import { calculateProjectDueDate } from "@/app/lib/date_helpers";
import { UserNav } from "./user-nav";

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
  starred: boolean;
  completionStatus: CompletionStatus;
  complexity: string;
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterPriority, setFilterPriority] = useState<string[]>([]);
  const [filterComplexity, setFilterComplexity] = useState<string[]>([]);
  const router = useRouter();

  // Apply filters and sorting
  const filteredProjects = projects
    .filter(
      (project) =>
        (searchQuery === "" ||
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) &&
        (filterStatus.length === 0 ||
          filterStatus.includes(project.completionStatus)) &&
        (filterPriority.length === 0 ||
          filterPriority.includes(project.priority)) &&
        (filterComplexity.length === 0 ||
          filterComplexity.includes(project.complexity))
    )
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "progress":
          comparison = a.progress - b.progress;
          break;
        case "dueDate":
          const dateA = a.dueDate
            ? new Date(a.dueDate).getTime()
            : a.timeEstimate
            ? a.timeEstimate.dueDate.getTime()
            : 0;
          const dateB = b.dueDate
            ? new Date(b.dueDate).getTime()
            : b.timeEstimate
            ? b.timeEstimate.dueDate.getTime()
            : 0;
          comparison = dateA - dateB;
          break;
        case "priority":
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          comparison =
            (priorityOrder[a.priority as keyof typeof priorityOrder] || 0) -
            (priorityOrder[b.priority as keyof typeof priorityOrder] || 0);
          break;
        case "tasks":
          comparison = a.tasks - b.tasks;
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  useEffect(() => {
    const fetchProjects = async () => {
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
            const mappedProjects = response.data.map((project: any) => {
              // Calculate progress based on completed tasks
              const totalTasks = project.tasks?.length || 0;
              const completedTasks =
                project.tasks?.filter((task: any) => task.status === "DONE")
                  .length || 0;
              const progress =
                totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

              // Calculate due date from createdAt and timeEstimate (in minutes)
              let dueDate: Date | undefined;
              if (project.createdAt && project.timeEstimate) {
                const createdDate = new Date(project.createdAt);
                dueDate = new Date(
                  createdDate.getTime() + project.timeEstimate * 60000
                );
              }

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
                timeEstimate: calculateProjectDueDate(
                  project.createdAt || new Date(),
                  project.timeEstimate || null,
                  {
                    workingHoursPerDay: 8,
                  }
                ),
                dueDate: project.dueDate,
                team: team.length > 0 ? team : ["Unassigned"],
                starred: false,
                completionStatus: project.completionStatus || "NOT_STARTED",
                complexity: project.complexity || "Medium",
              };
            });
            setProjects(mappedProjects);
          }
        } else {
          localStorage.removeItem("employeeId");
          localStorage.removeItem("authToken");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        localStorage.removeItem("employeeId");
        localStorage.removeItem("authToken");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Helper function to format dates consistently
  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return "N/A";
    try {
      const date =
        typeof dateString === "string" ? new Date(dateString) : dateString;
      return date.toLocaleDateString();
    } catch (e) {
      return "Invalid Date";
    }
  };

  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Toggle filter status
  const toggleFilterStatus = (status: string) => {
    setFilterStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // Toggle filter priority
  const toggleFilterPriority = (priority: string) => {
    setFilterPriority((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };

  // Toggle filter complexity
  const toggleFilterComplexity = (complexity: string) => {
    setFilterComplexity((prev) =>
      prev.includes(complexity)
        ? prev.filter((c) => c !== complexity)
        : [...prev, complexity]
    );
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "DONE":
        return "default"; // Using default instead of success
      case "IN_PROGRESS":
        return "default";
      case "NOT_STARTED":
      default:
        return "secondary";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DONE":
        return <CheckCircle2 className="h-4 w-4" />;
      case "IN_PROGRESS":
        return <Clock3 className="h-4 w-4" />;
      case "NOT_STARTED":
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

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
          <h1 className="text-2xl font-bold tracking-tight">All Projects</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filterStatus.includes("NOT_STARTED")}
                    onCheckedChange={() => toggleFilterStatus("NOT_STARTED")}
                  >
                    Not Started
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterStatus.includes("IN_PROGRESS")}
                    onCheckedChange={() => toggleFilterStatus("IN_PROGRESS")}
                  >
                    In Progress
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterStatus.includes("DONE")}
                    onCheckedChange={() => toggleFilterStatus("DONE")}
                  >
                    Completed
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuLabel className="mt-2">
                    Filter by Priority
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filterPriority.includes("High")}
                    onCheckedChange={() => toggleFilterPriority("High")}
                  >
                    High
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterPriority.includes("Medium")}
                    onCheckedChange={() => toggleFilterPriority("Medium")}
                  >
                    Medium
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterPriority.includes("Low")}
                    onCheckedChange={() => toggleFilterPriority("Low")}
                  >
                    Low
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuLabel className="mt-2">
                    Filter by Complexity
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filterComplexity.includes("High")}
                    onCheckedChange={() => toggleFilterComplexity("High")}
                  >
                    High
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterComplexity.includes("Medium")}
                    onCheckedChange={() => toggleFilterComplexity("Medium")}
                  >
                    Medium
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filterComplexity.includes("Low")}
                    onCheckedChange={() => toggleFilterComplexity("Low")}
                  >
                    Low
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Select
                value={sortBy}
                onValueChange={(value) => {
                  if (sortBy === value) {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy(value);
                    setSortOrder("asc");
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">
                    Name{" "}
                    {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </SelectItem>
                  <SelectItem value="progress">
                    Progress{" "}
                    {sortBy === "progress" && (sortOrder === "asc" ? "↑" : "↓")}
                  </SelectItem>
                  <SelectItem value="dueDate">
                    Due Date{" "}
                    {sortBy === "dueDate" && (sortOrder === "asc" ? "↑" : "↓")}
                  </SelectItem>
                  <SelectItem value="priority">
                    Priority{" "}
                    {sortBy === "priority" && (sortOrder === "asc" ? "↑" : "↓")}
                  </SelectItem>
                  <SelectItem value="tasks">
                    Tasks{" "}
                    {sortBy === "tasks" && (sortOrder === "asc" ? "↑" : "↓")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <h3 className="text-lg font-medium">Loading projects...</h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we fetch your projects.
                </p>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <h3 className="text-lg font-medium">No projects found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Link
                  href={`/projects/${project.id}`}
                  key={project.id}
                  className="block group"
                >
                  <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div className="space-y-1">
                        <CardTitle className="group-hover:text-primary transition-colors line-clamp-1">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-1">
                          {project.description}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Star
                          className={`h-4 w-4 ${
                            project.starred ? "fill-primary text-primary" : ""
                          }`}
                        />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">
                              {project.progress}%
                            </span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>
                              {project.timeEstimate
                                ? formatDate(project.timeEstimate.dueDate)
                                : formatDate(project.dueDate)}
                            </span>
                          </div>
                          <div>
                            {project.completedTasks}/{project.tasks} tasks
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant={getStatusBadgeVariant(
                              project.completionStatus
                            )}
                            className="flex items-center gap-1"
                          >
                            {getStatusIcon(project.completionStatus)}
                            {project.completionStatus.replace("_", " ")}
                          </Badge>
                          <Badge variant="outline">
                            {project.complexity} Complexity
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex w-full justify-between items-center">
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
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((member, i) => (
                            <div
                              key={i}
                              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium"
                              title={member}
                            >
                              {member
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          ))}
                          {project.team.length > 3 && (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
