"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Star,
  Calendar,
  Clock,
} from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { SiteHeader } from "../_components/sidebar/site-header";
import WrapperComponent from "../../Wrapper-Component";
import { LoadingSkeletonTable } from "@/components/Loading-Skeleton";
import Link from "next/link";

interface BlogPost {
  ID: number;
  title: string;
  english_title: string;
  slug: string;
  excerpt: string;
  english_excerpt: string;
  content: string;
  englishcontent: string;
  date: string;
  readTime: number;
  category: string;
  coverImage: string;
  featured: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

// interface ApiResponse {
//   data: BlogPost[];
//   total: number;
//   page: number;
//   limit: number;
// }

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);

  const router = useRouter();

  const categories = [
    "technology",
    "lifestyle",
    "business",
    "health",
    "travel",
  ];

  useEffect(() => {
    fetchPosts();
  }, [page, search, category]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (category) params.append("category", category);

      console.log("Fetching posts with params:", params.toString());

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogposts?${params}`
      );

      console.log("API Response:", response.data);

      // Handle different possible response structures
      if (response.data) {
        // If response has the expected structure with data, total, page, limit
        if (response.data.data && Array.isArray(response.data.data)) {
          setPosts(response.data.data);
          setTotal(response.data.total || 0);
        }
        // If response is directly an array
        else if (Array.isArray(response.data)) {
          setPosts(response.data);
          setTotal(response.data.length);
        }
        // If response has posts property
        else if (response.data.posts && Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
          setTotal(response.data.total || response.data.posts.length);
        } else {
          console.warn("Unexpected API response structure:", response.data);
          setPosts([]);
          setTotal(0);
        }
      } else {
        setPosts([]);
        setTotal(0);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch blog posts. Please try again.");
      setPosts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page when searching
  };

  const handleCategoryFilter = (value: string) => {
    setCategory(value === "all" ? "" : value);
    setPage(1); // Reset to first page when filtering
  };

  const handleDelete = async () => {
    if (!postToDelete) return;

    setDeleting(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/blogposts/${postToDelete.ID}`
      );
      await fetchPosts(); // Refresh the list
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  const totalPages = Math.ceil(total / limit);



  // Error state
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-red-600 mb-4">Error</div>
              <div className="text-muted-foreground mb-4">{error}</div>
              <Button onClick={fetchPosts}>Try Again</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <WrapperComponent>
      {/* Header */}
      < SiteHeader title="Blog Posts List" />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Posts ({total})</span>
            {totalPages > 0 && (
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  Page {page} of {totalPages}
                </Badge>
              </div>
            )}
          </CardTitle>
          <CardDescription>
            Manage and organize your blog content
          </CardDescription>
          <Link href={'/admin/blog/new'} >
            <Button

              className="mt-4 sm:mt-0 w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Post
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search posts..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={category || "all"}
              onValueChange={handleCategoryFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          {loading ? (
            <LoadingSkeletonTable />
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Cover</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Read Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!posts || posts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex flex-col items-center space-y-2">
                            <div className="text-muted-foreground">
                              {search || category
                                ? "No blog posts found matching your criteria"
                                : "No blog posts found"}
                            </div>
                            <Button
                              variant="outline"
                              onClick={() => router.push("/admin/blog/new")}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Create your first post
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      posts.map((post) => (
                        <TableRow key={post.ID}>
                          <TableCell>
                            <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
                              {post.coverImage ? (
                                <Image
                                  width={100}
                                  height={100}
                                  src={post.coverImage || "/placeholder.svg"}
                                  alt={post.title || "Blog post"}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "/placeholder.svg?height=48&width=48";
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            <div className="space-y-1">
                              <div className="font-medium line-clamp-1">
                                {post.title || "Untitled"}
                              </div>
                              <div className="text-sm text-muted-foreground line-clamp-1">
                                {post.excerpt || "No excerpt available"}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {post.category
                                ? post.category.charAt(0).toUpperCase() +
                                post.category.slice(1)
                                : "Uncategorized"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {post.date
                                  ? format(
                                    new Date(post.date),
                                    "MMM dd, yyyy"
                                  )
                                  : "No date"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{post.readTime || 0} min</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {post.featured && (
                                <Badge
                                  variant="default"
                                  className="bg-yellow-100 text-yellow-800 border-yellow-300"
                                >
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                              <Badge
                                variant="outline"
                                className="text-green-600 border-green-200"
                              >
                                Published
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    window.open(
                                      `/blog/${post.slug}`,
                                      "_blank"
                                    )
                                  }
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(`/admin/blog/edit/${post.ID}`)
                                  }
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setPostToDelete(post);
                                    setDeleteDialogOpen(true);
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-muted-foreground">
                    Showing {(page - 1) * limit + 1} to{" "}
                    {Math.min(page * limit, total)} of {total} posts
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex items-center space-x-1">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        const pageNum = Math.max(
                          1,
                          Math.min(page - 2 + i, totalPages - 4 + i)
                        );
                        return (
                          <Button
                            key={pageNum}
                            variant={page === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPage(pageNum)}
                            className="w-8 h-8 p-0"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              blog post
              <strong className="block mt-2">
                {postToDelete?.title || "Untitled"}
              </strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </WrapperComponent>

  );
}
