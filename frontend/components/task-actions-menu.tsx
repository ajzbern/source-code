"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Trash2, UserPlus, UserMinus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { API_URL } from "@/app/lib/server-config"
import { TaskDialog } from "./task-dialog"
import { AssignTaskDialog } from "./assign-task-dialog"
import { UnassignTaskDialog } from "./unassign-task-dialog"

interface TaskActionsMenuProps {
  task: any
  onTaskUpdated: () => void
}

export function TaskActionsMenu({ task, onTaskUpdated }: TaskActionsMenuProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [isUnassignDialogOpen, setIsUnassignDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteTask = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": "thisisasdca",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete task")
      }

      toast({
        title: "Task deleted",
        description: "The task has been successfully deleted.",
      })

      onTaskUpdated()
    } catch (error) {
      console.error("Error deleting task:", error)
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsAssignDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Assign to Employee
          </DropdownMenuItem>
          {task.assignees && task.assignees.length > 0 && (
            <DropdownMenuItem onClick={() => setIsUnassignDialogOpen(true)}>
              <UserMinus className="mr-2 h-4 w-4" />
              Unassign from Employee
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task and remove it from all assigned
              employees.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTask}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Task Dialog */}
      <TaskDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        task={task}
        onTaskSaved={onTaskUpdated}
      />

      {/* Assign Task Dialog */}
      <AssignTaskDialog
        isOpen={isAssignDialogOpen}
        onClose={() => setIsAssignDialogOpen(false)}
        taskId={task.id}
        onTaskAssigned={onTaskUpdated}
      />

      {/* Unassign Task Dialog */}
      <UnassignTaskDialog
        isOpen={isUnassignDialogOpen}
        onClose={() => setIsUnassignDialogOpen(false)}
        task={task}
        onTaskUnassigned={onTaskUpdated}
      />
    </>
  )
}

