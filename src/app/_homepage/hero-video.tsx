"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import ExploreBy from "./explore-by";
import Navbar from "../Navbar";

type Location = {
    id: number;
    name: string;
    description: string;
    position: {
        x: string;
        y: string;
    };
    src: string; // Tambahkan properti src
    direction?: string
};

export default function VideoHero() {
    const [currentLocation, setCurrentLocation] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });
    // Animasi tulisan bergerak ke samping dan menghilang
    const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const textX = useTransform(scrollYProgress, [0, 0.2], [0, 300]); // ke kanan
    const textLeft = useTransform(scrollYProgress, [0, 0.2], [0, -300]); // ke kiri

    const scale = useSpring(1.3, { stiffness: 20, damping: 10 });
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rawTranslateX = useTransform(x, [-100, 100], ["-4%", "4%"]);
    const rawTranslateY = useTransform(y, [-100, 100], ["-4%", "4%"]);
    const translateX = useSpring(rawTranslateX, { stiffness: 50, damping: 15 });
    const translateY = useSpring(rawTranslateY, { stiffness: 50, damping: 15 });

    const locations: Location[] = [
        {
            id: 0,
            name: "Jembatan Ampera",
            description: "The description of Jembatan Ampera",
            position: { x: "20%", y: "20%" },
            src: "/video/palepale.mp4",
            direction: 'left'
        },
        {
            id: 1,
            name: "Romantic Pink Beach",
            description: "Of the Komodo Islands lorem1ieroie orneoj oepjtpoetpgjkegt ewtwetwege egewgegrgr rgegwgwg",
            position: { x: "20%", y: "30%" },
            src: "/video/tesvideo.mp4",
            direction: 'left'
        },
        {
            id: 2,
            name: "Kanawa Island",
            description: "Pristine waters and coral reefs",
            position: { x: "70%", y: "40%" },
            src: "/video/palepale.mp4",
        },
        {
            id: 3,
            name: "Bali",
            description: "Island of the Gods",
            position: { x: "center", y: "center" },
            src: "/video/tesvideo.mp4",
        },
        {
            id: 4,
            name: "Jakarta",
            description: "Indonesia's vibrant capital",
            position: { x: "30%", y: "60%" },
            src: "/video/palepale.mp4",
            direction: 'left'
        },
    ];

    const destinations = ["Jakarta", "Bali", "Bintan Batam", "Labuan Bajo", "Borobudur", "Likupang", "Lake Toba"];

    const handlePrev = () => {
        zoomIn()
        setCurrentLocation((prev) => (prev === 0 ? locations.length - 1 : prev - 1));
    };

    const handleNext = () => {
        zoomIn()
        setCurrentLocation((prev) => (prev === locations.length - 1 ? 0 : prev + 1));
    };

    const handleDotClick = (index: number) => {
        setCurrentLocation(index);
    };

    const zoomIn = () => {
        scale.set(1.5); // Zoom in secara halus
        setTimeout(() => {
            scale.set(1.3); // Kembalikan ke normal setelah delay
        }, 1000);
    };
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Hitung pergerakan dengan batas
            const clampedX = Math.max(-100, Math.min(100, clientX - centerX));
            const clampedY = Math.max(-100, Math.min(100, clientY - centerY));

            x.set(clampedX);
            y.set(clampedY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y]);
    useEffect(() => {
        if (videoRef.current) {
            zoomIn()
            // Ganti sumber video saat lokasi berubah
            videoRef.current.src = locations[currentLocation].src;

            // Restart video playback
            videoRef.current.load(); // Penting untuk memuat ulang video baru
            videoRef.current.play().catch((error) => {
                console.error("Video playback failed:", error);
            });
        }
    }, [currentLocation]); // Jalankan efek ini saat currentLocation berubah

    return (
        <div className="relative min-h-[200vh]" ref={containerRef}>
            <Navbar />
            <div className="relative h-screen w-full overflow-hidden">
                {/* Video Background */}
                <motion.div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center text-white">
                    {/* Animasi Teks */}
                    <motion.div style={{ opacity: textOpacity, x: textX }} className="relative">
                        <motion.h1
                            initial={{ x: "-100%", opacity: 0, scale: 0.5 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-4xl md:text-6xl font-bold"
                        >
                            Welcome to Beautiful Ponorogo
                        </motion.h1>

                        <motion.span
                            initial={{ x: "100%", opacity: 0, scale: 0.5 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                            className="text-lg md:text-2xl mt-2 block"
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, vitae?
                        </motion.span>
                    </motion.div>

                    {/* Video Background */}
                    <motion.div >
                        <motion.video

                            ref={videoRef}
                            className="fixed inset-0 h-full w-full object-cover -z-10"
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{ x: translateX, y: translateY, scale }}
                        >
                            <source src={locations[currentLocation].src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </motion.video>
                    </motion.div>
                    {/* Overlay untuk kontras */}
                    <div className="absolute inset-0 bg-black/30 -z-10"></div>
                </motion.div>


                {/* Location Labels */}

                <div className="absolute inset-0 z-10">
                    {locations.map((location, index) => (
                        <motion.div key={location.id}
                            className={`absolute ${currentLocation === index ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
                            style={{
                                left: location.position.x === "center" ? "50%" : location.position.x,
                                top: location.position.y === "center" ? "50%" : location.position.y,
                                bottom: location.position.y === "bottom" ? "0" : "auto",
                                transform: `translate(${location.position.x === "center" ? "-50%" : "0"}, 0)`,
                            }}>

                            {/* Line with Informasi label */}
                            <motion.div initial={{ opacity: 0, scale: 0.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeInOut" }} className="relative">
                                {location.direction === "right" ? (
                                    <>
                                        <div className="absolute top-1/2 left-0 h-px w-12 bg-white"></div>
                                        <div className="absolute top-1/2 left-12 h-8 w-px bg-white"></div>

                                    </>
                                ) : (
                                    <>
                                        <div className="absolute top-1/2 left-15 h-8 w-px bg-white"></div>
                                        <div className="absolute top-1/2 -right-15 h-px w-20 bg-white"></div>

                                    </>
                                )}

                                {/* Content card */}
                                <motion.div
                                    className="absolute poyline-card backdrop-blur-xl transition-opacity duration-700 group border rounded-2xl   px-4 py-3 text-white shadow-lg dark:bg-gray-950 dark:text-gray-50"
                                    initial={{ opacity: 0, scale: 0.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    style={{
                                        left: location.direction === "right" ? "20px" : "auto",
                                        right: location.direction === "left" ? "20px" : "auto",
                                        top: "-40px", // Adjust this value to position the card relative to the line
                                        minWidth: "200px"
                                    }}
                                >
                                    <h2 className="text-primary text-xl font-bold ">
                                        {location.name}
                                    </h2>
                                    <p className="text-sm text-primary font-medium opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-1000">
                                        {location.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Navigation Controls */}
                <motion.div className="absolute top-1/2 pt-20 left-0 right-0 z-20 flex justify-center items-center" style={{ opacity: textOpacity, x: textLeft }}>

                    <button
                        onClick={handlePrev}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm text-white mr-4 hover:bg-white/50 transition-colors"
                        aria-label="Previous location"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <div className="flex space-x-4 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
                        {destinations.map((destination, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index % locations.length)}
                                className={cn(
                                    "text-white hover:text-white/80 transition-colors text-sm md:text-base whitespace-nowrap",
                                    index % locations.length === currentLocation ? "font-bold" : "font-normal opacity-80",
                                )}
                            >
                                {destination}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm text-white ml-4 hover:bg-white/50 transition-colors"
                        aria-label="Next location"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                </motion.div>
            </div>
            <div className="relative z-10">
                <ExploreBy />
            </div>
        </div >

    );
}
