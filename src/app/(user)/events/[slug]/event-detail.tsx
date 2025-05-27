"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  MapPin,
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
import { useLanguage } from "@/context/LanguageContext";
interface Event {
  id: string;
  title: string;
  english_title: string;
  content: string;
  englishcontent: string;
  date: string;
  location: string;
  province: string;
  category: string;
  image?: string;
  map_url?: string;
  description?: string;
  english_description?: string;
}

interface EventDetailProps {
  event: Event;
}

export default function EventDetail({ event }: EventDetailProps) {
  const { language } = useLanguage();
  console.log("Event Detail:", event);

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

      {/* Hero Section - Instagram Vertical Layout */}
      <div className="grid lg:grid-cols-5 gap-8 mb-8">
        {/* Image Section - Instagram 4:5 Aspect Ratio */}
        <div className="lg:col-span-2">
          <div
            className="relative w-full max-w-md mx-auto"
            style={{ aspectRatio: "4/5" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 rounded-xl" />
            <Image
              src={event.image || "/placeholder.svg?height=500&width=400"}
              alt={event.title}
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-3 flex flex-col justify-center">
          <Badge className="mb-4 w-fit" variant="secondary">
            {event.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {language === "id" ? event.title : event.english_title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {language === "id" ? event.description : event.english_description}
          </p>
          <div className="flex flex-col gap-3 text-muted-foreground mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-primary" />
              <span className="text-base">{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-3 text-primary" />
              <span className="text-base">
                {event.location}, {event.province}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-primary" />
              <span className="text-base">09:00 AM - 05:00 PM</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            {/* <Button size="lg" className="flex-1 lg:flex-none">
              Register Now
            </Button> */}
            <Button size="lg">Share Event</Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-0">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      language === "id" ? event.content : event.englishcontent,
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="location" className="mt-0">
              <h2 className="text-2xl font-bold mb-6">Event Location</h2>
              <div className="bg-muted rounded-lg overflow-hidden mb-6">
                <div className="h-[300px] relative">
                  <iframe
                    src={
                      event.map_url ||
                      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sTaman%20Mini%20Indonesia%20Indah!5e0!3m2!1sen!2sid!4v1635724073795!5m2!1sen!2sid"
                    }
                    loading="lazy"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-muted-foreground">
                      {event.location}, {event.province}, Indonesia
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
              <div className="flex gap-3">
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
          {/* Placeholder for related events */}
          <div className="text-center text-muted-foreground py-8">
            Related events will be displayed here
          </div>
        </div>
      </div>
    </div>
  );
}
