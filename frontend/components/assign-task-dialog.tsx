"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { API_URL } from "@/app/lib/server-config"

interface Employee {
  id: string
  name: string
  role: string
}

interface AssignTaskDialogProps {
  isOpen: boolean
  onClose: () => void
  taskId: string
  onTaskAssigned: () => void
}

export function AssignTaskDialog({ isOpen, onClose, taskId, onTaskAssigned }: AssignTaskDialogProps) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsFetching(true)
      try {
        const response = await fetch(`${API_URL}/employees/all/${localStorage.getItem("adminId")}`, {
          method: "GET",
          headers: {
            "x-api-key": "thisisasdca",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch employees")
        }

        const data = await response.json()
        setEmployees(data.data || [])
      } catch (error) {
        console.error("Error fetching employees:", error)
        toast({
          title: "Error",
          description: "Failed to load employees",
          variant: "destructive",
        })
      } finally {
        setIsFetching(false)
      }
    }

    if (isOpen) {
      fetchEmployees()
    }
  }, [isOpen])

  const handleAssignTask = async () => {
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
      const response = await fetch(`${API_URL}/employees/add-task`, {
        method: "POST",
        headers: {
          "x-api-key": "thisisasdca",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          employeeId: selectedEmployee,
          taskId: taskId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to assign task")
      }

      toast({
        title: "Success",
        description: "Task assigned successfully",
      })
      onTaskAssigned()
      onClose()
    } catch (error) {
      console.error("Error assigning task:", error)
      toast({
        title: "Error",
        description: "Failed to assign task",
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
          <DialogTitle>Assign Task</DialogTitle>
          <DialogDescription>Select an employee to assign this task to.</DialogDescription>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="py-4">
          {isFetching ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                  {selectedEmployee
                    ? employees.find((employee) => employee.id === selectedEmployee)?.name
                    : "Select employee..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput placeholder="Search employee..." />
                  <CommandList>
                    <CommandEmpty>No employee found.</CommandEmpty>
                    <CommandGroup className="max-h-[300px] overflow-y-auto">
                      {employees.map((employee) => (
                        <CommandItem
                          key={employee.id}
                          value={employee.id}
                          onSelect={(currentValue) => {
                            setSelectedEmployee(currentValue === selectedEmployee ? "" : employee.id)
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedEmployee === employee.id ? "opacity-100" : "opacity-0",
                            )}
                          />
                          <div className="flex flex-col">
                            <span>{employee.name}</span>
                            <span className="text-xs text-muted-foreground">{employee.role}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAssignTask} disabled={isLoading || !selectedEmployee}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assign Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

