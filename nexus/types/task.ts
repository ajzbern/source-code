
export type TaskPriority = "low" | "medium" | "high"

export interface TaskComment {
  id: string
  author: string
  content: string
  createdAt: string
}

export type TaskStatus = "ASSIGNED" | "IN_PROGRESS" | "COMPLETED"; // Adjust based on your API
export interface Commentd {
  id: string;
  user: { name: string; avatar?: string; initials: string };
  text: string;
  timestamp: string;
}
export interface Task {
  id: string;
  createdAt: string;
  updatedAt: string;
  due: string;
  name: string;
  description: string;
  tag: string;
  tags?: string[]; // Add tags as an optional array of strings
  status: "ASSIGNED" | "IN_PROGRESS" | "DONE";
  priority: "High" | "Medium" | "Low";
  projectId: string;
  ownerId: string;
  comments?: Commentd[];
  assignedEmployees: AssignedEmployee[];
  title?: string;
  uiStatus?: "todo" | "in-progress" | "completed";
}

export interface AssignedEmployee {
  id: string;
  name: string;
}