"use client"

import { useState } from "react"
import { Loader2, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { API_URL } from "@/app/lib/server-config"

interface UnassignTaskDialogProps {
  isOpen: boolean
  onClose: () => void
  task: any
  onTaskUnassigned: () => void
}

export function UnassignTaskDialog({ isOpen, onClose, task, onTaskUnassigned }: UnassignTaskDialogProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleUnassignTask = async () => {
    if (!selectedEmployee) {
      toast({
        title: "Error",
        description: "Please select an employee",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/employees/remove-task`, {
        method: "POST",
        headers: {
          "x-api-key": "thisisasdca",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          employeeId: selectedEmployee,
          taskId: task.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to unassign task")
      }

      toast({
        title: "Success",
        description: "Task unassigned successfully",
      })
      onTaskUnassigned()
      onClose()
    } catch (error) {
      console.error("Error unassigning task:", error)
      toast({
        title: "Error",
        description: "Failed to unassign task",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Unassign Task</DialogTitle>
          <DialogDescription>Select an employee to remove this task from.</DialogDescription>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="py-4">
          <Select onValueChange={setSelectedEmployee} value={selectedEmployee}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select employee" />
            </SelectTrigger>
            <SelectContent>
              {task.assignees && task.assignees.length > 0 ? (
                task.assignees.map((assignee: any) => (
                  <SelectItem key={assignee.id} value={assignee.id}>
                    {assignee.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>
                  No assigned employees
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleUnassignTask} disabled={isLoading || !selectedEmployee}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Unassign Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

