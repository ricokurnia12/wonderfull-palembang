"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import type { BlogPost } from "@/types/blog";
import { useLanguage } from "@/context/LanguageContext";
interface BlogPostDetailProps {
  post: BlogPost;
}

export default function BlogPostDetail({ post }: BlogPostDetailProps) {
  const { language } = useLanguage()
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  // const [activeSection, setActiveSection] = useState("article");
  const [scrollProgress, setScrollProgress] = useState(0);



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
        };
      case "Culture":
        return {
          gradientFrom: "from-purple-500",
          gradientTo: "to-indigo-500",
          badgeColor: "bg-purple-100 text-purple-800",
          accentColor: "bg-purple-500",
          lightBg: "bg-purple-50",
        };
      case "Religion":
        return {
          gradientFrom: "from-emerald-500",
          gradientTo: "to-teal-500",
          badgeColor: "bg-emerald-100 text-emerald-800",
          accentColor: "bg-emerald-500",
          lightBg: "bg-emerald-50",
        };
      default:
        return {
          gradientFrom: "from-gray-500",
          gradientTo: "to-gray-700",
          badgeColor: "bg-gray-100 text-gray-800",
          accentColor: "bg-gray-500",
          lightBg: "bg-gray-50",
        };
    }
  };

  const styles = getCategoryStyles();

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setScrollProgress(scrollPercent * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


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
        <Image
          src={post.coverImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute top-0 left-0 w-full z-20">
          <div className="container mx-auto px-4 py-6">
            <Link
              href="/"
              className="inline-flex items-center text-white/90 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="container mx-auto px-4 py-8">
            <Badge className={`${styles.badgeColor} px-3 py-1 mb-4`}>
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
              {language === "id" ? post.title : post.english_title}
            </h1>

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



              <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: language === "id" ? post.content : post.englishcontent }} />


              {/* Tags */}
              <div className="mt-10 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="px-3 py-1">
                    {post.category}
                  </Badge>

                </div>
              </div>



              {/* Next/Previous Navigation */}


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
                <h3 className="text-lg font-semibold mb-4">
                  Share This Article
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="flex gap-2">
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    className={`flex-1 ${isLiked
                      ? `bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} text-white`
                      : ""
                      }`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart
                      className={`mr-2 h-4 w-4 ${isLiked ? "fill-white" : ""}`}
                    />
                    {isLiked ? "Liked" : "Like"}
                  </Button>
                  <Button
                    variant={isBookmarked ? "default" : "outline"}
                    className={`flex-1 ${isBookmarked
                      ? `bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} text-white`
                      : ""
                      }`}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark
                      className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-white" : ""
                        }`}
                    />
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
                <h3 className="text-lg font-semibold mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  <a href="#" className="block text-purple-600 font-medium">
                    The Historical Context
                  </a>
                  <a
                    href="#"
                    className="block text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Contemporary Relevance
                  </a>
                  <a
                    href="#"
                    className="block text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Global Perspectives
                  </a>
                  <a
                    href="#"
                    className="block text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    Looking Forward
                  </a>
                  <a
                    href="#"
                    className="block text-gray-600 hover:text-purple-600 transition-colors"
                  >
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

                <h3 className="text-lg font-semibold mb-3">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get notified about new articles on {post.category} and other
                  topics.
                </p>

                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <Button
                    className={`w-full bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} text-white`}
                  >
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
  );
}
