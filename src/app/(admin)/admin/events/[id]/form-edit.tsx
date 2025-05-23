"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, ImageIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { SiteHeader } from "../../_components/sidebar/site-header";
import Editor from "@/components/novel-editor";
import axios from "axios";

const formSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" }),
      english_title: z.string().min(3, { message: "Title must be at least 3 characters" }),
      english_description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters" }),
    content: z
      .string()
      .min(20, { message: "Content must be at least 20 characters" }),
    englishcontent: z
      .string()
      .min(20, { message: "Content must be at least 20 characters" }),
    date: z.date({ required_error: "Event date is required" }),
    location: z.string().min(3, { message: "Location is required" }),
    province: z.string().min(2, { message: "Province is required" }),
    map_url: z.string().optional(),
    category: z.enum(["music", "art", "culture"], {
      required_error: "Please select a category",
    }),
    image: z.string().optional(),
    slug: z.string().min(3, { message: "Slug is required" }),
    // featured: z.boolean().default(false),
  });

type FormValues = z.infer<typeof formSchema>;

// Simulated API response type
interface EventData extends FormValues {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export default function EditEventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id as string;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      englishcontent: "",
      location: "",
      province: "",
      category: "music",
      image: "",
      english_title: "",
      english_description: "",
      map_url: "",
      slug: "",
      // featured: false,
    },
  });

  // Fetch event data from API
  const fetchEventData = async (id: string): Promise<EventData> => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/detail-to-edit/${id}`);
      const eventData = response.data;
      
      // Convert date string to Date object if needed
      if (eventData.date && typeof eventData.date === 'string') {
        eventData.date = new Date(eventData.date);
      }
      
      return eventData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error("Event not found");
        } else if (error.response?.status === 500) {
          throw new Error("Server error occurred");
        } else {
          throw new Error(`Failed to fetch event: ${error.response?.data?.message || error.message}`);
        }
      }
      throw new Error("Network error occurred");
    }
  };

  // Load event data on component mount
  useEffect(() => {
    const loadEventData = async () => {
      if (!eventId) {
        setError("Event ID is required");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Fetch event data from API
        const eventData = await fetchEventData(eventId);

        // Populate form with fetched data
        form.reset({
          title: eventData.title,
          english_title: eventData.english_title,
          description: eventData.description,
          english_description: eventData.english_description,
          content: eventData.content,
          englishcontent: eventData.englishcontent,
          date: eventData.date,
          location: eventData.location,
          province: eventData.province,
          category: eventData.category,
          image: eventData.image,
          map_url: eventData.map_url,

          // featured: eventData.featured,
        });

      } catch (err) {
        console.error("Error fetching event data:", err);
        setError(err instanceof Error ? err.message : "Failed to load event data");
      } finally {
        setIsLoading(false);
      }
    };

    loadEventData();
  }, [eventId, form]);

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    console.log("Form submitted:", data);
    try {
      // Update event via API
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`, {
        ...data,
        // Convert date to ISO string for API
        date: data.date.toISOString(),
      });
      
      console.log("Event updated successfully:", response.data);
      alert("Event updated successfully!");

      // Redirect back to events list or event detail page
      router.push("/events");

    } catch (error) {
      console.error("Error updating event:", error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert("Invalid data provided. Please check your inputs.");
        } else if (error.response?.status === 404) {
          alert("Event not found.");
        } else if (error.response?.status === 500) {
          alert("Server error occurred. Please try again later.");
        } else {
          alert(`Failed to update event: ${error.response?.data?.message || error.message}`);
        }
      } else {
        alert("Network error occurred. Please check your connection.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Card>
          <SiteHeader />
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading event data...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Card>
          <SiteHeader />
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <Button onClick={() => router.push("/events")} variant="outline">
                  Back to Events
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
      <Card>
        <SiteHeader />
        <CardContent className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Edit Event</h1>
            <p className="text-muted-foreground">Update the event details below.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Event title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
     <FormField
                  control={form.control}
                  name="english_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>English Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Event title in English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            
              </div>
              <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Event venue" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Input placeholder="Province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                  control={form.control}
                  name="map_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link Google Maps</FormLabel>
                      <FormControl>
                        <Input placeholder="http.." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of the event"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A short summary that will appear in event listings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

<FormField
                control={form.control}
                name="english_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of the event"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A short summary that will appear in event listings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Editor
                        initialValue={field.value}
                        onChange={(html) => {
                          field.onChange(html);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Full details about the event, including schedule,
                      performers, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="englishcontent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>English Content</FormLabel>
                    <FormControl>
                      <Editor
                        initialValue={field.value}
                        onChange={(html) => {
                          field.onChange(html);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Full details about the event, including schedule,
                      performers, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-6"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="music" />
                          </FormControl>
                          <FormLabel className="font-normal">Music</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="art" />
                          </FormControl>
                          <FormLabel className="font-normal">Art</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="culture" />
                          </FormControl>
                          <FormLabel className="font-normal">Culture</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <Input
                          placeholder="Image URL for the event"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="ml-2"
                          onClick={() => {}}
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Browse
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Provide a URL to an image that represents your event.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/events")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? "Updating..." : "Update Event"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}``