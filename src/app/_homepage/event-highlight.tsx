"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Autoplay } from "swiper";

import { Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const events = [
    { id: 1, image: "/images/eventsample.jpg", alt: "Wonder Cafe Promotion" },
    { id: 2, image: "/images/eventsample2.jpg", alt: "Chiangmai Fashion Week Summer 2025" },
    { id: 3, image: "/images/eventsample3.jpg", alt: "World Wai Kru Muay Thai Ceremony" },

];

export default function EventsHighlight() {

    return (
        <div className="relative bg-yellow-500 py-12 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-5">
                {/* Bagian Kiri (Teks) */}
                <div className="col-span-5 lg:col-span-3 py-16">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium tracking-widest uppercase mb-4">SPOTLIGHT</p>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-medium leading-tight mb-6">
                            Discover Palembang&apos;s Events
                        </h1>
                        <div className="lg:hidden">                        <Swiper
                            // autoHeight={true}
                            effect="coverflow"
                            spaceBetween={0}
                            loop={true}
                            slidesPerView={1.5}

                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            // navigation={{
                            //     prevEl: "#prevBtn",
                            //     nextEl: "#nextBtn",
                            // }}

                            coverflowEffect={{
                                rotate: 5, // Tidak ada rotasi
                                stretch: 20, // Tidak ada pergeseran horizontal
                                depth: 100, // Jarak antar slide untuk efek 3D
                                modifier: 3, // Intensitas efek coverflow
                                slideShadows: false, // Bayangan opsional
                            }}
                            modules={[EffectCoverflow, Navigation, Autoplay]}
                            className="mySwiper w-full justify-center rounded-lg lg:hidden"
                        >
                            {events.map((ev, idx) => (
                                <SwiperSlide key={idx} className="rounded-lg">
                                    <Image
                                        alt="Event Image"
                                        height={700}
                                        width={500}
                                        className="rounded-lg shadow-lg"
                                        src={ev.image}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        </div>

                        <p className="text-lg opacity-90 mb-8 max-w-xl">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum impedit dolores repellat
                            voluptatem, illum laborum odio cum. Debitis, voluptatibus magnam!
                        </p>
                        <Link
                            href="/explore"
                            className="inline-flex items-center px-6 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300"
                        >
                            Explore More Palembang&apos;s Event
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>

                {/* Infinite Loop Carousel */}
                <div className=" hidden lg:col-span-2 relative lg:block lg-flex justify-center items-center">
                    {/* <button className="absolute top-1/2 -left-8 z-10 text-white bg-black p-2 rounded-full" id="prevBtn">‹</button>
                    <button className="absolute top-1/2 -right-8 z-10 text-white bg-black p-2 rounded-full" id="nextBtn">›</button> */}

                    <Swiper
                        // autoHeight={true}
                        effect="coverflow"
                        spaceBetween={0}
                        loop={true}
                        slidesPerView={1.5}

                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: true,
                        }}
                        // navigation={{
                        //     prevEl: "#prevBtn",
                        //     nextEl: "#nextBtn",
                        // }}

                        coverflowEffect={{
                            rotate: 5, // Tidak ada rotasi
                            stretch: 20, // Tidak ada pergeseran horizontal
                            depth: 150, // Jarak antar slide untuk efek 3D
                            modifier: 3, // Intensitas efek coverflow
                            slideShadows: false, // Bayangan opsional
                        }}
                        modules={[EffectCoverflow, Navigation, Autoplay]}
                        className="mySwiper w-full justify-center rounded-lg"
                    >
                        {events.map((ev, idx) => (
                            <SwiperSlide key={idx} className="rounded-lg">
                                <Image
                                    alt="Event Image"
                                    height={700}
                                    width={500}
                                    className="rounded-lg shadow-lg"
                                    src={ev.image}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* <Swiper
                        effect={'cards'}

                        autoplay={{
                            delay: 200,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        grabCursor={true}
                        autoHeight={true}
                        loop={true}

                        modules={[EffectCards, Navigation, Autoplay]}
                        className="mySwiper relative  w-80 "
                    >
                        {events.map((ev, idx) => {
                            return (
                                <SwiperSlide className="w-full h-full rounded-lg" key={idx}><Image alt="i" height={500} width={500} className="rounded-lg" src={ev.image} /></SwiperSlide>
                            )
                        })}

                    </Swiper> */}
                </div>
            </div>
        </div >
    );
}
