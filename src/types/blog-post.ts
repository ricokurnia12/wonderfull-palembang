export interface Author {
    name: string
    role: string
    avatar: string
  }
  
  export interface BlogPost {
    id: number
    title: string
    slug: string
    excerpt: string
    content: string
    date: string
    readTime: number
    category: string
    coverImage: string
    author: Author
    featured?: boolean
  }
  