import { Suspense } from "react"
import { BlogListClient } from "./blog-list-client"
import { fetchBlogPosts } from "@/lib/blog-api"
import type { BlogSearchParams } from "@/types/blog"
import { Loader2 } from "lucide-react"

interface BlogPageProps {
  searchParams: BlogSearchParams
}

async function BlogContent({ searchParams }: BlogPageProps) {
  try {
    const initialData = await fetchBlogPosts({
      search: searchParams.search,
      category: searchParams.category,
      page: searchParams.page || "1",
      limit: "12",
    })

    return (
      <BlogListClient
        initialData={initialData}
        initialSearch={searchParams.search}
        initialCategory={searchParams.category}
      />
    )
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Error Loading Blog Posts</h1>
        <p className="text-gray-600">Were having trouble loading the blog posts. Please try again later.</p>
      </div>
    )
  }
}

function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500">
          Discover Perspectives
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore thought-provoking stories across food, culture, and religion that connect us all.
        </p>
      </div>

      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <span className="ml-2 text-gray-600">Loading blog posts...</span>
      </div>
    </div>
  )
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogContent searchParams={searchParams} />
    </Suspense>
  )
}

export async function generateMetadata({ searchParams }: BlogPageProps) {
  const category = searchParams.category
  const search = searchParams.search

  let title = "Blog - Discover Perspectives"
  let description = "Explore thought-provoking stories across food, culture, and religion that connect us all."

  if (category) {
    title = `${category.charAt(0).toUpperCase() + category.slice(1)} Articles - Discover Perspectives`
    description = `Explore ${category} articles and stories that inspire and connect us.`
  }

  if (search) {
    title = `Search: ${search} - Discover Perspectives`
    description = `Search results for "${search}" - Find articles and stories that matter.`
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}
