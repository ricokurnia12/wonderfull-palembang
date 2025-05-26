"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "@/types/blog"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
// import { useLanguage } from "@/context/LanguageContext"
interface BlogCardProps {
  post: BlogPost
  index: number
  title: string
  excerpt: string
}

export function BlogCard({ post, index, title, excerpt }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 relative"
    >
      <Link href={`/explore/${post.slug}`}>
        {/* isi gambar dan konten */}
        <div className="relative overflow-hidden">
          <Image
            src={post.coverImage || "/placeholder.svg?height=200&width=400"}
            alt={post.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {post.featured && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600">Featured</Badge>
          )}
          <Badge variant="secondary" className="absolute top-3 right-3 bg-white/90 text-gray-700">
            {post.category}
          </Badge>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 ampera-text-gradient-hover transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* underline gradient saat hover */}
      {/* <div className="h-1 bg-gradient-to-r from-red-700 via-yellow-400 to-red-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 shadow-[0_0_10px_rgba(255,215,0,0.6)]" /> */}
      <div className="h-1 bg-gradient-to-r from-[#e53935] via-[#fdd835] to-[#ec4899] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 shadow-[0_0_12px_rgba(253,216,53,0.8)] blur-[0.5px]" />

    </motion.article>

  )
}
