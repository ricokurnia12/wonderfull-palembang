"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Upload,
  Copy
} from "lucide-react";
import { SiteHeader } from "../_components/sidebar/site-header";

// Define the API base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// Mock data for development or when API is unavailable
const mockPhotos: Photo[] = [
  {
    ID: 1,
    CreatedAt: new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
    DeletedAt: null,
    title: "Sample Image 1",
    file_path: "/placeholder.svg?height=500&width=500",
  },
  {
    ID: 2,
    CreatedAt: new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
    DeletedAt: null,
    title: "Sample Image 2",
    file_path: "/placeholder.svg?height=500&width=500",
  },
];

// Create Axios instance with common configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Type definitions
interface Photo {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  title: string;
  file_path: string;
  //   description?: string; // Optional since it's not in the API response
}

interface PaginatedResponse {
  data: Photo[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export function GalleryDashboard() {
  // State management
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [paginationData, setPaginationData] = useState({
    limit: 8,
    page: 1,
    total: 0,
    totalPages: 1,
  });

  // Routing
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page")
    ? Number.parseInt(searchParams.get("page") as string)
    : 1;

  // Fetch photos function
  const fetchPhotos = useCallback(
    async (pageNum: number) => {
      try {
        setLoading(true);

        // Check if API_BASE_URL is set
        if (!API_BASE_URL) {
          console.warn("API_BASE_URL is not set. Using mock data instead.");
          // Use mock data when API is not available
          setPhotos(mockPhotos);
          setPaginationData({
            limit: 8,
            page: 1,
            total: mockPhotos.length,
            totalPages: 1,
          });
          return;
        }

        const response = await api.get<PaginatedResponse>(`/photos/paginated`, {
          params: {
            page: pageNum,
            limit: paginationData.limit,
          },
        });

        setPhotos(response.data.data);
        setPaginationData({
          limit: response.data.limit,
          page: response.data.page,
          total: response.data.total,
          totalPages: response.data.totalPages,
        });
      } catch (error) {
        console.error("Failed to fetch photos:", error);

        // Use mock data as fallback when API request fails
        console.warn("API request failed. Using mock data as fallback.");
        setPhotos(mockPhotos);
        setPaginationData({
          limit: 8,
          page: 1,
          total: mockPhotos.length,
          totalPages: 1,
        });

        toast("error");
      } finally {
        setLoading(false);
      }
    },
    [paginationData.limit]
  );

  // Load photos on initial render and when page changes
  useEffect(() => {
    fetchPhotos(page);
  }, [fetchPhotos, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > paginationData.totalPages) return;
    router.push(`/admin?page=${newPage}`);
  };

  // Handle photo upload
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Rename file field from "image" to "photo" to match API expectation
      const imageFile = formData.get("image");
      if (imageFile) {
        formData.delete("image");
        formData.append("photo", imageFile);
      }

      // Check if API_BASE_URL is set
      if (!API_BASE_URL) {
        // Simulate success for development without API
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Fake delay

        toast("ok");

        // Add to mock photos array for development
        const newMockPhoto = {
          ID: Date.now(),
          CreatedAt: new Date().toISOString(),
          UpdatedAt: new Date().toISOString(),
          DeletedAt: null,
          title: formData.get("title") as string,
          file_path: "/placeholder.svg?height=500&width=500",
          //   description:
          //     (formData.get("description") as string) || "No description",
        };

        // Update the photos state with the new mock photo
        setPhotos((prevPhotos) => [newMockPhoto, ...prevPhotos]);

        // Reset form and state
        form.reset();

        // Switch to gallery tab
        const galleryTab = document.querySelector(
          '[data-state="inactive"][value="gallery"]'
        ) as HTMLButtonElement;
        if (galleryTab) galleryTab.click();

        return;
      }

      // Need to override default headers for multipart/form-data
      await api.post("/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast("ok");

      // Refresh the gallery after upload
      fetchPhotos(1);

      // Reset form and state
      form.reset();

      // Switch to gallery tab
      const galleryTab = document.querySelector(
        '[data-state="inactive"][value="gallery"]'
      ) as HTMLButtonElement;
      if (galleryTab) galleryTab.click();
    } catch (error) {
      console.error("Upload error:", error);

      let errorMessage = "Could not upload image. Please try again.";
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Extract more specific error message if available
          errorMessage = error.response.data?.message || errorMessage;
        } else if (error.request) {
          // Network error occurred
          errorMessage =
            "Network error. Please check your connection and try again.";
        }
      }

      toast("error");
    } finally {
      setUploading(false);
    }
  };

  // Handle photo deletion
  const handleDelete = async () => {
    if (!selectedPhoto) return;

    try {
      // Check if API_BASE_URL is set
      if (!API_BASE_URL) {
        // Simulate success for development without API
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Fake delay

        // Remove from local state
        setPhotos((prevPhotos) =>
          prevPhotos.filter((photo) => photo.ID !== selectedPhoto.ID)
        );

        toast("ok");

        setDeleteDialogOpen(false);
        setSelectedPhoto(null);
        return;
      }

      await api.delete(`/photos/${selectedPhoto.ID}`);

      toast("ok");

      // Refresh photos after deletion
      fetchPhotos(page);
    } catch (error) {
      console.error("Delete error:", error);

      let errorMessage = "Could not delete image. Please try again.";
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Extract more specific error message if available
          errorMessage = error.response.data?.message || errorMessage;
        } else if (error.request) {
          // Network error occurred
          errorMessage =
            "Network error. Please check your connection and try again.";
        }
      }

      toast("error");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedPhoto(null);
    }
  };

  // Get image URL with base path
  const getImageUrl = (filePath: string) => {
    console.log({ filePath });

    // Check if file_path already includes the full URL
    if (filePath.startsWith("http")) {
      return filePath;
    }

    // Otherwise, append to API base URL
    return `${API_BASE_URL}/${encodeURI(filePath)}`;
  };

  useEffect(() => {
    // Log environment setup for debugging
    if (process.env.NODE_ENV === "development") {
      console.info(`API Base URL: ${API_BASE_URL || "(not configured)"}`);
      if (!API_BASE_URL) {
        console.info("Running in development mode with mock data");
      }
    }

    // Add request interceptor for debugging in development
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (process.env.NODE_ENV === "development") {
          console.debug(
            `API Request: ${config.method?.toUpperCase()} ${config.url}`,
            config
          );
        }
        return config;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        if (process.env.NODE_ENV === "development") {
          console.debug(
            `API Response: ${
              response.status
            } ${response.config.method?.toUpperCase()} ${response.config.url}`
          );
        }
        return response;
      },
      (error) => {
        // Handle session expiration (401 Unauthorized)
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          toast("error");
          // Redirect to login page if needed
          // router.push('/login');
        }

        // Handle server errors
        if (axios.isAxiosError(error) && error.response?.status === 500) {
          toast("error");
        }

        // Handle network errors
        if (axios.isAxiosError(error) && !error.response) {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              "Network error in development mode - check API connection:",
              error.message
            );
          }

          // Don't show toast here as we'll handle fallbacks in each function
        }

        return Promise.reject(error);
      }
    );

    // Clean up interceptors on component unmount
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <Tabs defaultValue="gallery" className="space-y-6">
      <SiteHeader />
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>
        <Link href="/">
          <Button variant="outline">View Public Gallery</Button>
        </Link>
      </div>

      <TabsContent value="gallery" className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading images...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No images found</h3>
            <p className="text-muted-foreground mt-2">
              Upload some images to get started
            </p>
          </div>
        ) : (
          <>
            {!API_BASE_URL && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6 flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                <div>
                  <h4 className="font-medium text-yellow-800">
                    Development Mode
                  </h4>
                  <p className="text-sm text-yellow-700">
                    API URL not configured. Using mock data. Set
                    NEXT_PUBLIC_API_URL in your .env file.
                  </p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <Card key={photo.ID} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Copy className="text-black top-2 z-50 right-0 w-12 h-12"/>
                    <Image
                      src={getImageUrl(photo.file_path)}
                      alt={photo.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      onClick={() => setSelectedPhoto(photo)}
                    />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-base truncate">
                      {photo.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {photo.description || "No description"}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(getImageUrl(photo.file_path))}
                    >
                      Copy Url <Copy className="h-4 w-4"/>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setSelectedPhoto(photo);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}

        {paginationData.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || loading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {page} of {paginationData.totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === paginationData.totalPages || loading}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="upload">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Image</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={3} />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center gap-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    required
                    className="max-w-sm"
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload a JPG, PNG, or GIF image (max 5MB)
                  </p>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
                {!uploading && <Plus className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <Dialog
        open={!!selectedPhoto && !deleteDialogOpen}
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        {selectedPhoto && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedPhoto.title}</DialogTitle>
              {/* <DialogDescription>
                {selectedPhoto.description || "No description"}
              </DialogDescription> */}
            </DialogHeader>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={getImageUrl(selectedPhoto.file_path)}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Uploaded on{" "}
              {new Date(selectedPhoto.CreatedAt).toLocaleDateString()}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="destructive"
                onClick={() => {
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
}
