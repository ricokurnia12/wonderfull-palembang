"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  content: z
    .string()
    .min(20, { message: "Content must be at least 20 characters" }),
  date: z.date({ required_error: "Event date is required" }),
  location: z.string().min(3, { message: "Location is required" }),
  province: z.string().min(2, { message: "Province is required" }),
  category: z.enum(["music", "art", "culture"], {
    required_error: "Please select a category",
  }),
  image: z.string().optional(),
  // featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function EventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      location: "",
      province: "",
      category: "music",
      image: "",
      // featured: false,
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    console.log("Form submitted:", data);
    try {
      // Here you would typically send the data to your API
      const response = await axios.post(
        "http://localhost:8080/api/events",
        data
      );

      console.log("Response:", response.data);
      alert("Event created successfully!");

      // Reset form and redirect
      form.reset();
      router.push("/events");

      alert("Event created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
      <Card>
        <SiteHeader />
        <CardContent className="p-6">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Editor
                        onChange={(html) => {
                          field.onChange(html); // Simpan ke form
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
                        defaultValue={field.value}
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

              {/* <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Featured Event
                      </FormLabel>
                      <FormDescription>
                        Featured events will be displayed prominently on the
                        homepage.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> */}

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? "Creating..." : "Create Event"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
