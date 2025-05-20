"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Calendar,
  LayoutDashboard,
  ListMusic,
  Menu,
  Palette,
  Settings,
  Theater,
  Users,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 sm:max-w-xs">
        <div className="flex items-center gap-2 px-4 py-2">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EventHub</span>
          </Link>
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
          <div className="px-2 py-4">
            <div className="space-y-1">
              <h3 className="px-4 text-sm font-medium text-muted-foreground">Overview</h3>
              <nav className="grid gap-1 py-2">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/" ? "bg-accent" : "hover:bg-accent"
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/events"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/events" ? "bg-accent" : "hover:bg-accent"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Events</span>
                </Link>
                <Link
                  href="/analytics"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/analytics" ? "bg-accent" : "hover:bg-accent"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </nav>
            </div>
            <div className="space-y-1 pt-4">
              <h3 className="px-4 text-sm font-medium text-muted-foreground">Categories</h3>
              <nav className="grid gap-1 py-2">
                <Link
                  href="/categories/music"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  <ListMusic className="h-4 w-4" />
                  <span>Music</span>
                </Link>
                <Link
                  href="/categories/art"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  <Palette className="h-4 w-4" />
                  <span>Art</span>
                </Link>
                <Link
                  href="/categories/culture"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  <Theater className="h-4 w-4" />
                  <span>Culture</span>
                </Link>
              </nav>
            </div>
            <div className="space-y-1 pt-4">
              <h3 className="px-4 text-sm font-medium text-muted-foreground">Management</h3>
              <nav className="grid gap-1 py-2">
                <Link
                  href="/users"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </nav>
            </div>
          </div>
        </ScrollArea>
        <div className="border-t px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <span className="text-sm font-medium">AD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-muted-foreground">admin@example.com</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
