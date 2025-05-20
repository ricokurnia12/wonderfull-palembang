"use client";

import { useState, useEffect } from "react";
import { Calendar, ChevronDown, ChevronUp, Filter } from "lucide-react";
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
import { EventCard } from "./event-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { events } from "@/data/event-data";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

export default function EventsList() {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showProvinceFilter, setShowProvinceFilter] = useState(false);
  const [showYearFilter, setShowYearFilter] = useState(false);

  // Get unique categories, provinces, and years from events
  const categories = [...new Set(events.map((event) => event.category))];
  const provinces = [...new Set(events.map((event) => event.province))];
  const years = [
    ...new Set(
      events.map((event) => new Date(event.date).getFullYear().toString())
    ),
  ];

  // Filter events based on selected filters
  useEffect(() => {
    let result = [...events];

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter((event) =>
        selectedCategories.includes(event.category)
      );
    }

    // Filter by provinces
    if (selectedProvinces.length > 0) {
      result = result.filter((event) =>
        selectedProvinces.includes(event.province)
      );
    }

    // Filter by years
    if (selectedYears.length > 0) {
      result = result.filter((event) =>
        selectedYears.includes(new Date(event.date).getFullYear().toString())
      );
    }

    // Filter by date range
    if (dateRange?.from) {
      result = result.filter((event) => {
        const eventDate = new Date(event.date);
        if (dateRange.from && dateRange.to) {
          return eventDate >= dateRange.from && eventDate <= dateRange.to;
        } else if (dateRange.from) {
          return eventDate >= dateRange.from;
        }
        return true;
      });
    }

    setFilteredEvents(result);
  }, [selectedCategories, selectedProvinces, selectedYears, dateRange]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Toggle province selection
  const toggleProvince = (province: string) => {
    setSelectedProvinces((prev) =>
      prev.includes(province)
        ? prev.filter((p) => p !== province)
        : [...prev, province]
    );
  };

  // Toggle year selection
  const toggleYear = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedProvinces([]);
    setSelectedYears([]);
    setDateRange(undefined);
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
      <div className="flex justify-between items-center mb-8">
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
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
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
        {showCategoryFilter && (
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
        {showProvinceFilter && (
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
        {showYearFilter && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-wrap gap-2">
            {years.sort().map((year) => (
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

      {/* Events Grid */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters to find events
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="calendar" className="mt-0">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-center text-gray-500 py-12">
              Calendar view is coming soon!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
