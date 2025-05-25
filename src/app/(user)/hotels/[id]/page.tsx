import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
    ArrowLeft,
    MapPin,
    Star,
    Wifi,
    Car,
    Utensils,
    Waves,
    Clock,
    CableCarIcon as Elevator,
    Snowflake,
    Dumbbell,
} from "lucide-react"
import hotels from '../../../../data/hotels-data.json'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PageProps {
    params: Promise<{ id: string }>
}

const facilityIcons: Record<string, any> = {
    AC: Snowflake,
    Restoran: Utensils,
    "Kolam Renang": Waves,
    "Resepsionis 24 Jam": Clock,
    Parkir: Car,
    WiFi: Wifi,
    Lift: Elevator,
    Gym: Dumbbell,
    Spa: Star,
}

export default async function HotelDetailPage({ params }: PageProps) {
    const { id } = await params
    const hotel = hotels.hotels.find((h) => h.id === Number.parseInt(id))

    if (!hotel) {
        notFound()
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price)
    }

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

    // Filter out "Selengkapnya" from facilities
    const displayFacilities = hotel.facilities.filter((f) => f !== "Selengkapnya")

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href="/">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Daftar Hotel
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                            <Image
                                src={hotel.image_url || "/placeholder.svg"}
                                alt={hotel.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 text-white">
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold  mb-2">{hotel.name}</h1>
                                    <div className="flex items-start  mb-2">
                                        <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm">{hotel.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <Card>
                            <CardHeader>
                                <CardTitle>Tempat Terdekat</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {processedPlaces.map((place, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gray-500" />
                                                <span className="font-medium">{place.name}</span>
                                            </div>
                                            <Badge variant="secondary">{place.distance}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Harga</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <p className="text-2xl font-bold text-blue-600 mb-1">{formatPrice(hotel.price_per_night)}</p>
                                    <p className="text-sm text-gray-600">per malam (estimasi)</p>
                                </div>

                                <Button asChild className="w-full" size="lg">
                                    <a href={hotel.traveloka_url} target="_blank" rel="noopener noreferrer">
                                        Lihat di Traveloka
                                    </a>
                                </Button>

                                <p className="text-xs text-gray-500 text-center">
                                    Harga dapat berubah sewaktu-waktu. Kunjungi Traveloka untuk informasi terkini.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Fasilitas Hotel</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {displayFacilities.map((facility, index) => {
                                        const IconComponent = facilityIcons[facility] || Star
                                        return (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                                <IconComponent className="w-5 h-5 text-blue-600" />
                                                <span className="text-sm font-medium">{facility}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
