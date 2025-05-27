"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "@/types/blog"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FeaturedPostProps {
  post: BlogPost
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group bg-gradient-to-r from-yellow-50 to-red-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <Link href={`/explore/${post.slug}`}>
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge className="ampera-gradient border-none">Featured</Badge>
              <Badge variant="secondary">{post.category}</Badge>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight ampera-text-gradient-hover transition-colors">
              {post.title}
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">{post.excerpt}</p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src={post.coverImage || "/placeholder.svg?height=300&width=500"}
              alt={post.title}
              width={500}
              height={300}
              className="w-full h-64 md:h-full object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
