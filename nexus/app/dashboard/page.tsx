"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Filter, Plus, Search, Star } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { apiRequest } from "../lib/server_config";
import { useRouter } from "next/navigation";
import { calculateProjectDueDate } from "../lib/date_helpers";

type CompletionStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE";
// Project interface definition
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
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

              // Define priority mapping with explicit typing
              const priorityMap: Record<CompletionStatus, string> = {
                NOT_STARTED: "Low",
                IN_PROGRESS: "Medium",
                DONE: "High",
              };

              // Safely get priority with fallback
              const priority =
                priorityMap[project.completionStatus as CompletionStatus];

              return {
                id: project.id,
                name: project.name || "Untitled Project",
                description: project.description || "No description available",
                progress: Math.round(progress),
                tasks: totalTasks,
                completedTasks: completedTasks,
                priority: priority,
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

  // Get projects sorted by due date for the upcoming deadlines section
  const upcomingDeadlines = [...projects]
    .filter(
      (project) =>
        project.dueDate ||
        (project.timeEstimate && project.timeEstimate.dueDate)
    )
    .sort((a, b) => {
      const dateA = a.dueDate
        ? new Date(a.dueDate).getTime()
        : a.timeEstimate?.dueDate.getTime() || 0;
      const dateB = b.dueDate
        ? new Date(b.dueDate).getTime()
        : b.timeEstimate?.dueDate.getTime() || 0;
      return dateA - dateB;
    })
    .slice(0, 3);

  // Calculate days remaining for a project
  const getDaysRemaining = (project: Project) => {
    const dueDate = project.dueDate
      ? new Date(project.dueDate)
      : project.timeEstimate
      ? project.timeEstimate.dueDate
      : null;

    if (!dueDate) return "N/A";

    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days` : "Overdue";
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
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="md:w-2/3">
            <div className="flex space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
            </div>

            <Tabs defaultValue="all">
              <TabsContent value="all" className="mt-4 space-y-4">
                {isLoading ? (
                  <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                    <div className="text-center">
                      <h3 className="text-lg font-medium">
                        Loading projects...
                      </h3>
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
                                <Progress
                                  value={project.progress}
                                  className="h-2"
                                />
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
              </TabsContent>
            </Tabs>
          </div>

          <div className="md:w-1/3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
                <CardDescription>
                  Your project statistics at a glance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Total Projects
                    </p>
                    <p className="text-2xl font-bold">{projects.length}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">
                      {projects.filter((p) => p.progress === 100).length}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold">
                      {
                        projects.filter(
                          (p) => p.progress > 0 && p.progress < 100
                        ).length
                      }
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Not Started</p>
                    <p className="text-2xl font-bold">
                      {projects.filter((p) => p.progress === 0).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Projects due soon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingDeadlines.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      No upcoming deadlines
                    </p>
                  </div>
                ) : (
                  upcomingDeadlines.map((project) => {
                    const daysRemaining = getDaysRemaining(project);
                    const isUrgent =
                      typeof daysRemaining === "string" &&
                      (daysRemaining === "Overdue" ||
                        (daysRemaining.includes("days") &&
                          parseInt(daysRemaining) < 7));

                    return (
                      <div
                        key={project.id}
                        className="flex justify-between items-center"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Due{" "}
                            {project.timeEstimate
                              ? formatDate(project.timeEstimate.dueDate)
                              : formatDate(project.dueDate)}
                          </p>
                        </div>
                        <Badge variant={isUrgent ? "destructive" : "outline"}>
                          {daysRemaining}
                        </Badge>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
