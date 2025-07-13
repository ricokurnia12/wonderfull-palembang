'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"
export default function FoodGallery() {
    const { language } = useLanguage();
  return (
    <section className="py-16 px-4 relative bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Eat Like a Local, Savor the Authenticity!
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Dive into the heart of Palembang food culture with every bite.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="relative">
              <Image
                width={600}
                height={400}
                src="/images/streetfood.jpg"
                alt="Traditional Palembang street food market with vendors preparing authentic local dishes"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{language === "id" ? "Surga Kuliner Jalanan" : " Street Food Paradise"}</h3>
                <p className="text-sm opacity-90">{language === "id" ?"Rasakan cita rasa khas dari para jagoan kuliner kaki lima":"Experience authentic flavors from local vendors"}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{language === "id"?"Temukan Rasa Autentik":"Discover Authentic Flavors"}</h3>
              <p className="text-gray-600 mb-6">
                {language=== "id"?"Dari pempek ikan yang terkenal hingga sup tekwan yang kaya dan aromatik, Palembang menyajikan perjalanan kuliner yang menceritakan kisah tentang masyarakatnya, tradisi, dan resep turun-temurun yang telah diwariskan selama berabad-abad": "From the famous Pempek fish cakes to the rich and aromatic Tekwan soup, Palembang offers a culinary journey that tells the story of its people, traditions, and centuries-old recipes passed down through generations"}
              </p>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full">
              {language ==="id"?"Jelajahi Hidangan Lokal" : "Explore Local Dishes"}
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{language==="id"?"Warisan Budaya di Atas Piring":"Cultural Heritage on a Plate"}</h3>
              <p className="text-gray-600 mb-6">
                {language==="id"?"Setiap makanan di Palembang tuh kaya bakal campuran budaya Melayu, Tionghoa, dan Jawa. Perpaduannya unik banget sampai jadi ciri khas kuliner kota ini. Yuk, bareng-bareng lestarikan resep-resep legendaris ini!":"Every dish in Palembang carries the essence of Malay, Chinese, and Javanese influences, creating a unique fusion that defines the citys culinary identity. Join us in preserving these time-honored traditions"}
                
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                 {language==="id"?"Resep Tradisional":"Traditional Recipes"} 
                </span>
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                 {language==="id"?"Traditional Recipes":"Local Ingredients"} 
                </span>
              </div>
            </div>

            <div className="relative">
                <Image
                width={600}
                height={400}
                src="/images/foodpempek.jpg"
                alt="Traditional Palembang street food market with vendors preparing authentic local dishes"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 right-6 text-white text-right">
                <h3 className="text-2xl font-bold mb-2">{language==="id"?"Pempek Khas Palembang":"Signature Pempek"}</h3>
                <p className="text-sm opacity-90">{language==="id"?"Ikon kuliner Palembang yang nggak pernah gagal bikin kangen":"The pride of Palembang cuisine"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
