import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { EventsTable } from "@/components/event-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  return (
    // <DashboardShell>
      // <DashboardHeader
      //   heading="Events"
      //   description="Manage your events"
      //   action={
      //     <Link href="/events/new">
      //       <Button size="sm">
      //         <PlusCircle className="mr-2 h-4 w-4" />
      //         Add Event
      //       </Button>
      //     </Link>
      //   }
      // />
      <>      <EventsTable />
      </>

    // {/* </DashboardShell> */}
  )
}
