"use client"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Star, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"

interface Hotel {
    id: number
    name: string
    address: string
    facilities_english: string[]
    facilities: string[]
    nearest_places: Array<{ name: string; distance: string }>
    image_url: string
    traveloka_url: string
    maps: string
    phone: string
    star: number
    description: string
    description_english: string
}

interface HotelCardProps {
    hotel: Hotel
    index: number
}


export function HotelCard({ hotel, index }: HotelCardProps) {
    const { language } = useLanguage()
    // Filter out "Selengkapnya" and get top 3 facilities
    const displayFacilities = (language === "id" ? hotel.facilities : hotel.facilities_english)
        .filter((f) => f !== "Selengkapnya" && f !== "Read More")
        .slice(0, 3)




    const isValidImage = hotel.image_url && hotel.image_url.startsWith("http")

    // Render star rating
    const renderStars = (rating: number) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <Star className="w-4 h-4 text-gray-300" />
                        <Star
                            className="w-4 h-4 fill-amber-400 text-amber-400 absolute top-0 left-0 overflow-hidden"
                            style={{ clipPath: "inset(0 50% 0 0)" }}
                        />
                    </div>,
                )
            } else {
                stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />)
            }
        }
        return stars
    }

    return (
        <Card
            className="p-0 group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg animate-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <CardContent className="p-0">
                <div className="relative overflow-hidden">
                    <Image
                        src={isValidImage ? hotel.image_url : "/placeholder.svg?height=250&width=400"}
                        alt={hotel.name}
                        width={400}
                        height={250}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Star Rating Badge - Positioned on image
                    <div className="absolute top-4 right-4">
                        <Badge className="bg-white/95 backdrop-blur-sm text-gray-900 border-0 shadow-lg hover:bg-white transition-all duration-200">
                            <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="font-semibold text-sm">{hotel.star}</span>
                            </div>
                        </Badge>
                    </div> */}
                </div>

                <div className="p-6">
                    <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-xl text-gray-900 ampera-text-gradient-hover transition-colors duration-200 line-clamp-2 flex-1">
                                {hotel.name}
                            </h3>
                        </div>

                        {/* Star Rating Display */}
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">{renderStars(hotel.star)}</div>
                            <span className="text-sm font-medium text-gray-600">{hotel.star} bintang</span>
                        </div>

                        <div className="flex items-start text-gray-500 mb-3">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500 mt-0.5" />
                            <span className="text-sm line-clamp-2">{hotel.address}</span>
                        </div>

                        {/* Phone Number */}
                        {hotel.phone && (
                            <div className="flex items-center text-gray-500 mb-3">
                                <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-green-500" />
                                <span className="text-sm">{hotel.phone}</span>
                            </div>
                        )}
                    </div>

                    {/* Enhanced Facilities Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {displayFacilities.map((facility, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 shadow-sm"
                            >
                                {facility}
                            </Badge>
                        ))}
                        {hotel.facilities.filter((f) => f !== "Selengkapnya").length > 3 && (
                            <Badge
                                variant="outline"
                                className="text-xs border-amber-200 text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors duration-200"
                            >
                                +{hotel.facilities.filter((f) => f !== "Selengkapnya").length - 3} lainnya
                            </Badge>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <Button
                            asChild
                            className="flex-1 bg-gradient-to-r ampera-gradient hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <Link href={`/hotels/${hotel.id}`}>{language === "id" ? "Lihat Detail" : 'See Detail'}</Link>
                        </Button>
                        <Link href={hotel.traveloka_url} target="_blank" rel="noopener noreferrer">
                            <Button
                                variant="outline"
                                className="border-blue-200 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                Traveloka
                                <Image alt="traveloka" src={"/images/traveloka.png"} width={40} height={40} className="w-8 ml-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
