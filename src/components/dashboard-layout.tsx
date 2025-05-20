"use client"

import type React from "react"

import { useState } from "react"
import { MainNav } from "./main-nav"
import { SidebarNav } from "./sidebar-nav"
import { MobileNav } from "./mobile-nav"
import { SidebarProvider,SidebarInset } from "./ui/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true)

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen flex-col ">
        <header className="sticky top-0 z-40 border-b  md:hidden">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav />
            <MobileNav />
          </div>
        </header>
        <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr]">
          <SidebarNav />
          <SidebarInset>
            <main className="flex w-full flex-col overflow-scroll">
              <div className="container flex- space-y-4 p-8 pt-6">{children}</div>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
