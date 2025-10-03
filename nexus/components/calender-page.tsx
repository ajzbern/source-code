
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  startOfWeek,
  endOfWeek,
  addDays,
  isBefore,
  isAfter,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Plus,
  Filter,
  CalendarDays,
  CalendarRange,
  ListTodo,
  User,
  Tag,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest } from "@/app/lib/server_config";
import { calculateProjectDueDate } from "@/app/lib/date_helpers";

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  due: string;
  projectId: string;
  projectName: string;
  assignedEmployees?: Array<{
    id: string;
    name: string;
  }>;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  dueDate?: string;
  timeEstimate?: {
    dueDate: Date;
  };
  completionStatus: string;
  priority: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: "task" | "project";
  priority: string;
  status: string;
  projectId?: string;
  projectName?: string;
  description?: string;
  assignedEmployees?: Array<{
    id: string;
    name: string;
  }>;
}

type CalendarView = "month" | "week" | "day" | "list";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [calendarView, setCalendarView] = useState<CalendarView>("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterPriority, setFilterPriority] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string[]>([]);
  const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  const dragTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Get days for the current month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get days for the current week view
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Get hours for day view
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Apply filters to events
  useEffect(() => {
    let filtered = [...events];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (event.description &&
            event.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (event.projectName &&
            event.projectName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply status filter
    if (filterStatus.length > 0) {
      filtered = filtered.filter((event) =>
        filterStatus.includes(event.status)
      );
    }

    // Apply priority filter
    if (filterPriority.length > 0) {
      filtered = filtered.filter((event) =>
        filterPriority.includes(event.priority)
      );
    }

    // Apply type filter
    if (filterType.length > 0) {
      filtered = filtered.filter((event) => filterType.includes(event.type));
    }

    setFilteredEvents(filtered);
  }, [events, searchQuery, filterStatus, filterPriority, filterType]);

  // Get events for the selected day
  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter((event) => isSameDay(event.date, day));
  };

  // Get events for the selected hour
  const getEventsForHour = (day: Date, hour: number) => {
    const eventsForDay = getEventsForDay(day);
    return eventsForDay.filter((event) => {
      const eventHour = event.date.getHours();
      return eventHour === hour;
    });
  };

  // Navigate to previous period
  const prevPeriod = () => {
    if (calendarView === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (calendarView === "week") {
      setCurrentDate(addDays(currentDate, -7));
    } else if (calendarView === "day") {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  // Navigate to next period
  const nextPeriod = () => {
    if (calendarView === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (calendarView === "week") {
      setCurrentDate(addDays(currentDate, 7));
    } else if (calendarView === "day") {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Open event details dialog
  const openEventDetails = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  // Open create task dialog
  const openCreateTaskDialog = (day: Date) => {
    setSelectedDay(day);
    setIsCreateTaskDialogOpen(true);
  };

  // Get priority color class
  const getPriorityColorClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500 border-red-600";
      case "medium":
        return "bg-amber-500 border-amber-600";
      case "low":
        return "bg-green-500 border-green-600";
      default:
        return "bg-blue-500 border-blue-600";
    }
  };

  // Get status color class
  const getStatusColorClass = (status: string) => {
    switch (status.toUpperCase()) {
      case "DONE":
        return "bg-green-500 border-green-600";
      case "IN_PROGRESS":
        return "bg-blue-500 border-blue-600";
      case "ASSIGNED":
        return "bg-amber-500 border-amber-600";
      case "NOT_STARTED":
        return "bg-slate-500 border-slate-600";
      default:
        return "bg-gray-500 border-gray-600";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case "DONE":
        return <CheckCircle2 className="h-3 w-3" />;
      case "IN_PROGRESS":
        return <Clock3 className="h-3 w-3" />;
      case "ASSIGNED":
        return <User className="h-3 w-3" />;
      case "NOT_STARTED":
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  // Navigate to project or task details
  const navigateToDetails = () => {
    if (!selectedEvent) return;

    if (selectedEvent.type === "project") {
      router.push(`/projects/${selectedEvent.id}`);
    } else {
      router.push(`/projects/${selectedEvent.projectId}?task=${selectedEvent.id}`);
    }
    setIsEventDialogOpen(false);
  };

  // Handle drag start
  const handleDragStart = (event: CalendarEvent) => {
    setDraggedEvent(event);
  };

  // Handle drag over
  const handleDragOver = (day: Date) => {
    setHoveredDay(day);

    // Clear any existing timeout
    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current);
    }

    // Set a new timeout
    dragTimeoutRef.current = setTimeout(() => {
      setHoveredDay(null);
    }, 100);
  };

  // Handle drop
  const handleDrop = (day: Date) => {
    if (draggedEvent) {
      console.log(`Moving task ${draggedEvent.title} to ${format(day, "yyyy-MM-dd")}`);

      // Update the event in the local state
      const updatedEvents = events.map((event) => {
        if (event.id === draggedEvent.id) {
          const newDate = new Date(day);
          newDate.setHours(event.date.getHours());
          newDate.setMinutes(event.date.getMinutes());
          return { ...event, date: newDate };
        }
        return event;
      });

      setEvents(updatedEvents);
      setDraggedEvent(null);
      setHoveredDay(null);
    }
  };

  // Toggle filter status
  const toggleFilterStatus = (status: string) => {
    setFilterStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  // Toggle filter priority
  const toggleFilterPriority = (priority: string) => {
    setFilterPriority((prev) =>
      prev.includes(priority) ? prev.filter((p) => p !== priority) : [...prev, priority]
    );
  };

  // Toggle filter type
  const toggleFilterType = (type: string) => {
    setFilterType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setFilterStatus([]);
    setFilterPriority([]);
    setFilterType([]);
  };

  // Format date range for header
  const formatDateRange = () => {
    if (calendarView === "month") {
      return format(currentDate, "MMMM yyyy");
    } else if (calendarView === "week") {
      return `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`;
    } else if (calendarView === "day") {
      return format(currentDate, "EEEE, MMMM d, yyyy");
    } else {
      return "Task List";
    }
  };

  // Get overdue tasks
  const getOverdueTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return filteredEvents
      .filter(
        (event) =>
          event.type === "task" &&
          event.status !== "DONE" &&
          isBefore(event.date, today)
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Get upcoming tasks
  const getUpcomingTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    return filteredEvents
      .filter(
        (event) =>
          event.type === "task" &&
          event.status !== "DONE" &&
          isAfter(event.date, today) &&
          isBefore(event.date, nextWeek)
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  useEffect(() => {
    const fetchCalendarData = async () => {
      setIsLoading(true);
      try {
        const employeeId = localStorage.getItem("employeeId");
        if (employeeId) {
          const response = await apiRequest(`/employees/dashboard/${employeeId}`, {
            method: "GET",
          });

          if (response && response.success && response.data) {
            const calendarEvents: CalendarEvent[] = [];

            // Process projects
            response.data.forEach((project: any) => {
              // Add project due date
              if (project.dueDate) {
                calendarEvents.push({
                  id: project.id,
                  title: `${project.name} Due`,
                  date: new Date(project.dueDate),
                  type: "project",
                  priority: project.priority || "Medium",
                  status: project.completionStatus || "IN_PROGRESS",
                  description: project.description || "",
                });
              } else if (project.createdAt && project.timeEstimate) {
                const estimatedDueDate = calculateProjectDueDate(
                  project.createdAt,
                  project.timeEstimate,
                  {
                    workingHoursPerDay: 8,
                  }
                );

                if (estimatedDueDate && estimatedDueDate.dueDate) {
                  calendarEvents.push({
                    id: project.id,
                    title: `${project.name} Due (Estimated)`,
                    date: estimatedDueDate.dueDate,
                    type: "project",
                    priority: project.priority || "Medium",
                    status: project.completionStatus || "IN_PROGRESS",
                    description: project.description || "",
                  });
                }
              }

              // Add tasks
              if (project.tasks && project.tasks.length > 0) {
                project.tasks.forEach((task: any) => {
                  if (task.due) {
                    const taskDate = new Date(task.due);
                    taskDate.setHours(9 + Math.floor(Math.random() * 8)); // Between 9 AM and 5 PM

                    calendarEvents.push({
                      id: task.id,
                      title: task.name,
                      date: taskDate,
                      type: "task",
                      priority: task.priority || "Medium",
                      status: task.status || "ASSIGNED",
                      projectId: project.id,
                      projectName: project.name,
                      description: task.description || "",
                      assignedEmployees: task.assignedEmployees || [],
                    });
                  }
                });
              }
            });

            setEvents(calendarEvents);
            setFilteredEvents(calendarEvents);
          }
        } else {
          localStorage.removeItem("employeeId");
          localStorage.removeItem("authToken");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        localStorage.removeItem("employeeId");
        localStorage.removeItem("authToken");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendarData();
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
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={prevPeriod}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={nextPeriod}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            
          </div>
        </div>

        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks and events..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                {(filterStatus.length > 0 ||
                  filterPriority.length > 0 ||
                  filterType.length > 0) && (
                  <Badge
                    variant="secondary"
                    className="ml-1 rounded-full px-1 py-0 text-xs"
                  >
                    {filterStatus.length + filterPriority.length + filterType.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterStatus.includes("DONE")}
                onCheckedChange={() => toggleFilterStatus("DONE")}
              >
                Completed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus.includes("IN_PROGRESS")}
                onCheckedChange={() => toggleFilterStatus("IN_PROGRESS")}
              >
                In Progress
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus.includes("ASSIGNED")}
                onCheckedChange={() => toggleFilterStatus("ASSIGNED")}
              >
                Assigned
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus.includes("NOT_STARTED")}
                onCheckedChange={() => toggleFilterStatus("NOT_STARTED")}
              >
                Not Started
              </DropdownMenuCheckboxItem>

              <DropdownMenuLabel className="mt-2">Filter by Priority</DropdownMenuLabel>
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

              <DropdownMenuLabel className="mt-2">Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterType.includes("task")}
                onCheckedChange={() => toggleFilterType("task")}
              >
                Tasks
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterType.includes("project")}
                onCheckedChange={() => toggleFilterType("project")}
              >
                Project Deadlines
              </DropdownMenuCheckboxItem>

              <DropdownMenuSeparator />
              <div className="p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{formatDateRange()}</CardTitle>
            <CardDescription>
              {filteredEvents.length} events •{" "}
              {filteredEvents.filter((e) => e.type === "task").length} tasks •{" "}
              {filteredEvents.filter((e) => e.type === "project").length} project deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-[500px] items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium">Loading calendar...</h3>
                  <p className="text-sm text-muted-foreground">
                    Please wait while we fetch your schedule.
                  </p>
                </div>
              </div>
            ) : (
              <Tabs
                value={calendarView}
                onValueChange={(value) => setCalendarView(value as CalendarView)}
                className="w-full"
              >
                <TabsList className="mb-4">
                  <TabsTrigger value="month" className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Month</span>
                  </TabsTrigger>
                  <TabsTrigger value="week" className="flex items-center gap-1">
                    <CalendarRange className="h-4 w-4" />
                    <span className="hidden sm:inline">Week</span>
                  </TabsTrigger>
                  <TabsTrigger value="day" className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span className="hidden sm:inline">Day</span>
                  </TabsTrigger>
                  <TabsTrigger value="list" className="flex items-center gap-1">
                    <ListTodo className="h-4 w-4" />
                    <span className="hidden sm:inline">List</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="month" className="mt-0">
                  <div className="grid grid-cols-7 gap-1">
                    {/* Day headers */}
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="p-2 text-center font-medium">
                        {day}
                      </div>
                    ))}

                    {/* Calendar days */}
                    {monthDays.map((day, i) => {
                      const dayEvents = getEventsForDay(day);
                      const isCurrentMonth = isSameMonth(day, currentDate);
                      const isCurrentDay = isToday(day);
                      const isHovered = hoveredDay ? isSameDay(day, hoveredDay) : false;

                      return (
                        <div
                          key={i}
                          className={cn(
                            "min-h-[120px] border p-1 transition-colors",
                            isCurrentMonth ? "bg-background" : "bg-muted/30",
                            isCurrentDay ? "border-primary" : "border-border",
                            isHovered && "bg-primary/10 border-primary/50",
                            "relative group"
                          )}
                          onDragOver={(e) => {
                            e.preventDefault();
                            handleDragOver(day);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            handleDrop(day);
                          }}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span
                              className={cn(
                                "text-sm font-medium",
                                isCurrentDay ? "text-primary" : "",
                                !isCurrentMonth ? "text-muted-foreground" : ""
                              )}
                            >
                              {format(day, "d")}
                            </span>
                            {dayEvents.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {dayEvents.length}
                              </Badge>
                            )}
                          </div>

                          <ScrollArea className="h-[90px]">
                            <div className="space-y-1">
                              {dayEvents.map((event) => (
                                <TooltipProvider key={event.id}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div
                                        className={cn(
                                          "text-xs p-1 rounded text-white cursor-pointer truncate border-l-2 flex items-center gap-1 animate-in fade-in-50 duration-300",
                                          event.type === "project"
                                            ? getPriorityColorClass(event.priority)
                                            : getStatusColorClass(event.status)
                                        )}
                                        onClick={() =>openEventDetails(event)}
                                        draggable={event.type === "task"}
                                        onDragStart={() => handleDragStart(event)}
                                      >
                                        {event.type === "task" ? (
                                          getStatusIcon(event.status)
                                        ) : (
                                          <CalendarIcon className="h-3 w-3" />
                                        )}
                                        <span className="flex-1 truncate">{event.title}</span>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                      <div className="space-y-1">
                                        <p className="font-semibold">{event.title}</p>
                                        <p className="text-xs">
                                          {event.type === "task"
                                            ? `Project: ${event.projectName}`
                                            : "Project Deadline"}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs">
                                          <Tag className="h-3 w-3" />
                                          <span>Priority: {event.priority}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                          <Clock className="h-3 w-3" />
                                          <span>{format(event.date, "h:mm a")}</span>
                                        </div>
                                        {event.assignedEmployees && event.assignedEmployees.length > 0 && (
                                          <div className="flex items-center gap-1 text-xs">
                                            <User className="h-3 w-3" />
                                            <span>
                                              Assigned: {event.assignedEmployees.map((e) => e.name).join(", ")}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ))}
                            </div>
                          </ScrollArea>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute bottom-1 right-1 h-5 w-5 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={() => openCreateTaskDialog(day)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="week" className="mt-0">
                  <div className="grid grid-cols-7 gap-1">
                    {/* Day headers */}
                    {weekDays.map((day) => (
                      <div key={day.toString()} className="p-2 text-center">
                        <div className="font-medium">{format(day, "EEE")}</div>
                        <div
                          className={cn(
                            "text-sm rounded-full w-7 h-7 flex items-center justify-center mx-auto",
                            isToday(day) ? "bg-primary text-primary-foreground" : ""
                          )}
                        >
                          {format(day, "d")}
                        </div>
                      </div>
                    ))}

                    {/* Week view */}
                    {weekDays.map((day) => {
                      const dayEvents = getEventsForDay(day);
                      const isCurrentDay = isToday(day);
                      const isHovered = hoveredDay ? isSameDay(day, hoveredDay) : false;

                      return (
                        <div
                          key={day.toString()}
                          className={cn(
                            "min-h-[400px] border p-1",
                            isCurrentDay ? "border-primary bg-primary/5" : "border-border",
                            isHovered && "bg-primary/10 border-primary/50"
                          )}
                          onDragOver={(e) => {
                            e.preventDefault();
                            handleDragOver(day);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            handleDrop(day);
                          }}
                        >
                          <ScrollArea className="h-[400px]">
                            <div className="space-y-1 p-1">
                              {dayEvents.map((event) => (
                                <div
                                  key={event.id}
                                  className={cn(
                                    "text-xs p-2 rounded text-white cursor-pointer border-l-2 flex flex-col gap-1 animate-in fade-in-50 duration-300",
                                    event.type === "project"
                                      ? getPriorityColorClass(event.priority)
                                      : getStatusColorClass(event.status)
                                  )}
                                  onClick={() => openEventDetails(event)}
                                  draggable={event.type === "task"}
                                  onDragStart={() => handleDragStart(event)}
                                >
                                  <div className="flex items-center gap-1">
                                    {event.type === "task" ? (
                                      getStatusIcon(event.status)
                                    ) : (
                                      <CalendarIcon className="h-3 w-3" />
                                    )}
                                    <span className="font-medium">{event.title}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-xs opacity-90">
                                    <Clock className="h-3 w-3" />
                                    <span>{format(event.date, "h:mm a")}</span>
                                  </div>
                                  {event.type === "task" && (
                                    <div className="text-xs opacity-90 truncate">{event.projectName}</div>
                                  )}
                                  {event.assignedEmployees && event.assignedEmployees.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {event.assignedEmployees.slice(0, 3).map((employee) => (
                                        <Avatar key={employee.id} className="h-5 w-5">
                                          <AvatarFallback className="text-[10px]">
                                            {employee.name.split(" ").map((n) => n[0]).join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                      ))}
                                      {event.assignedEmployees.length > 3 && (
                                        <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[10px]">
                                          +{event.assignedEmployees.length - 3}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </ScrollArea>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute bottom-1 right-1 h-5 w-5 rounded-full opacity-0 transition-opacity hover:opacity-100 focus:opacity-100"
                            onClick={() => openCreateTaskDialog(day)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="day" className="mt-0">
                  <div className="flex flex-col">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-medium">{format(currentDate, "EEEE, MMMM d, yyyy")}</h3>
                      <p className="text-sm text-muted-foreground">
                        {getEventsForDay(currentDate).length} events scheduled
                      </p>
                    </div>

                    <div className="grid grid-cols-[80px_1fr] gap-2">
                      {/* Hours */}
                      <div className="space-y-4">
                        {hours.map((hour) => (
                          <div
                            key={hour}
                            className="h-20 text-right pr-2 text-sm text-muted-foreground"
                          >
                            {hour === 0
                              ? "12 AM"
                              : hour < 12
                              ? `${hour} AM`
                              : hour === 12
                              ? "12 PM"
                              : `${hour - 12} PM`}
                          </div>
                        ))}
                      </div>

                      {/* Events */}
                      <div className="border rounded-md relative">
                        {hours.map((hour) => (
                          <div
                            key={hour}
                            className="h-20 border-b last:border-b-0 relative"
                            onDragOver={(e) => {
                              e.preventDefault();
                              const hourDate = new Date(currentDate);
                              hourDate.setHours(hour);
                              handleDragOver(hourDate);
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              const hourDate = new Date(currentDate);
                              hourDate.setHours(hour);
                              handleDrop(hourDate);
                            }}
                          >
                            {getEventsForHour(currentDate, hour).map((event) => (
                              <div
                                key={event.id}
                                className={cn(
                                  "absolute left-1 right-1 p-2 rounded text-white cursor-pointer border-l-2 flex flex-col gap-1 animate-in fade-in-50 duration-300 z-10",
                                  event.type === "project"
                                    ? getPriorityColorClass(event.priority)
                                    : getStatusColorClass(event.status)
                                )}
                                style={{
                                  top: `${(event.date.getMinutes() / 60) * 100}%`,
                                  height: "calc(100% - 4px)",
                                }}
                                onClick={() => openEventDetails(event)}
                                draggable={event.type === "task"}
                                onDragStart={() => handleDragStart(event)}
                              >
                                <div className="flex items-center gap-1">
                                  {event.type === "task" ? (
                                    getStatusIcon(event.status)
                                  ) : (
                                    <CalendarIcon className="h-3 w-3" />
                                  )}
                                  <span className="font-medium">{event.title}</span>
                                </div>
                                {event.type === "task" && (
                                  <div className="text-xs opacity-90 truncate">{event.projectName}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        ))}

                        {isToday(currentDate) && (
                          <div
                            className="absolute left-0 right-0 border-t border-red-500 z-20"
                            style={{
                              top: `${
                                (new Date().getHours() + new Date().getMinutes() / 60) * 20
                              }px`,
                            }}
                          >
                            <div className="w-2 h-2 rounded-full bg-red-500 -mt-1 -ml-1"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="list" className="mt-0">
                  <div className="space-y-6">
                    {/* Overdue tasks */}
                    <div>
                      <h3 className="text-lg font-medium text-destructive mb-2 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        Overdue Tasks
                      </h3>

                      {getOverdueTasks().length === 0 ? (
                        <div className="text-sm text-muted-foreground">No overdue tasks</div>
                      ) : (
                        <div className="space-y-2">
                          {getOverdueTasks().map((event) => (
                            <Card key={event.id} className="overflow-hidden">
                              <div
                                className={cn(
                                  "h-1",
                                  event.type === "project"
                                    ? getPriorityColorClass(event.priority)
                                    : getStatusColorClass(event.status)
                                )}
                              />
                              <CardHeader className="p-4">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <CardTitle className="text-base">{event.title}</CardTitle>
                                    <CardDescription>{event.projectName}</CardDescription>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant="outline"
                                      className="text-destructive border-destructive"
                                    >
                                      Overdue
                                    </Badge>
                                    <Badge
                                      variant={event.priority === "High" ? "destructive" : "outline"}
                                    >
                                      {event.priority}
                                    </Badge>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>Due {format(event.date, "PPP")}</span>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openEventDetails(event)}
                                  >
                                    View Details
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Today's tasks */}
                    <div>
                      <h3 className="text-lg font-medium text-primary mb-2 flex items-center gap-2">
                        <CalendarDays className="h-5 w-5" />
                        Today
                      </h3>

                      {getEventsForDay(new Date()).length === 0 ? (
                        <div className="text-sm text-muted-foreground">
                          No tasks scheduled for today
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {getEventsForDay(new Date())
                            .sort((a, b) => a.date.getTime() - b.date.getTime())
                            .map((event) => (
                              <Card key={event.id} className="overflow-hidden">
                                <div
                                  className={cn(
                                    "h-1",
                                    event.type === "project"
                                      ? getPriorityColorClass(event.priority)
                                      : getStatusColorClass(event.status)
                                  )}
                                />
                                <CardHeader className="p-4">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <CardTitle className="text-base">{event.title}</CardTitle>
                                      <CardDescription>
                                        {event.type === "task" ? event.projectName : "Project Deadline"}
                                      </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant={event.status === "DONE" ? "default" : "outline"}
                                        className={
                                          event.status === "DONE" ? "bg-green-500 hover:bg-green-500/90" : ""
                                        }
                                      >
                                        {event.status.replace("_", " ")}
                                      </Badge>
                                      <Badge
                                        variant={event.priority === "High" ? "destructive" : "outline"}
                                      >
                                        {event.priority}
                                      </Badge>
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                  <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-muted-foreground" />
                                      <span>{format(event.date, "h:mm a")}</span>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => openEventDetails(event)}
                                    >
                                      View Details
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* Upcoming tasks */}
                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                        <CalendarRange className="h-5 w-5" />
                        Upcoming (Next 7 Days)
                      </h3>

                      {getUpcomingTasks().length === 0 ? (
                        <div className="text-sm text-muted-foreground">
                          No upcoming tasks in the next 7 days
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {getUpcomingTasks().map((event) => (
                            <Card key={event.id} className="overflow-hidden">
                              <div
                                className={cn(
                                  "h-1",
                                  event.type === "project"
                                    ? getPriorityColorClass(event.priority)
                                    : getStatusColorClass(event.status)
                                )}
                              />
                              <CardHeader className="p-4">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <CardTitle className="text-base">{event.title}</CardTitle>
                                    <CardDescription>
                                      {event.type === "task" ? event.projectName : "Project Deadline"}
                                    </CardDescription>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      variant={event.status === "DONE" ? "default" : "outline"}
                                    >
                                      {event.status.replace("_", " ")}
                                    </Badge>
                                    <Badge
                                      variant={event.priority === "High" ? "destructive" : "outline"}
                                    >
                                      {event.priority}
                                    </Badge>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>Due {format(event.date, "EEE, MMM d")}</span>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openEventDetails(event)}
                                  >
                                    View Details
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Event Details Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedEvent?.type === "task" ? (
                <>
                  {getStatusIcon(selectedEvent?.status || "")}
                  <span>{selectedEvent?.title}</span>
                </>
              ) : (
                <>
                  <CalendarIcon className="h-5 w-5" />
                  <span>{selectedEvent?.title}</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedEvent?.type === "task" ? "Task Details" : "Project Deadline"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedEvent && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Type</p>
                    <Badge variant="outline" className="mt-1">
                      {selectedEvent.type === "task" ? "Task" : "Project Deadline"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <p className="text-sm mt-1">{format(selectedEvent.date, "PPP")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <p className="text-sm mt-1">{format(selectedEvent.date, "h:mm a")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Priority</p>
                    <Badge
                      variant={selectedEvent.priority.toLowerCase() === "high" ? "destructive" : "default"}
                      className="mt-1"
                    >
                      {selectedEvent.priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge
                      variant={selectedEvent.status === "DONE" ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {selectedEvent.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>

                {selectedEvent.type === "task" && selectedEvent.projectName && (
                  <div>
                    <p className="text-sm font-medium">Project</p>
                    <p className="text-sm mt-1">{selectedEvent.projectName}</p>
                  </div>
                )}

                {selectedEvent.assignedEmployees && selectedEvent.assignedEmployees.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Assigned To</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedEvent.assignedEmployees.map((employee) => (
                        <div key={employee.id} className="flex items-center gap-1 text-sm">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>
                              {employee.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{employee.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm mt-1 whitespace-pre-line">
                    {selectedEvent.description || "No description available"}
                  </p>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={navigateToDetails}>View Details</Button>
                </DialogFooter>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      
    </div>
  );
}
