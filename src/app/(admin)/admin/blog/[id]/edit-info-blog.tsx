"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/datetime-picker";
// import zodResolver
const EditInfo = () => {
  const [date24, setDate24] = useState<Date | undefined>(undefined);
  const blogpostSchema = z.object({
    title: z.string().min(5),
    slug: z.string(),
    excerp: z.string().max(100),
    date: z.date(),
    category: z.string(),
    status: z.string(),
    tags: z.string(),
    price: z.number().optional(),
    content: z.string(),
  });
  type BlogPostFormValues = z.infer<typeof blogpostSchema>;
  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogpostSchema),
  });
  return (
    <div className="flex-1 w-full max-w-full px-4">
      <Form {...form}>
        <form className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="enter-post-title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="enter-post-slug" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 ">
            <FormField
              control={form.control}
              name="excerp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerp</FormLabel>
                  <FormControl>
                    <Textarea className="max-w-full" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="enter-post-title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Posting</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      hourCycle={24}
                      value={date24}
                      onChange={setDate24}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditInfo;
