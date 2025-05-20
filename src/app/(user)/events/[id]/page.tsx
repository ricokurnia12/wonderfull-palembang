import { notFound } from "next/navigation"
import type { Metadata } from "next"
import EventDetail from "./event-detail"
import { events } from "@/data/event.data"

interface EventPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = events.find((event) => event.id === Number.parseInt(params.id))

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The requested event could not be found.",
    }
  }

  return {
    title: event.title,
    description: event.description,
  }
}

export default function EventPage({ params }: EventPageProps) {
  const event = events.find((event) => event.id === Number.parseInt(params.id))

  if (!event) {
    notFound()
  }

  return <EventDetail event={event} />
}
