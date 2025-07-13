'use client'
import React from 'react'
import { Card,CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
interface FeaturedPost {
  ID: number;
  title: string;
  english_title: string;
  excerpt: string;
  english_excerpt: string;
  coverImage: string;
  slug: string
}
const ExploreByCard = ({post}:{post:FeaturedPost}) => {
const { language } = useLanguage()
  return (
     <article >
                  <Card className="overflow-hidden p-0 pb-4 h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-52">
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={`${post.title}ß - Palembang destination`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      />
                    </div>
                    <CardContent className="px-4 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-xl font-medium mb-2 line-clamp-2">
                          {language === 'id'? post.title:post.english_title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {language==='id'?post.excerpt:post.english_excerpt}
                        </p>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-primary flex items-center text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                        aria-label={`Learn more about ${post.title}`}
                      >
                        Learn more <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </CardContent>
                  </Card>
                </article>
  )
}

export default ExploreByCard