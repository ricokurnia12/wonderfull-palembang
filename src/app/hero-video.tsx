"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Location = {
    id: number;
    name: string;
    description: string;
    position: {
        x: string;
        y: string;
    };
    src: string; // Tambahkan properti src
};

export default function VideoHero() {
    const [currentLocation, setCurrentLocation] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const scale = 1.3;
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
            position: { x: "center", y: "bottom" },
            src: "/video/palepale.mov",
        },
        {
            id: 1,
            name: "Romantic Pink Beach",
            description: "Of the Komodo Islands",
            position: { x: "20%", y: "30%" },
            src: "/video/tesvideo.mp4",
        },
        {
            id: 2,
            name: "Kanawa Island",
            description: "Pristine waters and coral reefs",
            position: { x: "70%", y: "40%" },
            src: "/video/palepale.mov",
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
            src: "/video/palepale.mov",
        },
    ];

    const destinations = ["Jakarta", "Bali", "Bintan Batam", "Labuan Bajo", "Borobudur", "Likupang", "Lake Toba"];

    const handlePrev = () => {
        setCurrentLocation((prev) => (prev === 0 ? locations.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentLocation((prev) => (prev === locations.length - 1 ? 0 : prev + 1));
    };

    const handleDotClick = (index: number) => {
        setCurrentLocation(index);
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
        <div className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <motion.div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center text-white">
                {/* Animasi Teks */}
                <div className="relative">
                    <motion.h1
                        initial={{ x: "-100%", opacity: 0, scale: 0.5 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-4xl md:text-6xl font-bold"
                    >
                        Welcome to Beautiful Palembang
                    </motion.h1>

                    <motion.span
                        initial={{ x: "100%", opacity: 0, scale: 0.5 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        className="text-lg md:text-2xl mt-2 block"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, vitae?
                    </motion.span>
                </div>

                {/* Video Background */}
                <motion.video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover -z-10"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ x: translateX, y: translateY, scale }}
                >
                    <source src={locations[currentLocation].src} type="video/mp4" />
                    Your browser does not support the video tag.
                </motion.video>

                {/* Overlay untuk kontras */}
                <div className="absolute inset-0 bg-black/30 -z-10"></div>
            </motion.div>


            {/* Location Labels */}
            <div className="absolute inset-0 z-10">
                {locations.map((location, index) => (
                    <motion.div
                        key={location.id}
                        className="absolute transition-opacity duration-700 group rounded-2xl bg-gray-100 px-4 py-3 text-gray-900 shadow-lg dark:bg-gray-950 dark:text-gray-50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={currentLocation === index ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{
                            left: location.position.x === "center" ? "50%" : location.position.x,
                            top: location.position.y === "center" ? "50%" :
                                location.position.y === "bottom" ? "auto" : location.position.y,
                            bottom: location.position.y === "bottom" ? "0" : "auto",
                            transform: `translate(${location.position.x === "center" ? "-50%" : "0"}, ${location.position.y === "center" ? "-50%" : "0"})`,
                        }}
                    >
                        <h2 className="text-slate-800 text-xl font-bold drop-shadow-lg group">
                            {location.name}
                        </h2>
                        <p className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {location.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center">
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
            </div>
        </div>
    );
}
