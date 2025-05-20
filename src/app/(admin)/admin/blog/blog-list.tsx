"use client";

import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  EyeIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

// Define the blog post type
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  status: "published" | "draft" | "archived";
  publishedAt: Date;
  author: {
    name: string;
    avatar: string;
  };
  views: number;
  comments: number;
}

// Sample data for demonstration
const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js",
    category: "Development",
    status: "published",
    publishedAt: new Date("2023-05-15"),
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    views: 1250,
    comments: 23,
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS",
    excerpt: "A comprehensive guide to using Tailwind CSS effectively",
    category: "Design",
    status: "published",
    publishedAt: new Date("2023-06-22"),
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    views: 980,
    comments: 15,
  },
  {
    id: "3",
    title: "Server Components in React",
    excerpt: "Understanding the new server component model in React",
    category: "Development",
    status: "draft",
    publishedAt: new Date("2023-07-10"),
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    views: 0,
    comments: 0,
  },
  {
    id: "4",
    title: "Building a Blog with Next.js",
    excerpt: "Step-by-step guide to creating a blog with Next.js",
    category: "Tutorial",
    status: "published",
    publishedAt: new Date("2023-04-05"),
    author: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    views: 2340,
    comments: 42,
  },
  {
    id: "5",
    title: "Advanced TypeScript Patterns",
    excerpt: "Exploring advanced TypeScript patterns for better code",
    category: "Development",
    status: "archived",
    publishedAt: new Date("2023-03-18"),
    author: {
      name: "Mike Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    views: 1560,
    comments: 28,
  },
];

// Define the sort options
type SortField = "title" | "publishedAt" | "views" | "comments";
type SortDirection = "asc" | "desc";

interface BlogPostTableProps {
  posts?: BlogPost[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export default function BlogPostTable({
  posts = samplePosts,
  onEdit = () => {},
  onDelete = () => {},
  onView = () => {},
}: BlogPostTableProps) {
  const [sortField, setSortField] = useState<SortField>("publishedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort posts
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortField === "title") {
      return sortDirection === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortField === "publishedAt") {
      return sortDirection === "asc"
        ? a.publishedAt.getTime() - b.publishedAt.getTime()
        : b.publishedAt.getTime() - a.publishedAt.getTime();
    } else if (sortField === "views") {
      return sortDirection === "asc" ? a.views - b.views : b.views - a.views;
    } else if (sortField === "comments") {
      return sortDirection === "asc"
        ? a.comments - b.comments
        : b.comments - a.comments;
    }
    return 0;
  });

  // Paginate posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Get status badge color
  const getStatusColor = (status: BlogPost["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "draft":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "archived":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "";
    }
  };

  return (
    <div className="w-full ">
      <div className="rounded-md border">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("title")}
                  className="flex items-center gap-1 font-medium"
                >
                  Title
                  {sortField === "title" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("publishedAt")}
                  className="flex items-center gap-1 font-medium"
                >
                  Date
                  {sortField === "publishedAt" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              {/* <TableHead>Author</TableHead> */}
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("views")}
                  className="flex items-center gap-1 font-medium"
                >
                  <EyeIcon className="mr-1 h-4 w-4" />
                  Views
                  {sortField === "views" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("comments")}
                  className="flex items-center gap-1 font-medium"
                >
                  <MessageSquareIcon className="mr-1 h-4 w-4" />
                  Comments
                  {sortField === "comments" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{post.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {post.excerpt}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">{post.category}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={getStatusColor(post.status)}
                    variant="secondary"
                  >
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{format(post.publishedAt, "MMM d, yyyy")}</span>
                  </div>
                </TableCell>
                {/* <TableCell className="text-center">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                      />
                      <AvatarFallback>
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{post.author.name}</span>
                  </div>
                </TableCell> */}
                <TableCell className="text-center">{post.views.toLocaleString()}</TableCell>
                <TableCell className="text-center">{post.comments.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(post.id)}>
                        <EyeIcon className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(post.id)}>
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(post.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
