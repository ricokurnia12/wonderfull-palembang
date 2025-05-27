"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { Calendar, Clock, ArrowUpRight, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  post: BlogPost;
  index: number;
  title: string;
  excerpt: string;
}

export function BlogCard({ post, index, title, excerpt }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative bg-gradient-to-br from-white via-white to-gray-50/30 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200/50 backdrop-blur-sm"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/[0.02] pointer-events-none" />

      <Link href={`/explore/${post.slug}`} className="block">
        {/* Enhanced image container with 16:9 ratio */}
        <div className="relative overflow-hidden">
          <div className="aspect-[16/9] relative">
            <Image
              src={post.coverImage || "/placeholder.svg?height=360&width=640"}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Enhanced badges with better positioning */}
          <div className="absolute top-4 left-4 flex gap-2">
            {post.featured && (
              <Badge className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white border-0 shadow-lg backdrop-blur-md font-semibold px-3 py-1">
                ✨ Featured
              </Badge>
            )}
          </div>

          <div className="absolute top-4 right-4">
            <Badge
              variant="secondary"
              className="bg-white/95 backdrop-blur-md text-gray-800 border-0 shadow-lg font-medium px-3 py-1"
            >
              {post.category}
            </Badge>
          </div>

          {/* Bookmark icon */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg hover:bg-white transition-colors">
              <Bookmark className="w-4 h-4 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Enhanced content section */}
        <div className="p-8 space-y-4">
          {/* Title with enhanced typography */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-2xl font-bold leading-tight text-gray-900 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-300">
              {title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 mt-1" />
          </div>

          {/* Enhanced excerpt */}
          <p className="text-gray-600 leading-relaxed line-clamp-3 text-base">
            {excerpt}
          </p>

          {/* Enhanced metadata section */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="p-1 rounded-full bg-gray-100">
                  <Calendar className="w-3 h-3" />
                </div>
                <span className="font-medium">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="p-1 rounded-full bg-gray-100">
                  <Clock className="w-3 h-3" />
                </div>
                <span className="font-medium">{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Enhanced gradient underline with glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 shadow-[0_0_20px_rgba(251,146,60,0.8)]" />

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-amber-200/50 group-hover:to-orange-200/50 transition-all duration-300 pointer-events-none" />
    </motion.article>
  );
}
