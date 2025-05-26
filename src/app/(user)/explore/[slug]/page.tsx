import { notFound } from "next/navigation"
import type { Metadata } from "next"
import BlogPostDetail from "./detail"
import { BlogPost } from "@/types/blog"


interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const apiUrl = process.env.PUBLIC_API_URL

  if (!apiUrl) {
    console.error("PUBLIC_API_URL environment variable is not set")
    return null
  }

  try {
    const response = await fetch(`${apiUrl}/blogposts/slug/${slug}`, {
      // Add cache revalidation if needed
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch blog post: ${response.status}`)
    }

    const post = await response.json()
    return post
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchBlogPost(slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",

    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await fetchBlogPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostDetail post={post} />
}

// Generate static params for better performance (optional)
export async function generateStaticParams() {
  const apiUrl = process.env.PUBLIC_API_URL

  if (!apiUrl) {
    return []
  }

  try {
    const response = await fetch(`${apiUrl}/blogposts`)
    if (!response.ok) {
      return []
    }

    const posts: BlogPost[] = await response.json()
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}
