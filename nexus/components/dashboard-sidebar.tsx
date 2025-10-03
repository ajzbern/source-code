import type React from "react"
import { BarChart3, CheckCircle2, Clock, Inbox, LayoutDashboard, ListTodo, Settings, Star, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface SidebarItemProps {
  icon: React.ReactNode
  title: string
  href: string
  isActive?: boolean
  badge?: number
}

function SidebarItem({ icon, title, href, isActive, badge }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {icon}
      <span>{title}</span>
      {badge !== undefined && (
        <span
          className={cn(
            "ml-auto rounded-full px-2 py-0.5 text-xs",
            isActive ? "bg-primary/20 text-primary" : "bg-muted-foreground/20 text-muted-foreground",
          )}
        >
          {badge}
        </span>
      )}
    </Link>
  )
}

export function DashboardSidebar() {
  return (
    <div className="hidden md:flex w-64 flex-col border-r bg-background p-4">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Overview</h2>
          <div className="space-y-1">
            <SidebarItem icon={<LayoutDashboard className="h-4 w-4" />} title="Dashboard" href="/dashboard" />
            <SidebarItem icon={<Inbox className="h-4 w-4" />} title="Inbox" href="#" badge={5} />
            <SidebarItem icon={<BarChart3 className="h-4 w-4" />} title="Reports" href="#" />
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tasks</h2>
          <div className="space-y-1">
            <SidebarItem icon={<ListTodo className="h-4 w-4" />} title="All Tasks" href="#" isActive={true} badge={8} />
            <SidebarItem icon={<Clock className="h-4 w-4" />} title="In Progress" href="#" badge={2} />
            <SidebarItem icon={<CheckCircle2 className="h-4 w-4" />} title="Completed" href="#" badge={6} />
            <SidebarItem icon={<Star className="h-4 w-4" />} title="Important" href="#" badge={3} />
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Workspace</h2>
          <div className="space-y-1">
            <SidebarItem icon={<Users className="h-4 w-4" />} title="Team" href="#" />
            <SidebarItem icon={<Settings className="h-4 w-4" />} title="Settings" href="#" />
          </div>
        </div>
      </div>
    </div>
  )
}

