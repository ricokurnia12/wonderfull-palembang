"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Filter,
  ChevronLeft,
  ChevronRight,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { EventCard } from "./components/event-card";
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
  price: string;
  organizer: string;
};

// API Response type
type EventsResponse = {
  data: Event[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export default function EventsList() {
  // State for events data and pagination
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // UI states for filter dropdowns
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showProvinceFilter, setShowProvinceFilter] = useState(false);
  const [showYearFilter, setShowYearFilter] = useState(false);

  // Available filter options
  const [categories, setCategories] = useState<string[]>([]);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  // Fetch events from the API
  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      // Add category filters if any
      if (selectedCategories.length > 0) {
        params.append("categories", selectedCategories.join(","));
      }

      // Add province filters if any
      if (selectedProvinces.length > 0) {
        params.append("provinces", selectedProvinces.join(","));
      }

      // Add year filters if any
      if (selectedYears.length > 0) {
        params.append("years", selectedYears.join(","));
      }

      // Add date range filters if any
      if (dateRange?.from) {
        params.append("startDate", format(dateRange.from, "yyyy-MM-dd"));
      }

      if (dateRange?.to) {
        params.append("endDate", format(dateRange.to, "yyyy-MM-dd"));
      }

      // Make the API request
      const response = await fetch(`/api/eventsclient?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: EventsResponse = await response.json();

      setEvents(data.data);
      setTotal(data.total);
      setTotalPages(data.totalPages);

      // Extract unique filter options from the data if this is the first load
      if (page === 1 && categories.length === 0) {
        const uniqueCategories = [
          ...new Set(data.data.map((event) => event.category)),
        ];
        const uniqueProvinces = [
          ...new Set(data.data.map((event) => event.province)),
        ];
        const uniqueYears = [
          ...new Set(
            data.data.map((event) =>
              new Date(event.date).getFullYear().toString()
            )
          ),
        ];

        setCategories(uniqueCategories);
        setProvinces(uniqueProvinces);
        setYears(uniqueYears.sort());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  // Fetch events when dependencies change
  useEffect(() => {
    fetchEvents();
  }, [
    page,
    limit,
    selectedCategories,
    selectedProvinces,
    selectedYears,
    dateRange,
  ]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setPage(1); // Reset to first page when changing filters
  };

  // Toggle province selection
  const toggleProvince = (province: string) => {
    setSelectedProvinces((prev) =>
      prev.includes(province)
        ? prev.filter((p) => p !== province)
        : [...prev, province]
    );
    setPage(1); // Reset to first page when changing filters
  };

  // Toggle year selection
  const toggleYear = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
    setPage(1); // Reset to first page when changing filters
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedProvinces([]);
    setSelectedYears([]);
    setDateRange(undefined);
    setPage(1); // Reset to first page when clearing filters
  };

  // Handle date range change
  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    setPage(1); // Reset to first page when changing date range
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
          src="/images/hero-banner.jpg"
          alt="Events in Indonesia"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* View Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold">Discover Upcoming Events</h2>
        <Tabs defaultValue="grid" className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowCategoryFilter(!showCategoryFilter)}
          >
            <Filter className="h-4 w-4" />
            Categories
            {showCategoryFilter ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Date Range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <DatePickerWithRange
                date={dateRange}
                setDate={handleDateRangeChange}
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowProvinceFilter(!showProvinceFilter)}
          >
            Location
            {showProvinceFilter ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowYearFilter(!showYearFilter)}
          >
            Year
            {showYearFilter ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>

          {(selectedCategories.length > 0 ||
            selectedProvinces.length > 0 ||
            selectedYears.length > 0 ||
            dateRange?.from) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-red-500"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {(selectedCategories.length > 0 ||
          selectedProvinces.length > 0 ||
          selectedYears.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCategories.map((category) => (
              <Badge key={category} variant="secondary" className="px-3 py-1">
                {category}
                <button
                  className="ml-2"
                  onClick={() => toggleCategory(category)}
                >
                  ×
                </button>
              </Badge>
            ))}
            {selectedProvinces.map((province) => (
              <Badge key={province} variant="secondary" className="px-3 py-1">
                {province}
                <button
                  className="ml-2"
                  onClick={() => toggleProvince(province)}
                >
                  ×
                </button>
              </Badge>
            ))}
            {selectedYears.map((year) => (
              <Badge key={year} variant="secondary" className="px-3 py-1">
                {year}
                <button className="ml-2" onClick={() => toggleYear(year)}>
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Category Filter */}
        {showCategoryFilter && categories.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        )}

        {/* Province Filter */}
        {showProvinceFilter && provinces.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <ScrollArea className="h-[200px]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {provinces.map((province) => (
                  <div key={province} className="flex items-center space-x-2">
                    <Checkbox
                      id={`province-${province}`}
                      checked={selectedProvinces.includes(province)}
                      onCheckedChange={() => toggleProvince(province)}
                    />
                    <Label htmlFor={`province-${province}`} className="text-sm">
                      {province}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Year Filter */}
        {showYearFilter && years.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-wrap gap-2">
            {years.map((year) => (
              <div key={year} className="flex items-center space-x-2">
                <Checkbox
                  id={`year-${year}`}
                  checked={selectedYears.includes(year)}
                  onCheckedChange={() => toggleYear(year)}
                />
                <Label htmlFor={`year-${year}`} className="text-sm">
                  {year}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Events Grid with Loading and Error States */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsContent value="grid" className="mt-0">
          {loading && page === 1 ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2 text-red-500">Error</h3>
              <p className="text-gray-500">{error}</p>
              <Button onClick={fetchEvents} className="mt-4">
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.length > 0 ? (
                  events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">
                      No events found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your filters to find events
                    </p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1 || loading}
                    className="mr-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex items-center mx-4">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show pagination numbers intelligently
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === page ? "default" : "outline"}
                          onClick={() => setPage(pageNum)}
                          disabled={loading}
                          className="mx-1 w-10 h-10 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages || loading}
                    className="ml-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>
        <TabsContent value="calendar" className="mt-0">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-center text-gray-500 py-12">
              Calendar view is coming soon!
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Results Summary */}
      {!loading && events.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {events.length} of {total} events
        </div>
      )}
    </div>
  );
}
