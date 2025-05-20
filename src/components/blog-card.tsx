"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { Clock, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { BlogPost } from "@/types/blog-post"

interface BlogCardProps {
  post: BlogPost
  index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Different card styles based on category
  const getCategoryStyles = () => {
    switch (post.category) {
      case "Food":
        return {
          gradientFrom: "from-amber-500",
          gradientTo: "to-orange-500",
          shadowColor: "shadow-amber-200",
          badgeColor: "bg-amber-100 text-amber-800",
          iconBg: "bg-amber-100",
        }
      case "Culture":
        return {
          gradientFrom: "from-purple-500",
          gradientTo: "to-indigo-500",
          shadowColor: "shadow-purple-200",
          badgeColor: "bg-purple-100 text-purple-800",
          iconBg: "bg-purple-100",
        }
      case "Religion":
        return {
          gradientFrom: "from-emerald-500",
          gradientTo: "to-teal-500",
          shadowColor: "shadow-emerald-200",
          badgeColor: "bg-emerald-100 text-emerald-800",
          iconBg: "bg-emerald-100",
        }
      default:
        return {
          gradientFrom: "from-gray-500",
          gradientTo: "to-gray-700",
          shadowColor: "shadow-gray-200",
          badgeColor: "bg-gray-100 text-gray-800",
          iconBg: "bg-gray-100",
        }
    }
  }

  const styles = getCategoryStyles()

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
      },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${styles.shadowColor}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category indicator */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rotate-45 bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} z-10`}
      ></div>

      {/* Image container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={post.coverImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Category badge */}
        <div className="absolute top-4 right-4 z-20">
          <Badge className={`${styles.badgeColor} px-3 py-1 text-sm font-medium`}>{post.category}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta info */}
        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

        {/* Author */}
        <div className="flex items-center pt-4 border-t border-gray-100">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="text-xs text-gray-500">{post.author.role}</p>
          </div>
        </div>
      </div>

      {/* Read more link with animated underline */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-purple-500 transition-all duration-300"></div>
    </motion.div>
  )
}
