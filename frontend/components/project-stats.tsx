import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, Users } from "lucide-react"

interface ProjectStatsProps {
  project: {
    tasks: any[]
    employeesWorkingOn: any[]
    documents: any[]
    timeEstimate: number
  }
}

export default function ProjectStats({ project }: ProjectStatsProps) {
  const completedTasks = project.tasks.filter((t) => t.status === "COMPLETED").length
  const totalTasks = project.tasks.length
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {completedTasks}/{totalTasks}
          </div>
          <p className="text-xs text-muted-foreground">{completionPercentage}% completion rate</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
            <div className="h-full rounded-full bg-blue-500" style={{ width: `${completionPercentage}%` }}></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Team Members</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{project.employeesWorkingOn.length}</div>
          <p className="text-xs text-muted-foreground">Working on this project</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Documents</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{project.documents.length}</div>
          <p className="text-xs text-muted-foreground">Project documentation</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Time Estimate</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{project.timeEstimate}h</div>
          <p className="text-xs text-muted-foreground">Estimated completion time</p>
        </CardContent>
      </Card>
    </div>
  )
}

