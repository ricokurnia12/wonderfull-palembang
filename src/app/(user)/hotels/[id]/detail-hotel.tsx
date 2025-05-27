/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
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
  Phone,
  ExternalLink,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";
interface Hotel {
  id: number;
  name: string;
  address: string;
  facilities_english: string[];
  facilities: string[];
  nearest_places: Array<{ name: string; distance: string }>;
  image_url: string;
  traveloka_url: string;
  maps: string;
  phone: string;
  star: number;
  description: string;
  description_english: string;
}

interface HotelDetailClientProps {
  hotel: Hotel;
}

const facilityIcons: Record<string, any> = {
  AC: Snowflake,
  "Air Conditioning": Snowflake,
  Restoran: Utensils,
  Restaurant: Utensils,
  "Kolam Renang": Waves,
  "Swimming Pool": Waves,
  "Resepsionis 24 Jam": Clock,
  "24-Hour Front Desk": Clock,
  Parkir: Car,
  Parking: Car,
  WiFi: Wifi,
  Lift: Elevator,
  Elevator: Elevator,
  Gym: Dumbbell,
  Spa: Star,
};

export function HotelDetailClient({ hotel }: HotelDetailClientProps) {
  const { language } = useLanguage();

  // Process nearest places
  const processedPlaces = [];
  for (let i = 0; i < hotel.nearest_places.length; i += 2) {
    const place = hotel.nearest_places[i];
    const distance = hotel.nearest_places[i + 1];
    if (place && distance) {
      if (/\d/.test(distance.name)) {
        processedPlaces.push({
          name:
            place.name +
            (place.distance !== place.name ? ` ${place.distance}` : ""),
          distance: `${distance.name} ${distance.distance}`,
        });
      } else {
        processedPlaces.push({
          name: `${place.name} ${place.distance}`,
          distance: `${distance.name} ${distance.distance}`,
        });
      }
    }
  }

  // Get facilities based on language
  const displayFacilities =
    language === "id"
      ? hotel.facilities.filter((f) => f !== "Selengkapnya")
      : hotel.facilities_english.filter((f) => f !== "Read More");

  // Get description based on language
  const description =
    language === "id" ? hotel.description : hotel.description_english;

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "id"
                  ? "Kembali ke Daftar Hotel"
                  : "Back to Hotel List"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
          <Image
            src={hotel.image_url || "/placeholder.svg?height=500&width=1200"}
            alt={`${hotel.name} - ${hotel.star} star hotel in Palembang`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />

          {/* Hotel Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 text-white">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(hotel.star)}
                </div>
                <Badge className="bg-amber-500 text-white border-0">
                  {hotel.star} {language === "id" ? "Bintang" : "Star"}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                {hotel.name}
              </h1>

              <div className="flex items-start gap-2 mb-4">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-300" />
                <p className="text-lg opacity-90 leading-relaxed">
                  {hotel.address}
                </p>
              </div>

              {hotel.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-300" />
                  <a
                    href={`tel:${hotel.phone}`}
                    className="text-lg hover:text-blue-300 transition-colors"
                  >
                    {hotel.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">
                  {language === "id" ? "Tentang Hotel" : "About Hotel"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {description}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 relative">
              <Link href={hotel.maps} target="_blank">
                <Button variant={"outline"} className="absolute top-4 right-4">
                  <Map />
                  Lihat Rute
                </Button>
              </Link>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">
                  {language === "id" ? "Informasi Hotel" : "Hotel Information"}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Kolom Kiri: Lokasi dan Tempat Terdekat */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-1">
                        {language === "id"
                          ? "Di Sekitar Lokasi"
                          : "In the Area"}
                      </h3>
                      <p className="text-sm text-gray-600">{hotel.address}</p>
                    </div>

                    <div>
                      <div className="space-y-3">
                        {processedPlaces.map((place, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2 hover:bg-gray-100 transition"
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-800">
                                {place.name}
                              </span>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-blue-100 text-blue-700 text-xs"
                            >
                              {place.distance}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Kolom Kanan: Fasilitas */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-700">
                        {language === "id"
                          ? "Fasilitas Utama"
                          : "Main Facilities"}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {displayFacilities.map((facility, index) => {
                        const IconComponent = facilityIcons[facility] || Star;
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-sm transition"
                          >
                            <IconComponent className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-800">
                              {facility}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="shadow-lg border-0 sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">
                  {language === "id" ? "Pesan Sekarang" : "Book Now"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {renderStars(hotel.star)}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {language === "id" ? "Hotel Bintang" : "Star Hotel"}{" "}
                    {hotel.star}
                  </p>
                  <p className="text-sm text-gray-600">
                    {language === "id"
                      ? "Harga terbaik tersedia di Traveloka"
                      : "Best prices available on Traveloka"}
                  </p>
                </div>

                <Button
                  variant={"outline"}
                  asChild
                  className="w-full"
                  size="lg"
                >
                  <a
                    href={hotel.traveloka_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {language === "id"
                      ? "Pesan di Traveloka"
                      : "Book on Traveloka"}
                  </a>
                </Button>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">
                    {language === "id" ? "Kontak Hotel" : "Hotel Contact"}
                  </h4>

                  {hotel.phone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-4 h-4 text-green-600" />
                      <a
                        href={`tel:${hotel.phone}`}
                        className="text-sm font-medium hover:text-blue-600 transition-colors"
                      >
                        {hotel.phone}
                      </a>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  {language === "id"
                    ? "Harga dan ketersediaan dapat berubah. Kunjungi Traveloka untuk informasi terkini."
                    : "Prices and availability may change. Visit Traveloka for the latest information."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
