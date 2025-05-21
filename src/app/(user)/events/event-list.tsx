"use client";

import type React from "react";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

// Event type definition
type Event = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  province: string;
  category: string;
};

// Filter type definition
type Filters = {
  title: string;
  category: string;
  dateRange?: DateRange;
};

// Props type definition
type EventsListProps = {
  data: Event[];
  page: number;
  totalPages: number;
  initialFilters?: Filters;
};

// Categories for filter
const categories = [
  "Music",
  "Sports",
  "Arts",
  "Food",
  "Technology",
  "Business",
  "Education",
  "Health",
  "Other",
];

export default function EventsList({
  data,
  page,
  totalPages,
  initialFilters,
}: EventsListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Filter state
  const [filters, setFilters] = useState<Filters>(
    initialFilters || {
      title: "",
      category: "",
      dateRange: undefined,
    }
  );

  // Filter visibility state
  const [showFilters, setShowFilters] = useState(false);

  // Selected categories state
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.category ? initialFilters.category.split(",") : []
  );

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, title: e.target.value });
  };

  // Handle category selection
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setFilters({ ...filters, dateRange: range });
  };

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (filters.title) {
      params.set("title", filters.title);
    }

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","));
    }

    if (filters.dateRange?.from) {
      params.set("startDate", format(filters.dateRange.from, "yyyy-MM-dd"));
    }

    if (filters.dateRange?.to) {
      params.set("endDate", format(filters.dateRange.to, "yyyy-MM-dd"));
    }

    params.set("page", "1"); // Reset to page 1 when applying new filters

    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white p-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Upcoming Events
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Explore the best cultural, sports, and entertainment events across
            Indonesia
          </p>
        </div>
        <img
          src="/placeholder.svg?height=400&width=1200"
          alt="Events in Indonesia"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Events ({data?.length || 0})</h2>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>

        {showFilters && (
          <div className="bg-muted p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Title Search */}
              <div>
                <Label htmlFor="title" className="mb-2 block">
                  Search by Title
                </Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="title"
                    placeholder="Search events..."
                    className="pl-8"
                    value={filters.title}
                    onChange={handleTitleChange}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <Label className="mb-2 block">Categories</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {selectedCategories.length > 0
                        ? `${selectedCategories.length} selected`
                        : "Select categories"}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <ScrollArea className="h-72 p-4">
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div
                            key={category}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={(checked) =>
                                handleCategoryChange(
                                  category,
                                  checked as boolean
                                )
                              }
                            />
                            <Label htmlFor={`category-${category}`}>
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date Range Filter */}
              <div>
                <Label className="mb-2 block">Date Range</Label>
                <DatePickerWithRange
                  date={filters.dateRange}
                  onDateChange={handleDateRangeChange}
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </div>
        )}
      </div>

      {/* Events Grid */}
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {data.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No events found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="w-8 h-8"
                >
                  {pageNum}
                </Button>
              )
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

// Event Card Component
function EventCard({ event }: { event: Event }) {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img
          src={event.image || "/placeholder.svg?height=200&width=400"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline">{event.category}</Badge>
          <div className="text-sm text-muted-foreground">
            {new Date(event.date).toLocaleDateString()}
          </div>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="line-clamp-1">
            {event.location}, {event.province}
          </span>
        </div>
      </div>
    </div>
  );
}
