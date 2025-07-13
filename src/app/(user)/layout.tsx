import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "../globals.css";
import Footer from "../Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "../Navbar";
import { GoogleAnalytics } from "@next/third-parties/google";

const lora = Lora({
  subsets: ["latin"], // Supports Latin characters
  weight: ["400", "700"], // Load only the required font weights
  style: ["normal", "italic"], // Load normal & italic styles
  display: "swap", // Improves font loading behavior
});

// --- SEO-FRIENDLY METADATA START ---
export const metadata: Metadata = {
  // Primary SEO Title: Clear, concise, and keyword-rich
  title: {
    default: "Wonder Palembang - Explore The Rich Culture & Beauty of South Sumatra",
    template: "%s | Wonder Palembang", // Template for page-specific titles
  },
  // Meta Description: A compelling summary for search engines
  description:
    "Discover the wonders of Palembang, the heart of South Sumatra. Explore historical sites, vibrant culinary experiences, traditional arts, and natural beauty. Your ultimate guide to tourism and culture in Palembang.",
  // Keywords: Relevant terms for search engines (comma-separated)
  keywords: [
    "Palembang tourism",
    "South Sumatra travel",
    "Palembang culture",
    "Musil River",
    "Ampera Bridge",
    "Pempek Palembang",
    "historical sites Palembang",
    "Palembang attractions",
    "Indonesia travel",
    "cultural tours Palembang",
  ],
  // Author information
  authors: [{ name: "Wonder Palembang Team", url: "https://www.wonderpalembang.com" }],
  // Creator/Publisher information
  creator: "Wonder Palembang Team",
  publisher: "Wonder Palembang",

  // Robots meta tag: Controls search engine crawling and indexing
  // 'index, follow' is generally recommended for public pages
  // 'noindex, nofollow' can be used for private or irrelevant pages
  robots: {
    index: true,
    follow: true,
    nocache: true, // Instructs search engines not to cache the page
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  // Open Graph metadata (for social media sharing, e.g., Facebook, LinkedIn)
  openGraph: {
    title: "Wonder Palembang - Explore The Rich Culture & Beauty of South Sumatra",
    description:
      "Discover the wonders of Palembang, the heart of South Sumatra. Explore historical sites, vibrant culinary experiences, traditional arts, and natural beauty. Your ultimate guide to tourism and culture in Palembang.",
    url: "https://www.wonderpalembang.site", // Canonical URL of the page
    siteName: "Wonder Palembang",
    // images: [
    //   {
    //     url: "https://www.wonderpalembang.com/og-image.jpg", // Replace with your actual Open Graph image URL
    //     width: 1200,
    //     height: 630,
    //     alt: "Ampera Bridge and Musi River in Palembang",
    //   },
    //   {
    //     url: "https://www.wonderpalembang.com/og-image-alt.jpg", // Optional: another image
    //     width: 800,
    //     height: 600,
    //     alt: "Traditional Palembang food, Pempek",
    //   },
    // ],
    locale: "en_US",
    type: "website", // Or 'article', 'profile', etc.
  },

  // Twitter Card metadata (for Twitter sharing)
  twitter: {
    card: "summary_large_image", // 'summary', 'summary_large_image', 'app', or 'player'
    title: "Wonder Palembang - Explore The Rich Culture & Beauty of South Sumatra",
    description:
      "Discover the wonders of Palembang, the heart of South Sumatra. Explore historical sites, vibrant culinary experiences, traditional arts, and natural beauty. Your ultimate guide to tourism and culture in Palembang.",
    // creator: "@YourTwitterHandle", // Replace with your Twitter handle
    // images: ["https://www.wonderpalembang.com/twitter-image.jpg"], // Replace with your actual Twitter card image URL
  },

  // Canonical URL (optional, but good for SEO if you have multiple URLs for the same content)
  // This is typically handled at the page level, but can be set globally if applicable
  // canonical: "https://www.wonderpalembang.com",

  // Favicons/Icons (optional, but good for branding and user experience)
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },

  // Manifest (for Progressive Web Apps - PWAs)
  // manifest: "/site.webmanifest",
};
// --- SEO-FRIENDLY METADATA END ---

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.className} antialiased`}>
         {/* Google Analytics component */}
         {process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
         )}
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
        <Footer />
      </body>
    </html>
  );
}
