import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TeamMemberCardProps {
  employee: {
    id: string
    name: string
    email: string
    role: string
    skills: string[]
    location: string
    avatar?: string
  }
  getInitials: (name: string) => string
}

export default function TeamMemberCard({ employee, getInitials }: TeamMemberCardProps) {
  return (
    <Card className="border-gray-200 dark:border-gray-800 transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">{employee.name}</CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">{employee.role}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Email:</span> {employee.email}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Location:</span> {employee.location}
          </p>
          <div className="flex flex-wrap gap-2">
            {employee.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

