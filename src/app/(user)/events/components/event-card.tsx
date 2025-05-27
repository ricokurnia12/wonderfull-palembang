// Event Card Component
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
interface EventCardProps {
  title: string;
  image: string;
  description: string;
  location: string;
  province: string;
  category: string;
  date: string;
}

export function EventCard({ event }: { event: EventCardProps }) {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow max-w-sm mx-auto">
      {/* Foto dengan aspect ratio 4:5 (Instagram portrait) */}
      <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
        <Image
          width={400}
          height={500}
          src={event.image || "/placeholder.svg?height=500&width=400"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="text-xs">
            {event.category}
          </Badge>
          <div className="text-xs text-muted-foreground">{event.date}</div>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-tight">
          {event.title || "No title available."}
        </h3>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-3 leading-relaxed">
          {event.description || "No description available."}
        </p>

        <div className="flex items-center text-sm text-muted-foreground">
          <span className="line-clamp-1">
            {event.location}, {event.province}
          </span>
        </div>
      </div>
    </div>
  );
}
