
import Image from "next/image";

import { Metadata } from "next";
import ExploreByCard from "./exploreByCard";
import HeaderDest from "./header-destination";

interface FeaturedPost {
  ID: number;
  title: string;
  excerpt: string;
  english_excerpt: string;
  english_title: string;
  coverImage: string;
  slug: string;
}

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Explore Palembang Destinations | Discovering Sriwijaya Heritage",
  description: "Discover Palembang's rich cultural heritage and historic destinations. Explore the ancient Sriwijaya kingdom's legacy through museums, palaces, and cultural sites.",
  keywords: ["Palembang", "Sriwijaya", "Indonesia tourism", "cultural heritage", "historic destinations"],
  openGraph: {
    title: "Explore Palembang Destinations | Discovering Sriwijaya Heritage",
    description: "Discover Palembang's rich cultural heritage and historic destinations. Explore the ancient Sriwijaya kingdom's legacy through museums, palaces, and cultural sites.",
    // images: [
    //   {
    //     url: "https://palpos.bacakoran.co/upload/1afd9c0833626042ce6d6906f18f06c5.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Palembang Sriwijaya Heritage",
    //   },
    // ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Palembang Destinations | Discovering Sriwijaya Heritage",
    description: "Discover Palembang's rich cultural heritage and historic destinations.",
    images: ["https://palpos.bacakoran.co/upload/1afd9c0833626042ce6d6906f18f06c5.jpg"],
  },
};

// Server-side data fetching function
async function getFeaturedPosts(): Promise<FeaturedPost[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogposts?featured=true`,
      {
        // next: { revalidate: 3600 }, // Revalidate every hour
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch featured posts: ${res.status}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch featured posts:", error);
    return [];
  }
}

// Server Component
export default async function ExploreBy() {
  const featuredPosts = await getFeaturedPosts();

 
  return (
    <>
      {/* Structured Data */}
  

      <div className="container mx-auto px-4 py-12">
        {/* SEO-optimized heading structure */}
        <header className="text-center mb-12">
         <HeaderDest/>        </header>

        {/* Hero Section */}
        <section className="grid md:grid-cols-6 gap-8 items-start mb-12">
          <div className="relative col-span-4">
            <Image
              src="https://palpos.bacakoran.co/upload/1afd9c0833626042ce6d6906f18f06c5.jpg"
              alt="Historic Palembang showcasing Sriwijaya heritage and cultural landmarks"
              width={800}
              height={600}
              className="mx-auto w-full rounded-2xl shadow-2xl"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
            />
          </div>

          <div className="space-y-6 col-span-2">
            <h2 className="text-5xl font-bold text-[#9B1B30]">
              Discovering Palembang
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              An old city with traces of Sriwijaya&apos;s glory. From grand
              palaces to historic museums, discover the stories of the past that
              still live on today!
            </p>
          </div>
        </section>

        {/* Featured Destinations */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Destinations
          </h2>
          
          {featuredPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
               <ExploreByCard key={post.ID} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Featured destinations are being updated. Please check back soon!
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}