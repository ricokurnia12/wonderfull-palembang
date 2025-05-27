import { notFound } from "next/navigation"
import type { Metadata } from "next"
import hotels from "../../../../data/hotels-data.json"
import { HotelDetailClient } from "./detail-hotel"
interface PageProps {
    params: Promise<{ id: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const hotel = hotels.hotels.find((h) => h.id === Number.parseInt(id))

    if (!hotel) {
        return {
            title: "Hotel Not Found",
            description: "The requested hotel could not be found.",
        }
    }

    return {
        title: `${hotel.name} - ${hotel.star} Star Hotel in Palembang`,
        description: hotel.description_english.slice(0, 160),
        keywords: `${hotel.name}, hotel, Palembang, ${hotel.star} star, accommodation, ${hotel.facilities_english.join(", ")}`,
        openGraph: {
            title: hotel.name,
            description: hotel.description_english,
            images: [
                {
                    url: hotel.image_url,
                    width: 1200,
                    height: 630,
                    alt: hotel.name,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: hotel.name,
            description: hotel.description_english,
            images: [hotel.image_url],
        },
    }
}

// Generate static params for better performance
export async function generateStaticParams() {
    return hotels.hotels.map((hotel) => ({
        id: hotel.id.toString(),
    }))
}

export default async function HotelDetailPage({ params }: PageProps) {
    const { id } = await params
    const hotel = hotels.hotels.find((h) => h.id === Number.parseInt(id))

    if (!hotel) {
        notFound()
    }

    // Generate structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        name: hotel.name,
        description: hotel.description_english,
        address: {
            "@type": "PostalAddress",
            streetAddress: hotel.address,
            addressLocality: "Palembang",
            addressRegion: "South Sumatra",
            addressCountry: "Indonesia",
        },
        telephone: hotel.phone,
        starRating: {
            "@type": "Rating",
            ratingValue: hotel.star,
            bestRating: "5",
        },
        image: hotel.image_url,
        url: hotel.traveloka_url,
        amenityFeature: hotel.facilities_english.map((facility) => ({
            "@type": "LocationFeatureSpecification",
            name: facility,
        })),
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
            <HotelDetailClient hotel={hotel} />
        </>
    )
}
