"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
    return (
        <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            {/* Background with gradient overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent z-10" />
            <Image
                src="/images/hotel-hero.jpg"
                alt="hotel"
                fill
                className="object-cover"
                priority
            />



            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-in slide-in-from-bottom-8 duration-1000">
                        Jelajahi Hotel
                        <span className="block">
                            di Palembang
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-200 mb-12 animate-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Temukan informasi lengkap tentang hotel-hotel terbaik di Palembang. Bandingkan fasilitas, lokasi, dan harga
                        untuk referensi perjalanan Anda.
                    </p>

                    <div className="animate-in slide-in-from-bottom-8 duration-1000 delay-600">
                        <Button
                            onClick={() => document.getElementById("hotel-list")?.scrollIntoView({ behavior: "smooth" })}
                            variant={'ghost'}
                            className=" text-lg font-semibold px-8 py-4 transition-all duration-300 transform hover:scale-105 text-white"
                        >
                            Lihat Daftar Hotel
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-16 animate-in slide-in-from-bottom-8 duration-1000 delay-400">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">25+</div>
                            <div className="text-gray-300">Hotel Terdaftar</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                            <div className="text-gray-300">Informasi Akurat</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                            <div className="text-gray-300">Akses Informasi</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
