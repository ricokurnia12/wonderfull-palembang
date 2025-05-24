import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { BlogPost } from "@/types/blog-post"

interface FeaturedPostProps {
  post: BlogPost
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  // Different styles based on category
  const getCategoryStyles = () => {
    switch (post.category) {
      case "Food":
        return {
          gradientFrom: "from-amber-500",
          gradientTo: "to-orange-500",
          badgeColor: "bg-amber-100 text-amber-800",
        }
      case "Culture":
        return {
          gradientFrom: "from-purple-500",
          gradientTo: "to-indigo-500",
          badgeColor: "bg-purple-100 text-purple-800",
        }
      case "Religion":
        return {
          gradientFrom: "from-emerald-500",
          gradientTo: "to-teal-500",
          badgeColor: "bg-emerald-100 text-emerald-800",
        }
      default:
        return {
          gradientFrom: "from-gray-500",
          gradientTo: "to-gray-700",
          badgeColor: "bg-gray-100 text-gray-800",
        }
    }
  }

  const styles = getCategoryStyles()

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl group">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>

      {/* Featured tag */}
      <div className="absolute top-6 left-6 z-20">
        <div
          className={`bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} text-white px-4 py-1 rounded-full text-sm font-medium`}
        >
          Featured
        </div>
      </div>

      {/* Category badge */}
      <div className="absolute top-6 right-6 z-20">
        <Badge className={`${styles.badgeColor} px-3 py-1`}>{post.category}</Badge>
      </div>

      {/* Background image */}
      <div className="relative h-[500px] w-full">
        <Image
          src={post.coverImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
        <div className="flex flex-wrap items-center gap-4 text-white/80 mb-4 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h2>

        <p className="text-white/90 mb-6 max-w-2xl text-lg">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3 border-2 border-white">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback className="bg-white text-gray-800">{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-white">
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm opacity-80">{post.author.role}</p>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center text-white bg-white/20 hover:bg-white/30 px-5 py-2 rounded-full transition-colors"
          >
            <span className="mr-2">Read Article</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
