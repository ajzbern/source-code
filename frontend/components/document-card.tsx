"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText } from "lucide-react"

interface DocumentCardProps {
  document: {
    id: string
    name: string
    description: string
    body: string
    createdBy: string
    createdAt: string
    status: string
  }
  getStatusColor: (status: string) => string
  formatDate: (dateString: string) => string
  onView: (documentId: string) => void
  onDownload: (document: any) => void
}

export default function DocumentCard({ document, getStatusColor, formatDate, onView, onDownload }: DocumentCardProps) {
  return (
    <Card className="border-gray-200 dark:border-gray-800 transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">{document.name}</CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              {document.description}
            </CardDescription>
          </div>
          <FileText className="h-5 w-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2">
          <div className={`inline-block rounded-md border px-2 py-1 text-xs ${getStatusColor(document.status)}`}>
            {document.status.replace(/_/g, " ")}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Created by: {document.createdBy}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Created: {formatDate(document.createdAt)}</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onView(document.id)}>
          View Document
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDownload(document)}>
          <Download className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

