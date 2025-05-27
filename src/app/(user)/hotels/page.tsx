'use client'
import { title } from 'process'
import hotels from '../../../data/hotels-data.json'
import { HotelCard } from './_components/hotel-card'
import { HeroSection } from './_components/hotel-hero-section'
import { useLanguage } from '@/context/LanguageContext'

export default function HotelsPage() {
    const { language } = useLanguage()
    const dataTextHotel = {
        title: language === "id" ? "Jelajahi Hotel di Palembang" : "Explore Hotels in Palembang",
        description: language === "id" ? "Dapatkan informasi lengkap seputar pilihan hotel di Palembang. Bandingkan harga, fasilitas, dan lokasi untuk pengalaman menginap yang nyaman" : "Find details about hotel options in Palembang. Simply compare prices, facilities and locations for a great experience.",

    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <HeroSection data={dataTextHotel} />

            <div id="hotel-list" className="container mx-auto px-4 py-12">
                {/* <SearchFilters /> */}

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Hotel Terpopuler di Palembang</h2>
                    <p className="text-gray-600">Pilihan terbaik untuk pengalaman menginap yang tak terlupakan</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {hotels.hotels.map((hotel, index) => (
                        <HotelCard key={hotel.id} hotel={hotel} index={index} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Butuh informasi lebih detail?</h3>
                        <p className="text-gray-600 mb-6">
                            Kunjungi langsung website resmi hotel atau hubungi mereka untuk informasi terkini tentang ketersediaan dan
                            penawaran khusus
                        </p>
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                            Tips Memilih Hotel
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
