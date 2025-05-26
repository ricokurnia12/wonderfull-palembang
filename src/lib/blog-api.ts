import type { BlogResponse, BlogSearchParams } from "@/types/blog"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchBlogPosts(params: BlogSearchParams = {}): Promise<BlogResponse> {
    const searchParams = new URLSearchParams()

    if (params.search) searchParams.set("search", params.search)
    if (params.category) searchParams.set("category", params.category)
    if (params.page) searchParams.set("page", params.page)
    if (params.limit) searchParams.set("limit", params.limit)

    const url = `${API_URL}/blogposts?${searchParams.toString()}`

    try {
        const response = await fetch(url, {
            next: { revalidate: 300 }, // Revalidate every 5 minutes
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch blog posts: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching blog posts:", error)
        throw error
    }
}

export async function fetchFeaturedPosts(): Promise<BlogResponse> {
    return fetchBlogPosts({ limit: "10" }) // We'll filter featured on client side for now
}
