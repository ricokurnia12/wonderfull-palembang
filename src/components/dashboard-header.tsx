"use client"

import type React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface DashboardHeaderProps {
  heading: string
  description?: string
  action?: React.ReactNode
}

export function DashboardHeader({ heading, description, action }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hidden md:flex" />
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
