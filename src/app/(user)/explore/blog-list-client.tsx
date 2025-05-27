"use client";

import { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogCard } from "@/components/blog-card";
import { CategoryFilter } from "@/components/category-filter";
import { FeaturedPost } from "@/components/featured-post";
import { fetchBlogPosts } from "@/lib/blog-api";
import type { BlogResponse } from "@/types/blog";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { useLanguage } from "@/context/LanguageContext";
interface BlogListClientProps {
  initialData: BlogResponse;
  initialSearch?: string;
  initialCategory?: string;
}

export function BlogListClient({
  initialData,
  initialSearch = "",
  initialCategory,
}: BlogListClientProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || null
  );
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [blogData, setBlogData] = useState<BlogResponse>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Get featured posts from current data
  const featuredPosts = blogData.data.filter((post) => post.featured);

  // Update URL when filters change
  const updateURL = (search: string, category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    params.delete("page"); // Reset page when filters change

    const newURL = params.toString() ? `?${params.toString()}` : "";
    router.push(`${window.location.pathname}${newURL}`, { scroll: false });
  };

  // Fetch data when filters change
  useEffect(() => {
    const fetchData = async () => {
      if (
        debouncedSearchQuery === initialSearch &&
        selectedCategory === initialCategory
      ) {
        return; // Don't refetch if we're back to initial state
      }

      setIsLoading(true);
      try {
        const data = await fetchBlogPosts({
          search: debouncedSearchQuery || undefined,
          category: selectedCategory || undefined,
          limit: "12",
        });
        setBlogData(data);
        updateURL(debouncedSearchQuery, selectedCategory);
      } catch (error) {
        console.error("Error fetching filtered posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearchQuery, selectedCategory]);

  const handleCategoryChange = (category: string | null) => {
    startTransition(() => {
      setSelectedCategory(category);
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="relative mt-8 bg-gradient-to-tr from-red-100 via-orange-100 to-yellow-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16 mt-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-red-500 to-yellow-500">
            Discover Perspectives
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore thought-provoking stories across food, culture, and religion
            that connect us all.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-10 pr-4 py-3 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm border-red-400  w-full"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin w-4 h-4" />
          )}
        </div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
          disabled={isPending || isLoading}
        />

        {/* Featured Post (only show when no category is selected and no search) */}
        {!selectedCategory && !searchQuery && featuredPosts.length > 0 && (
          <div className="mb-16">
            <FeaturedPost post={featuredPosts[0]} />
          </div>
        )}

        {/* Results count */}
        <div className="mb-6 text-sm text-gray-600">
          {blogData.total > 0 ? (
            <span>
              Showing {blogData.data.length} of {blogData.total} articles
            </span>
          ) : null}
        </div>

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory || "all"}-${debouncedSearchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogData.data.length > 0 ? (
              blogData.data.map((post, index) => (
                <BlogCard
                  title={language === "id" ? post.title : post.english_title}
                  excerpt={
                    language === "id" ? post.excerpt : post.english_excerpt
                  }
                  key={post.ID}
                  post={post}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <h3 className="text-2xl font-semibold mb-2">No posts found</h3>
                <p className="text-gray-500">
                  {searchQuery || selectedCategory
                    ? "Try adjusting your search or category filter"
                    : "No blog posts available at the moment"}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button (if there are more posts) */}
        {blogData.data.length < blogData.total && (
          <div className="text-center mt-12">
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                try {
                  const nextPage = Math.floor(blogData.data.length / 12) + 1;
                  const moreData = await fetchBlogPosts({
                    search: debouncedSearchQuery || undefined,
                    category: selectedCategory || undefined,
                    page: nextPage.toString(),
                    limit: "12",
                  });
                  setBlogData((prev) => ({
                    ...moreData,
                    data: [...prev.data, ...moreData.data],
                  }));
                } catch (error) {
                  console.error("Error loading more posts:", error);
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          </div>

          <div className="relative z-10 max-w-xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Newsletter
            </h3>
            <p className="text-gray-600 mb-6">
              Get notified about new articles and insights across food, culture,
              and religion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow rounded-full"
              />
              <button className="bg-gradient-to-r from-red-600 to-yellow-600 text-white font-medium py-2 px-6 rounded-full hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
