"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Heart,
  Tag,
  Users,
  ArrowLeft,
  ChevronRight,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { EventCard } from "../components/event-card";
import type { Event } from "@/types/event";
import { events } from "@/data/event.data";
import { useLanguage } from "@/context/LanguageContext";
interface EventDetailProps {
  event: Event;
}

export default function EventDetail({ event }: EventDetailProps) {
  // const [isFavorite, setIsFavorite] = useState(false)
  const { language } = useLanguage();
  // Get related events (same category, different event)
  const relatedEvents = events
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 3);

  // Format date for display
  const formattedDate = format(new Date(event.date), "EEEE, MMMM d, yyyy");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Events
      </Link>

      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 text-white">
          <Badge className="mb-4" variant="secondary">
            {event.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {event.location}, {event.province}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="flex flex-wrap gap-4 mb-8">
        <Button className="flex-1 sm:flex-none">Register Now</Button>
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={`mr-2 h-4 w-4 ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
          {isFavorite ? "Saved" : "Save Event"}
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div> */}

      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              {/* <TabsTrigger value="schedule">Schedule</TabsTrigger> */}
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-0">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    language === "id" ? event.content : event.englishcontent,
                }}
              />
            </TabsContent>

            {/* <TabsContent value="schedule" className="mt-0">
              <h2 className="text-2xl font-bold mb-6">Event Schedule</h2>
              <div className="space-y-6">
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    Day 1 - Opening Ceremony
                  </h3>
                  <div className="flex items-center text-sm mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>09:00 AM - 12:00 PM</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Official opening ceremony with traditional performances and
                    speeches from dignitaries.
                  </p>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    Day 1 - Cultural Exhibition
                  </h3>
                  <div className="flex items-center text-sm mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>01:00 PM - 05:00 PM</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Exhibition of traditional arts, crafts, and cultural
                    artifacts from various regions.
                  </p>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    Day 2 - Workshops
                  </h3>
                  <div className="flex items-center text-sm mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>10:00 AM - 03:00 PM</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Interactive workshops on traditional crafts, dance, and
                    music.
                  </p>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">
                    Day 3 - Grand Performance
                  </h3>
                  <div className="flex items-center text-sm mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>07:00 PM - 10:00 PM</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Grand finale featuring spectacular performances from all
                    participating groups.
                  </p>
                </div>
              </div>
            </TabsContent> */}

            <TabsContent value="location" className="mt-0">
              <h2 className="text-2xl font-bold mb-6">Event Location</h2>
              <div className="bg-muted rounded-lg overflow-hidden mb-6">
                <div className="h-[300px] relative">
                  <Image
                    src="/images/map-placeholder.jpg"
                    alt="Event location map"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-muted-foreground">
                      {event.location} Cultural Center
                      <br />
                      Jl. Raya {event.location} No. 123
                      <br />
                      {event.province}, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Getting There</h3>
                    <p className="text-muted-foreground">
                      The venue is located 15 minutes from the city center and
                      is accessible by public transportation. Parking is
                      available on site for those coming by car.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Event Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Date</h4>
                    <p className="text-sm text-muted-foreground">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Time</h4>
                    <p className="text-sm text-muted-foreground">
                      09:00 AM - 05:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.location}, {event.province}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Category</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Organizer</h4>
                    <p className="text-sm text-muted-foreground">
                      Ministry of Tourism and Creative Economy
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <h3 className="text-lg font-semibold mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a
                    href="mailto:info@event.com"
                    className="text-sm hover:underline"
                  >
                    info@event.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a
                    href="tel:+6281234567890"
                    className="text-sm hover:underline"
                  >
                    +62 812-3456-7890
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <a href="#" className="text-sm hover:underline">
                    www.eventwebsite.com
                  </a>
                </div>
              </div>

              <Separator className="my-6" />

              <h3 className="text-lg font-semibold mb-4">Follow Event</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="icon">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Events */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Related Events</h2>
          <Link
            href="/"
            className="text-sm font-medium flex items-center hover:underline"
          >
            View All Events
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedEvents.map((relatedEvent) => (
            <EventCard key={relatedEvent.id} event={relatedEvent} />
          ))}
        </div>
      </div>
    </div>
  );
}
