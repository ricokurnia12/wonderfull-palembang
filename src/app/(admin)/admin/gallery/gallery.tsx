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
  Copy,
  Eye,
  ExternalLink,
} from "lucide-react";

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
  timeout: 10000,
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
  const LIMIT = 8;

  const fetchPhotos = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      if (!API_BASE_URL || API_BASE_URL.includes("localhost")) {
        // Use mock data for development
        setPhotos(mockPhotos);
        setPaginationData({
          limit: LIMIT,
          page: 1,
          total: mockPhotos.length,
          totalPages: 1,
        });
        return;
      }

      const response = await api.get<PaginatedResponse>(`/photos/paginated`, {
        params: { page: pageNum, limit: LIMIT },
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
      // Fallback to mock data
      setPhotos(mockPhotos);
      setPaginationData({
        limit: LIMIT,
        page: 1,
        total: mockPhotos.length,
        totalPages: 1,
      });
      toast.error("Failed to load images. Using sample data.");
    } finally {
      setLoading(false);
    }
  }, []);

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

      if (!API_BASE_URL || API_BASE_URL.includes("localhost")) {
        // Simulate success for development without API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newMockPhoto: Photo = {
          ID: Date.now(),
          CreatedAt: new Date().toISOString(),
          UpdatedAt: new Date().toISOString(),
          DeletedAt: null,
          title: formData.get("title") as string,
          file_path: "/placeholder.svg?height=500&width=500",
        };

        setPhotos((prevPhotos) => [newMockPhoto, ...prevPhotos]);
        form.reset();
        toast.success("Image uploaded successfully!");

        // Switch to gallery tab
        const galleryTab = document.querySelector(
          '[value="gallery"]'
        ) as HTMLButtonElement;
        if (galleryTab) galleryTab.click();
        return;
      }

      await api.post("/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Image uploaded successfully!");
      fetchPhotos(1);
      form.reset();

      // Switch to gallery tab
      const galleryTab = document.querySelector(
        '[value="gallery"]'
      ) as HTMLButtonElement;
      if (galleryTab) galleryTab.click();
    } catch (error) {
      console.error("Upload error:", error);
      let errorMessage = "Could not upload image. Please try again.";

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.request) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        }
      }

      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  // Handle photo deletion
  const handleDelete = async () => {
    if (!selectedPhoto) return;

    try {
      if (!API_BASE_URL || API_BASE_URL.includes("localhost")) {
        // Simulate success for development
        await new Promise((resolve) => setTimeout(resolve, 500));
        setPhotos((prevPhotos) =>
          prevPhotos.filter((photo) => photo.ID !== selectedPhoto.ID)
        );
        toast.success("Image deleted successfully!");
        setDeleteDialogOpen(false);
        setSelectedPhoto(null);
        return;
      }

      await api.delete(`/photos/${selectedPhoto.ID}`);
      toast.success("Image deleted successfully!");
      fetchPhotos(page);
    } catch (error) {
      console.error("Delete error:", error);
      let errorMessage = "Could not delete image. Please try again.";

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.request) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        }
      }

      toast.error(errorMessage);
    } finally {
      setDeleteDialogOpen(false);
      setSelectedPhoto(null);
    }
  };

  // Get image URL with base path
  const getImageUrl = (filePath: string) => {
    if (filePath.startsWith("http") || filePath.startsWith("/placeholder")) {
      return filePath;
    }
    return `${API_BASE_URL}/${encodeURI(filePath)}`;
  };

  // Copy URL to clipboard
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gallery Dashboard</h1>
          <p className="text-muted-foreground">Manage your photo gallery</p>
        </div>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            View Public Gallery
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="gallery" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading images...</p>
            </div>
          ) : photos.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent className="pt-6">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No images found</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  Upload some images to get started
                </p>
                <Button
                  onClick={() => {
                    const uploadTab = document.querySelector(
                      '[value="upload"]'
                    ) as HTMLButtonElement;
                    if (uploadTab) uploadTab.click();
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {API_BASE_URL.includes("localhost") && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">
                      Development Mode
                    </h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      API URL not configured or using localhost. Using mock
                      data. Set NEXT_PUBLIC_API_URL in your .env file.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {photos.map((photo: Photo) => (
                  <Card
                    key={photo.ID}
                    className="overflow-hidden group hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-square bg-muted">
                      <Image
                        src={getImageUrl(photo.file_path) || "/placeholder.svg"}
                        alt={photo.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            copyToClipboard(getImageUrl(photo.file_path))
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle
                        className="text-base line-clamp-1"
                        title={photo.title}
                      >
                        {photo.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">
                        Uploaded{" "}
                        {new Date(photo.CreatedAt).toLocaleDateString()}
                      </p>
                    </CardContent>

                    <CardFooter className="pt-0 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
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

              {paginationData.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || loading}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="text-sm font-medium">
                    Page {page} of {paginationData.totalPages}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === paginationData.totalPages || loading}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Image</CardTitle>
              <p className="text-sm text-muted-foreground">
                Add a new image to your gallery
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter image title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image *</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <div className="space-y-2">
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        required
                        className="max-w-sm mx-auto"
                      />
                      <p className="text-sm text-muted-foreground">
                        Upload a JPG, PNG, or GIF image (max 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={uploading}>
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Image
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Image Dialog */}
      <Dialog
        open={!!selectedPhoto && !deleteDialogOpen}
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        {selectedPhoto && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedPhoto.title}
              </DialogTitle>
              <DialogDescription>
                Uploaded on{" "}
                {new Date(selectedPhoto.CreatedAt).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>

            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={getImageUrl(selectedPhoto.file_path) || "/placeholder.svg"}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={() =>
                  copyToClipboard(getImageUrl(selectedPhoto.file_path))
                }
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy URL
              </Button>

              <Button
                variant="destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedPhoto?.title}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
