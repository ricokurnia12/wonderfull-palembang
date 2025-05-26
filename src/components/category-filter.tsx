"use client"

import { categories } from "@/types/category-types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  disabled?: boolean
}

export function CategoryFilter({ selectedCategory, setSelectedCategory, disabled }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => setSelectedCategory(null)}
        disabled={disabled}
        className={cn(
          "rounded-full px-6 py-2 transition-all cursor-pointer",
          selectedCategory === null ? "ampera-gradient" : "hover:bg-gray-100",
        )}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => setSelectedCategory(category.id)}
          disabled={disabled}
          className={cn(
            "rounded-full px-6 py-2 transition-all cursor-pointer",
            selectedCategory === category.id
              ? "ampera-gradient"
              : "hover:bg-gray-100",
          )}
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}
