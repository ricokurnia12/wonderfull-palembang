"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { ChevronDown,ChevronLeft, ChevronRight,Calendar, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import Image from "next/image"


// Event type definition
type Event = {
  id: number
  title: string
  english_title: string
  description: string
  english_description: string
  slug: string
  image: string
  date: string
  location: string
  province: string
  category: string
}

// Filter type definition
type Filters = {
  title: string
  category: string
  dateRange?: DateRange
  sortBy: string,
  sortOrder: "asc" | "desc"
}

// Props type definition
type EventsListProps = {
  data: Event[]
  page: number
  totalPages: number
  initialFilters?: Filters
}

// Sort options
const sortOptions = [
  { value: "date-asc", label: "Date: Earliest First" },
  { value: "date-desc", label: "Date: Latest First" },
 
]

export default function EventsList({ data, page, totalPages, initialFilters }: EventsListProps) {
  const { language } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Filter state
  const [filters, setFilters] = useState<Filters>(
    initialFilters || {
      title: "",
      category: "",
      dateRange: undefined,
      sortBy: "date",
      sortOrder:"desc"
    },
  )

  // Handle title change
  // const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFilters({ ...filters, title: e.target.value })
  // }

  // Handle sort change
 const handleSortChange = (sortValue: string) => {
  const [sortBy, sortOrder] = sortValue.split("-")
  setFilters({ ...filters, sortBy, sortOrder: sortOrder as "asc" | "desc" })
  applyFiltersWithSort(sortBy, sortOrder as "asc" | "desc")
}


  // Apply filters with sort
 const applyFiltersWithSort = (sortBy?: string, sortOrder?: "asc" | "desc") => {
  const params = new URLSearchParams()

  if (filters.title) params.set("title", filters.title)
  if (filters.dateRange?.from) params.set("startDate", format(filters.dateRange.from, "yyyy-MM-dd"))
  if (filters.dateRange?.to) params.set("endDate", format(filters.dateRange.to, "yyyy-MM-dd"))

  // Kirim sortBy dan sortOrder yang valid
  params.set("sortBy", sortBy || filters.sortBy)
  params.set("sortOrder", sortOrder || filters.sortOrder)

  params.set("page", "1") // reset page ketika filter berubah
  router.push(`${pathname}?${params.toString()}`)
}


  // Apply filters
  // const applyFilters = () => {
  //   applyFiltersWithSort()
  // }

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  // Format date for calendar display
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = date.toLocaleDateString("en", { month: "short" })
    const year = date.getFullYear()
    return { day, month, year }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white p-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Upcoming Events</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Explore the best cultural, sports, and entertainment events across Indonesia
          </p>
        </div>
        <Image
          width={1200}
          height={400}
          src="/images/events-banner.jpg"
          alt="Events in Indonesia"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Search Bar */}
      {/* <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-10 h-12"
            value={filters.title}
            onChange={handleTitleChange}
            onKeyPress={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>
      </div> */}

      {/* Controls Bar */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Events ({data?.length || 0})</h2>

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <ArrowUpDown size={16} />
                  Sort by Date
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup
  value={`${filters.sortBy}-${filters.sortOrder}`}
  onValueChange={handleSortChange}
>

                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.value} value={option.value}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Filters Toggle */}
          {/* <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter size={16} />
            More Filters
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button> */}
        </div>

        {/* Collapsible Filters */}
      
      </div>

      {/* Events Grid */}
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {data.map((event) => {
            const eventDate = formatEventDate(event.date)
            const eventTitle = language === "en" ? event.english_title : event.title
            const eventDescription = language === "en" ? event.english_description : event.description

            return (
              <Link key={event.slug} href={`/events/${event.slug}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden p-0">
                  <div className="relative">
                    <Image
                      src={event.image || "/placeholder.svg?height=200&width=300"}
                      alt={eventTitle}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Calendar Date Overlay */}
                    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-2 text-center min-w-[60px]">
                      <div className="text-xs font-semibold text-red-600 uppercase">{eventDate.month}</div>
                      <div className="text-lg font-bold text-gray-900">{eventDate.day}</div>
                      <div className="text-xs text-gray-600">{eventDate.year}</div>
                    </div>

                    {/* Category Badge */}
                    <Badge variant="secondary" className="absolute top-4 right-4 bg-black/70 text-white">
                      {event.category}
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {eventTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{eventDescription}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">📍 {event.location}</span>
                      <span className="font-medium text-primary">{event.province}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
          </div>
          <p className="text-lg text-muted-foreground">No events found matching your criteria.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search or filters to find more events.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button variant="outline" size="icon" onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (page <= 3) {
                pageNum = i + 1
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = page - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="w-10 h-10"
                >
                  {pageNum}
                </Button>
              )
            })}
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
  )
}
