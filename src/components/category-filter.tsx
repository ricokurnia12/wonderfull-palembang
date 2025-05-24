"use client"

import { motion } from "framer-motion"

interface CategoryFilterProps {
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
}

export function CategoryFilter({ selectedCategory, setSelectedCategory }: CategoryFilterProps) {
  const categories = [
    {
      id: "food",
      name: "Food",
      icon: "🍽️",
      description: "Culinary journeys and food traditions",
      color: "bg-amber-500",
      hoverColor: "hover:bg-amber-600",
      lightColor: "bg-amber-100",
    },
    {
      id: "culture",
      name: "Culture",
      icon: "🎭",
      description: "Arts, traditions, and cultural expressions",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      lightColor: "bg-purple-100",
    },
    {
      id: "religion",
      name: "Religion",
      icon: "🕊️",
      description: "Spiritual practices and religious insights",
      color: "bg-emerald-500",
      hoverColor: "hover:bg-emerald-600",
      lightColor: "bg-emerald-100",
    },
  ]

  return (
    <div className="mb-16">
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedCategory === category.name
                ? `ring-4 ring-offset-2 ring-${category.color.split("-")[1]}-400`
                : "hover:shadow-lg"
            }`}
            onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`${category.lightColor} p-6 md:p-8 text-center`}>
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-3">{category.icon}</span>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>

                {/* Selected indicator */}
                {selectedCategory === category.name && (
                  <motion.div
                    className={`mt-4 px-4 py-1 rounded-full text-white text-sm ${category.color}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Selected
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom accent bar */}
            <div className={`h-1.5 w-full ${category.color}`}></div>
          </motion.div>
        ))}
      </div>

      {/* Clear filter button (only show when a category is selected) */}
      {selectedCategory && (
        <div className="text-center mt-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-sm text-gray-500 hover:text-gray-800 underline underline-offset-4"
          >
            Clear filter & show all posts
          </button>
        </div>
      )}
    </div>
  )
}
