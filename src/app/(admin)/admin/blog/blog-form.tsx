"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Loader2, Save, ArrowLeft, ImageIcon } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from "@/types/category-types";
import { Checkbox } from "@/components/ui/checkbox";
import EditorWithForm from "../../../../components/novel-editor/editor-form-wrapper";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  english_title: z
    .string()
    .min(3, { message: "English title must be at least 3 characters" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must contain only lowercase letters, numbers, and dashes",
    }),
  excerpt: z
    .string()
    .min(10, { message: "Excerpt must be at least 10 characters" }).max(160, { message: "Excerpt must be less than 160 characters" }),
  english_excerpt: z
    .string()
    .min(10, { message: "English excerpt must be at least 10 characters" }).max(160, { message: "English excerpt must be less than 100 characters" }),
  content: z
    .string()
    .min(20, { message: "Content must be at least 20 characters" }),
  englishcontent: z
    .string()
    .min(20, { message: "English content must be at least 20 characters" }),
  date: z.string().min(1, { message: "Date is required" }),
  //   readTime: z
  //     .number()
  //     .min(1, { message: "Read time must be at least 1 minute" }),
  category: z.string().min(1, { message: "Category is required" }),
  coverImage: z.string().optional(),
  //   featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function BlogPostForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      english_title: "",
      slug: "",
      excerpt: "",
      english_excerpt: "",
      content: "",
      englishcontent: "",
      date: format(new Date(), "yyyy-MM-dd"),
      //   readTime: 5,
      category: "",
      coverImage: "",
      //   featured: false,
    },
  });

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Watch title changes to auto-generate slug
  const watchTitle = form.watch("title");
  useEffect(() => {
    if (watchTitle && !isEdit) {
      const slug = generateSlug(watchTitle);
      form.setValue("slug", slug);
    }
  }, [watchTitle, form, isEdit]);

  // Fetch blog post data if editing
  useEffect(() => {
    if (id && id !== "new") {
      setIsEdit(true);
      fetchBlogPost(id);
    }
  }, [id]);

  const fetchBlogPost = async (postId: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogposts/${postId}`
      );
      const data = response.data;

      form.reset({
        title: data.title || "",
        english_title: data.english_title || "",
        slug: data.slug || "",
        excerpt: data.excerpt || "",
        english_excerpt: data.english_excerpt || "",
        content: data.content || "",
        englishcontent: data.englishcontent || "",
        date: data.date || format(new Date(), "yyyy-MM-dd"),
        // readTime: data.readTime || 5,
        category: data.category || "",
        coverImage: data.coverImage || "",
        // featured: data.featured || false,
      });
    } catch (error) {
      console.error("Error fetching blog post:", error);
      alert("Failed to load blog post data.");
    } finally {
      setIsLoading(false);
    }
  };

  async function onSubmit(data: FormValues) {
    console.log({ data })
    setIsSubmitting(true);
    try {
      let response;
      if (isEdit) {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/blogposts/${id}`,
          data
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/blogposts`,
          data
        );
      }

      console.log("Response:", response.data);
      alert(`Blog post ${isEdit ? "updated" : "created"} successfully!`);

      if (!isEdit) {
        form.reset();
      }
      router.push("/admin/blog");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        `Failed to ${isEdit ? "update" : "create"} blog post. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading blog post...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {isEdit ? "Edit Blog Post" : "Create New Blog Post"}
              </h1>
              <p className="text-muted-foreground">
                {isEdit
                  ? "Update your blog post content"
                  : "Write and publish a new blog post"}
              </p>
            </div>
          </div>
          {/* <div className="flex items-center space-x-2">
            {form.watch("featured") && (
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800"
              >
                Featured
              </Badge>
            )}
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div> */}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>Basic Information</span>
                    </CardTitle>
                    <CardDescription>
                      Enter the basic details for your blog post
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Tabs defaultValue="indonesian" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="indonesian">Indonesian</TabsTrigger>
                        <TabsTrigger value="english">English</TabsTrigger>
                      </TabsList>

                      <TabsContent
                        value="indonesian"
                        className="space-y-4 mt-6"
                      >
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter blog post title"
                                  className="text-lg"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="excerpt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Excerpt</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Brief description of the blog post"
                                  className="resize-none"
                                  rows={3}
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                A short summary that will appear in blog
                                listings
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>

                      <TabsContent value="english" className="space-y-4 mt-6">
                        <FormField
                          control={form.control}
                          name="english_title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>English Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter English blog post title"
                                  className="text-lg"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="english_excerpt"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>English Excerpt</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Brief description in English"
                                  className="resize-none"
                                  rows={3}
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                A short summary in English for international
                                readers
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                    </Tabs>

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL Slug</FormLabel>
                          <FormControl>
                            <Input placeholder="url-friendly-slug" {...field} />
                          </FormControl>
                          <FormDescription>
                            URL-friendly version of the title (auto-generated)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Content */}
                <Card>
                  <CardHeader>
                    <CardTitle>Content</CardTitle>
                    <CardDescription>
                      Write your blog post content in both languages
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="content-id" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="content-id">
                          Indonesian Content
                        </TabsTrigger>
                        <TabsTrigger value="content-en">
                          English Content
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="content-id" className="mt-6">
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Indonesian Content</FormLabel>
                              <FormControl>
                                <div className="min-h-[400px] border rounded-lg">
                                  <EditorWithForm
                                    contentname="blog-content"
                                    field={field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>

                      <TabsContent value="content-en" className="mt-6">
                        <FormField
                          control={form.control}
                          name="englishcontent"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>English Content</FormLabel>
                              <FormControl>
                                <div className="min-h-[400px] border rounded-lg">
                                  <EditorWithForm field={field} contentname="blog-english-content"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publish Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Publish Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Publish Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Technology, Travel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Categories</FormLabel>
                            <p className="text-sm text-muted-foreground">Select one or more categories for your post.</p>
                          </div>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {categories.map((category) => {
                              const selectedCategories = field.value ? field.value.split(" ").filter(Boolean) : []
                              return (
                                <FormItem key={category.id} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={selectedCategories.includes(category.id)}
                                      onCheckedChange={(checked) => {
                                        const currentCategories = field.value ? field.value.split(" ").filter(Boolean) : []
                                        let newCategories

                                        if (checked) {
                                          newCategories = [...currentCategories, category.id]
                                          console.log("Updated categories:", newCategories.join(" "))
                                        } else {
                                          newCategories = currentCategories.filter((cat) => cat !== category.id)
                                        }
                                        // form.setValue("category", newCategories.join(" "), { shouldValidate: true })
                                        field.onChange(newCategories.join(" "))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">{category.label}</FormLabel>
                                </FormItem>
                              )
                            })}
                          </div>
                          {field.value && <p className="text-xs text-muted-foreground mt-2">Selected: {field.value}</p>}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Cover Image */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ImageIcon className="h-5 w-5" />
                      <span>Cover Image</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="coverImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="space-y-4">
                              <Input
                                placeholder="Image URL or upload path"
                                {...field}
                              />
                              {field.value && (
                                <div className="relative aspect-video rounded-lg overflow-hidden border">
                                  <img
                                    src={field.value || "/placeholder.svg"}
                                    alt="Cover preview"
                                    className="object-cover w-full h-full"
                                    onError={(e) => {
                                      e.currentTarget.src =
                                        "/placeholder.svg?height=200&width=400";
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Add a cover image for your blog post
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col space-y-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <Save className="mr-2 h-4 w-4" />
                        {isSubmitting
                          ? isEdit
                            ? "Updating..."
                            : "Creating..."
                          : isEdit
                            ? "Update Post"
                            : "Create Post"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
