import Image from "next/image";
import { CalendarIcon, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { Event } from "@/types/event-type";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3 z-10" variant="secondary">
          {event.category}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{event.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {event.location}, {event.province}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>
        <Button className="w-full">See Event Details</Button>
      </div>
    </div>
  );
}
