"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const events = [
    { id: 1, image: "/images/eventsample.jpg", alt: "Wonder Cafe Promotion" },
    { id: 2, image: "/images/eventsample2.jpg", alt: "Chiangmai Fashion Week Summer 2025" },
    { id: 3, image: "/images/eventsample3.jpg", alt: "World Wai Kru Muay Thai Ceremony" },
];

export default function EventsHighlight() {
    const [index, setIndex] = useState(0);



    // Create a function to handle automatic or manual sliding
    const nextEvent = () => {
        setIndex((prev) => (prev + 1) % events.length);
    };

    const prevEvent = () => {
        setIndex((prev) => (prev - 1 + events.length) % events.length);
    };
    return (
        <div className="relative bg-yellow-500 py-12 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-5">
                {/* Bagian Kiri (Teks) */}
                <div className="col-span-3 py-16">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium tracking-widest uppercase mb-4">SPOTLIGHT</p>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-medium leading-tight mb-6">
                            Discover Palembang&apos;s Events
                        </h1>
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
                <div className="col-span-2 relative flex justify-center items-center">
                    <div className="relative w-full max-w-sm mx-auto">
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex justify-center"
                            >
                                <Image
                                    width={300}
                                    height={600}
                                    src={events[index].image}
                                    alt={`Event ${events[index].id}`}
                                    className="object-cover rounded-xl"
                                />
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute -bottom-12 left-0 right-0 flex justify-center space-x-2">
                            {events.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <Button onClick={prevEvent} className="absolute left-0 z-20">
                        <ChevronLeft />
                    </Button>
                    <Button onClick={nextEvent} className="absolute right-0 z-20">
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </div>
    );
}
