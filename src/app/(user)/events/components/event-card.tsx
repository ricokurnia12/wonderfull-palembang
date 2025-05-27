"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { useState } from "react";

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
  const [imgSrc, setImgSrc] = useState(
    event.image || "/placeholder.svg?height=500&width=400"
  );

  return (
    <div className="group relative bg-gradient-to-br from-white via-white to-gray-50/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 max-w-sm mx-auto border border-gray-100/50 backdrop-blur-sm">
      {/* Gradient overlay for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none z-10" />

      {/* Image container with enhanced styling */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4/5" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-20" />
        <Image
          width={400}
          height={500}
          src={imgSrc || "https://placehold.co/400x500"}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImgSrc("https://placehold.co/500x600")}
          unoptimized
        />

        {/* Category badge positioned on image */}
        <div className="absolute top-4 left-4 z-30">
          <Badge
            variant="secondary"
            className="bg-white/90 backdrop-blur-md text-gray-800 border-0 shadow-lg font-medium px-3 py-1 text-xs"
          >
            {event.category}
          </Badge>
        </div>
      </div>

      {/* Content section with enhanced spacing and typography */}
      <div className="p-6 space-y-4">
        {/* Date with icon */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{event.date}</span>
        </div>

        {/* Title with better typography */}
        <h3 className="font-bold text-xl mb-3 line-clamp-2 leading-tight text-gray-900 group-hover:text-gray-700 transition-colors">
          {event.title || "No title available."}
        </h3>

        {/* Description with improved styling */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {event.description || "No description available."}
        </p>

        {/* Location with icon and better styling */}
        <div className="flex items-center gap-2 text-sm text-gray-500 pt-2 border-t border-gray-100">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="line-clamp-1 font-medium">
            {event.location}, {event.province}
          </span>
        </div>
      </div>

      {/* Subtle hover effect border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gray-200/50 transition-colors duration-300 pointer-events-none" />
    </div>
  );
}
