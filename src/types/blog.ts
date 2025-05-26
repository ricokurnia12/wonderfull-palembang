export interface BlogPost {
    ID: number
    title: string
    english_title: string
    slug: string
    excerpt: string
    english_excerpt: string
    content: string
    englishcontent: string
    date: string
    readTime: number
    category: string
    coverImage: string
    featured: boolean
    CreatedAt: string
    UpdatedAt: string
    DeletedAt?: string
  }
  
  export interface BlogResponse {
    data: BlogPost[]
    total: number
    page: number
    limit: number
  }
  
  export interface BlogSearchParams {
    search?: string
    category?: string
    page?: string
    limit?: string
  }
  