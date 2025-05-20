"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { format } from "date-fns"
import {
  Calendar,
  Clock,
  ArrowLeft,
  Bookmark,
  Heart,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  LinkIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { blogPosts } from "@/data/blog-post."
import type { BlogPost } from "@/types/blog-post"

interface BlogPostDetailProps {
  post: BlogPost
}

export default function BlogPostDetail({ post }: BlogPostDetailProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [activeSection, setActiveSection] = useState("article")
  const [scrollProgress, setScrollProgress] = useState(0)

  // Get related posts (same category, different post)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  // Get next and previous posts
  const currentIndex = blogPosts.findIndex((p) => p.id === post.id)
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  // Different styles based on category
  const getCategoryStyles = () => {
    switch (post.category) {
      case "Food":
        return {
          gradientFrom: "from-amber-500",
          gradientTo: "to-orange-500",
          badgeColor: "bg-amber-100 text-amber-800",
          accentColor: "bg-amber-500",
          lightBg: "bg-amber-50",
        }
      case "Culture":
        return {
          gradientFrom: "from-purple-500",
          gradientTo: "to-indigo-500",
          badgeColor: "bg-purple-100 text-purple-800",
          accentColor: "bg-purple-500",
          lightBg: "bg-purple-50",
        }
      case "Religion":
        return {
          gradientFrom: "from-emerald-500",
          gradientTo: "to-teal-500",
          badgeColor: "bg-emerald-100 text-emerald-800",
          accentColor: "bg-emerald-500",
          lightBg: "bg-emerald-50",
        }
      default:
        return {
          gradientFrom: "from-gray-500",
          gradientTo: "to-gray-700",
          badgeColor: "bg-gray-100 text-gray-800",
          accentColor: "bg-gray-500",
          lightBg: "bg-gray-50",
        }
    }
  }

  const styles = getCategoryStyles()

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.offsetHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)
      setScrollProgress(scrollPercent * 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Generate dummy content for the blog post
  const generateDummyContent = () => {
    return (
      <>
        <p className="text-lg leading-relaxed mb-6">
          {post.excerpt} This is an expanded introduction to the article that provides context and background
          information for the reader before diving into the main content.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">The Historical Context</h2>
        <p className="leading-relaxed mb-6">
          Throughout history, {post.category.toLowerCase()} has played a central role in shaping human societies and
          cultural identities. From ancient civilizations to modern communities, the practices and traditions associated
          with {post.category.toLowerCase()} have evolved while maintaining their core significance.
        </p>

        <div className="relative h-80 w-full my-8 rounded-xl overflow-hidden">
          <Image src={`/images/${post.slug}-detail-1.jpg`} alt="Detailed illustration" fill className="object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-sm">
            Historical artifacts showing the evolution of {post.category.toLowerCase()} traditions
          </div>
        </div>

        <p className="leading-relaxed mb-6">
          Scholars have long debated the origins and significance of these practices. Some argue that they emerged as
          practical solutions to everyday challenges, while others see them as expressions of deeper philosophical or
          spiritual beliefs that communities held.
        </p>

        <blockquote className={`${styles.lightBg} border-l-4 ${styles.accentColor} p-4 italic my-8`}>
          "The true essence of {post.category.toLowerCase()} lies not just in its outward expressions, but in how it
          connects people across generations and geographies, creating a shared sense of identity and purpose."
          <footer className="text-right mt-2 text-sm">— Dr. Elena Vasquez, {post.category} Studies</footer>
        </blockquote>

        <h2 className="text-2xl font-bold mt-10 mb-4">Contemporary Relevance</h2>
        <p className="leading-relaxed mb-6">
          In today's rapidly changing world, many wonder whether traditional {post.category.toLowerCase()} practices
          remain relevant. Evidence suggests that rather than disappearing, these traditions are adapting to
          contemporary contexts while preserving their core values and meanings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image
              src={`/images/${post.slug}-detail-2.jpg`}
              alt="Traditional practices"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image
              src={`/images/${post.slug}-detail-3.jpg`}
              alt="Modern interpretations"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <p className="leading-relaxed mb-6">
          Young people are increasingly interested in reconnecting with their cultural heritage, seeing it not as
          outdated tradition but as a source of identity and meaning in an often fragmented social landscape.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Global Perspectives</h2>
        <p className="leading-relaxed mb-6">
          While specific practices vary widely across cultures, there are remarkable similarities in how different
          societies approach {post.category.toLowerCase()}. These parallels suggest something universal about human
          needs and experiences that transcends cultural boundaries.
        </p>

        <ul className="list-disc pl-6 my-6 space-y-2">
          <li>
            <strong>Community Building:</strong> {post.category} practices often serve to strengthen social bonds and
            create a sense of belonging.
          </li>
          <li>
            <strong>Identity Formation:</strong> They help individuals understand their place within their cultural
            context and broader human experience.
          </li>
          <li>
            <strong>Knowledge Transfer:</strong> These traditions preserve and transmit important cultural knowledge
            across generations.
          </li>
          <li>
            <strong>Meaning Making:</strong> They provide frameworks for understanding life's challenges and
            celebrations.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Looking Forward</h2>
        <p className="leading-relaxed mb-6">
          As we look to the future, the question is not whether {post.category.toLowerCase()} traditions will survive,
          but how they will continue to evolve while maintaining their essential character. Digital technologies offer
          new ways to document, share, and practice these traditions, potentially reaching wider audiences than ever
          before.
        </p>

        <p className="leading-relaxed mb-6">
          At the same time, there are challenges to preserving the depth and authenticity of these practices in a world
          that often values speed and surface-level engagement over slow, deep immersion in cultural traditions.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Conclusion</h2>
        <p className="leading-relaxed mb-6">
          The story of {post.category.toLowerCase()} is ultimately a human story—one of creativity, adaptation, and the
          search for meaning and connection. By understanding and appreciating these traditions, we gain insight not
          just into specific cultural practices, but into what it means to be human across time and space.
        </p>

        <p className="leading-relaxed">
          Whether you're a practitioner, scholar, or simply curious about {post.category.toLowerCase()}, there's never
          been a better time to explore these rich traditions and their contemporary expressions.
        </p>
      </>
    )
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div
          className={`h-full bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo}`}
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />

        <div className="absolute top-0 left-0 w-full z-20">
          <div className="container mx-auto px-4 py-6">
            <Link href="/" className="inline-flex items-center text-white/90 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="container mx-auto px-4 py-8">
            <Badge className={`${styles.badgeColor} px-3 py-1 mb-4`}>{post.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-white/80 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4 border-2 border-white">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-medium">{post.author.name}</p>
                <p className="text-white/70 text-sm">{post.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-10"
            >
              <Tabs defaultValue="article" onValueChange={setActiveSection}>
                <TabsList className="mb-8 grid w-full grid-cols-3">
                  <TabsTrigger value="article">Article</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="related">Related</TabsTrigger>
                </TabsList>

                <TabsContent value="article" className="focus:outline-none">
                  <article className="prose prose-lg max-w-none">{generateDummyContent()}</article>

                  {/* Tags */}
                  <div className="mt-10 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="px-3 py-1">
                        {post.category}
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        Traditions
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        History
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        Contemporary
                      </Badge>
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className={`mt-10 ${styles.lightBg} rounded-xl p-6`}>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-bold mb-1">{post.author.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{post.author.role}</p>
                        <p className="text-gray-700">
                          An expert in {post.category.toLowerCase()} studies with over 10 years of research experience.
                          Passionate about exploring the intersection of tradition and contemporary society.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button variant="outline" size="sm">
                            Follow
                          </Button>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next/Previous Navigation */}
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {previousPost && (
                      <Link
                        href={`/blog/${previousPost.slug}`}
                        className="group flex flex-col p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center text-gray-500 mb-2">
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          <span className="text-sm">Previous Article</span>
                        </div>
                        <h4 className="font-medium group-hover:text-purple-600 transition-colors">
                          {previousPost.title}
                        </h4>
                      </Link>
                    )}

                    {nextPost && (
                      <Link
                        href={`/blog/${nextPost.slug}`}
                        className="group flex flex-col p-4 border rounded-lg hover:bg-gray-50 transition-colors text-right"
                      >
                        <div className="flex items-center justify-end text-gray-500 mb-2">
                          <span className="text-sm">Next Article</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </div>
                        <h4 className="font-medium group-hover:text-purple-600 transition-colors">{nextPost.title}</h4>
                      </Link>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="comments" className="focus:outline-none">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-6">Comments (12)</h2>

                    {/* Comment form */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                      <h3 className="text-lg font-semibold mb-4">Leave a comment</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                            Comment
                          </label>
                          <textarea
                            id="comment"
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          ></textarea>
                        </div>
                        <Button className={`bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} text-white`}>
                          Post Comment
                        </Button>
                      </div>
                    </div>

                    {/* Sample comments */}
                    <div className="space-y-6">
                      {/* Comment 1 */}
                      <div className="border-b pb-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">John Doe</h4>
                              <span className="text-xs text-gray-500">2 days ago</span>
                            </div>
                            <p className="text-gray-700 mb-3">
                              This article provides such a fresh perspective on {post.category.toLowerCase()}. I
                              especially appreciated the historical context section which helped me understand how these
                              traditions evolved over time.
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <button className="flex items-center text-gray-500 hover:text-gray-700">
                                <Heart className="h-4 w-4 mr-1" />
                                <span>12</span>
                              </button>
                              <button className="flex items-center text-gray-500 hover:text-gray-700">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                <span>Reply</span>
                              </button>
                            </div>

                            {/* Nested reply */}
                            <div className="mt-4 ml-6 pt-4 border-t">
                              <div className="flex items-start gap-4">
                                <Avatar>
                                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold">{post.author.name}</h4>
                                    <Badge variant="outline" className="text-xs">
                                      Author
                                    </Badge>
                                    <span className="text-xs text-gray-500">1 day ago</span>
                                  </div>
                                  <p className="text-gray-700 mb-3">
                                    Thank you for your kind words, John! I'm glad you found the historical context
                                    helpful. There's so much more to explore on this topic.
                                  </p>
                                  <div className="flex items-center gap-4 text-sm">
                                    <button className="flex items-center text-gray-500 hover:text-gray-700">
                                      <Heart className="h-4 w-4 mr-1" />
                                      <span>5</span>
                                    </button>
                                    <button className="flex items-center text-gray-500 hover:text-gray-700">
                                      <MessageCircle className="h-4 w-4 mr-1" />
                                      <span>Reply</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Comment 2 */}
                      <div className="border-b pb-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback>SM</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">Sarah Miller</h4>
                              <span className="text-xs text-gray-500">1 week ago</span>
                            </div>
                            <p className="text-gray-700 mb-3">
                              I've been researching this topic for my thesis and found your article incredibly helpful.
                              The global perspectives section gave me some new angles to consider. Would love to see
                              more content like this!
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <button className="flex items-center text-gray-500 hover:text-gray-700">
                                <Heart className="h-4 w-4 mr-1" />
                                <span>8</span>
                              </button>
                              <button className="flex items-center text-gray-500 hover:text-gray-700">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                <span>Reply</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* More comments button */}
                      <Button variant="outline" className="w-full">
                        Load More Comments
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="related" className="focus:outline-none">
                  <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <div
                        key={relatedPost.id}
                        className="flex flex-col md:flex-row gap-4 border rounded-xl overflow-hidden"
                      >
                        <div className="md:w-1/3 h-48 relative">
                          <Image
                            src={relatedPost.coverImage || "/placeholder.svg"}
                            alt={relatedPost.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4 md:w-2/3">
                          <Badge className={`${styles.badgeColor} mb-2`}>{relatedPost.category}</Badge>
                          <h3 className="text-xl font-bold mb-2">
                            <Link
                              href={`/blog/${relatedPost.slug}`}
                              className="hover:text-purple-600 transition-colors"
                            >
                              {relatedPost.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">{relatedPost.excerpt}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{format(new Date(relatedPost.date), "MMM d, yyyy")}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{relatedPost.readTime} min read</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button asChild className="mt-4">
                      <Link href="/">View All Articles</Link>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 space-y-8">
              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Share This Article</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="flex gap-2">
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    className={`flex-1 ${
                      isLiked ? `bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} text-white` : ""
                    }`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
                    {isLiked ? "Liked" : "Like"}
                  </Button>
                  <Button
                    variant={isBookmarked ? "default" : "outline"}
                    className={`flex-1 ${
                      isBookmarked ? `bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} text-white` : ""
                    }`}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-white" : ""}`} />
                    {isBookmarked ? "Saved" : "Save"}
                  </Button>
                </div>
              </motion.div>

              {/* Table of Contents */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  <a href="#" className="block text-purple-600 font-medium">
                    The Historical Context
                  </a>
                  <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">
                    Contemporary Relevance
                  </a>
                  <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">
                    Global Perspectives
                  </a>
                  <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">
                    Looking Forward
                  </a>
                  <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">
                    Conclusion
                  </a>
                </nav>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`${styles.lightBg} rounded-2xl p-6 relative overflow-hidden`}
              >
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="absolute -left-10 -top-10 w-24 h-24 bg-white/10 rounded-full"></div>

                <h3 className="text-lg font-semibold mb-3">Subscribe to Our Newsletter</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get notified about new articles on {post.category} and other topics.
                </p>

                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <Button className={`w-full bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} text-white`}>
                    Subscribe
                  </Button>
                </div>
              </motion.div>

              {/* Popular Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="px-3 py-1">
                    Food
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Culture
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Religion
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Traditions
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    History
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Global
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Heritage
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Modern
                  </Badge>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
