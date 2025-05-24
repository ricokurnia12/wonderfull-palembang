"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BlogCard } from "@/components/blog-card"
import { CategoryFilter } from "@/components/category-filter"
import { FeaturedPost } from "@/components/featured-post"
import { blogPosts } from "@/data/blog-post."
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  // Get featured posts (those marked as featured)
  const featuredPosts = blogPosts.filter((post) => post.featured)

  // Filter posts based on selected category and search query
  useEffect(() => {
    let result = [...blogPosts]

    // Filter by category if one is selected
    if (selectedCategory) {
      result = result.filter((post) => post.category === selectedCategory)
    }

    // Filter by search query if one exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (post) => post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query),
      )
    }

    setFilteredPosts(result)
  }, [selectedCategory, searchQuery])

  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500">
            Discover Perspectives
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore thought-provoking stories across food, culture, and religion that connect us all.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-10 pr-4 py-3 rounded-full border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        {/* Featured Post (only show when no category is selected) */}
        {!selectedCategory && featuredPosts.length > 0 && (
          <div className="mb-16">
            <FeaturedPost post={featuredPosts[0]} />
          </div>
        )}

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || "all"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => <BlogCard key={post.id} post={post} index={index} />)
            ) : (
              <div className="col-span-full text-center py-16">
                <h3 className="text-2xl font-semibold mb-2">No posts found</h3>
                <p className="text-gray-500">Try adjusting your search or category filter</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          </div>

          <div className="relative z-10 max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Newsletter</h3>
            <p className="text-gray-600 mb-6">
              Get notified about new articles and insights across food, culture, and religion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input type="email" placeholder="Your email address" className="flex-grow rounded-full" />
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2 px-6 rounded-full hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
