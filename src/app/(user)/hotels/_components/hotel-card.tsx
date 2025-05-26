'use client'
import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Hotel {
    id: number
    name: string
    address: string
    facilities_english: string[]
    facilities: string[]
    nearest_places: Array<{ name: string; distance: string }>
    image_url: string
    traveloka_url: string
    // price_per_night: number
}

interface HotelCardProps {
    hotel: Hotel
    index: number
}

export function HotelCard({ hotel, index }: HotelCardProps) {
    // const formatPrice = (price: number) => {
    //     return new Intl.NumberFormat("id-ID", {
    //         style: "currency",
    //         currency: "IDR",
    //         minimumFractionDigits: 0,
    //     }).format(price)
    // }
    // console.log({ hotel });

    // Filter out "Selengkapnya" and get top 3 facilities
    const displayFacilities = hotel.facilities.filter((f) => f !== "Selengkapnya").slice(0, 3)

    // Process nearest places - combine pairs to create meaningful location info
    const processedPlaces = []
    for (let i = 0; i < hotel.nearest_places.length; i += 2) {
        const place = hotel.nearest_places[i]
        const distance = hotel.nearest_places[i + 1]
        if (place && distance) {
            // Check if distance contains a number (like "562", "1.04")
            if (/\d/.test(distance.name)) {
                processedPlaces.push({
                    name: place.name + (place.distance !== place.name ? ` ${place.distance}` : ""),
                    distance: `${distance.name} ${distance.distance}`,
                })
            } else {
                // If no number in distance, combine differently
                processedPlaces.push({
                    name: `${place.name} ${place.distance}`,
                    distance: `${distance.name} ${distance.distance}`,
                })
            }
        }
    }
    const isValidImage = hotel.image_url && hotel.image_url.startsWith("http")


    return (
        <Card
            className="p-0 group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg animate-in slide-in-from-bottom-4 "
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <CardContent className="p-0">
                <div className="relative overflow-hidden">
                    <Image
                        src={isValidImage ? hotel.image_url : "/placeholder.svg?height=250&width=400"}
                        alt={hotel.name}
                        width={400}
                        height={250}
                        className="w-full h-64 object-cover  group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                </div>

                <div className="p-6">
                    <div className="mb-4">
                        <h3 className="font-bold text-xl mb-2 text-gray-900 ampera-text-gradient-hover  transition-colors duration-200 line-clamp-2">
                            {hotel.name}
                        </h3>

                        <div className="flex items-start text-gray-500 mb-3">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500 mt-0.5" />
                            <span className="text-sm line-clamp-2">{hotel.address}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {displayFacilities.map((facility, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs bg-blue-50  hover:bg-blue-100 transition-colors"
                            >
                                {facility}
                            </Badge>
                        ))}
                        {hotel.facilities.filter((f) => f !== "Selengkapnya").length > 3 && (
                            <Badge variant="outline" className="text-xs border-blue-200 text-red-400">
                                +{hotel.facilities.filter((f) => f !== "Selengkapnya").length - 3} lainnya
                            </Badge>
                        )}
                    </div>


                    <div className="flex gap-3">
                        <Button
                            asChild
                            className="flex-1 bg-gradient-to-r ampera-gradient hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                        >
                            <Link href={`/hotels/${hotel.id}`}>Lihat Detail</Link>
                        </Button>
                        <Link href={hotel.traveloka_url} target="_blank" rel="noopener noreferrer" className="">
                            <Button variant="outline" className="border-blue-200  hover:bg-blue-50">

                                Traveloka
                                <Image alt="traveloka" src={'/images/traveloka.png'} width={40} height={40} className="w-8" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
