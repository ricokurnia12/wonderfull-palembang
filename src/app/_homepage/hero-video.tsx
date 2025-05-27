/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  History,
  MapPin,
  Utensils,
} from "lucide-react";
// import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
// import { useLanguage } from "@/context/LanguageContext";
type Location = {
  id: number;
  name: string;
  description: string;
  position: {
    x: string;
    y: string;
  };
  src: string; // Tambahkan properti src
  direction?: string;
};

const keyFacts = [
  {
    icon: "Building2",
    title: "Founded",
    description: "683 AD (Srivijaya Kingdom)",
  },
  {
    icon: "MapPin",
    title: "Population",
    description: "~1.8 million (metropolitan area)",
  },
  {
    icon: "History",
    title: "Historical Significance",
    description: "Former capital of Srivijaya Empire",
  },
  {
    icon: "Utensils",
    title: "Famous Cuisine",
    description: "Pempek, Model, Tekwan",
  },
];

export default function VideoHero() {
  // const { language } = useLanguage();
  const [currentLocation, setCurrentLocation] = useState(0);
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
  const icons: any = {
    Building2,
    MapPin,
    History,
    Utensils,
  };
  const locations: Location[] = [
    {
      id: 0,
      name: "Jembatan Ampera",
      description: "A Timeless Iconic Bridge",
      position: { x: "20%", y: "20%" },
      src: "/video/palepale.mp4",
      direction: "left",
    },
    {
      id: 1,
      name: "Benteng Kuto Besak",
      description: "An Architectural Masterpiece",
      position: { x: "80%", y: "20%" },
      src: "/video/bkb.mp4",
      direction: "left",
    },
    // {
    //     id: 2,
    //     name: "Kanawa Island",
    //     description: "Pristine waters and coral reefs",
    //     position: { x: "70%", y: "40%" },
    //     src: "/video/palepale.mp4",
    // },
    // {
    //     id: 3,
    //     name: "Bali",
    //     description: "Island of the Gods",
    //     position: { x: "center", y: "center" },
    //     src: "/video/tesvideo.mp4",
    // },
    // {
    //     id: 4,
    //     name: "Jakarta",
    //     description: "Indonesia's vibrant capital",
    //     position: { x: "30%", y: "60%" },
    //     src: "/video/palepale.mp4",
    //     direction: 'left'
    // },
  ];

  const handlePrev = () => {
    zoomIn();
    setCurrentLocation((prev) =>
      prev === 0 ? locations.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    zoomIn();
    setCurrentLocation((prev) =>
      prev === locations.length - 1 ? 0 : prev + 1
    );
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
      zoomIn();
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
    <section className="relative" ref={containerRef}>
      <div className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <motion.div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center text-white">
          {/* Animasi Teks */}
          <motion.div
            style={{ opacity: textOpacity, x: textX }}
            className="relative"
          >
            <motion.h1
              initial={{ x: "-100%", opacity: 0, scale: 0.5 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold"
            >
              Unravel the Wonders of Palembang
            </motion.h1>

            <motion.span
              initial={{ x: "100%", opacity: 0, scale: 0.5 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="text-lg md:text-2xl mt-2 block"
            >
              A city where history, culture, and modern life blend harmoniously
              along the Musi River.
            </motion.span>
          </motion.div>

          {/* Video Background */}
          <motion.div>
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
            <motion.div
              key={location.id}
              className={`absolute ${
                currentLocation === index ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
              style={{
                left:
                  location.position.x === "center"
                    ? "50%"
                    : location.position.x,
                top:
                  location.position.y === "center"
                    ? "50%"
                    : location.position.y,
                bottom: location.position.y === "bottom" ? "0" : "auto",
                transform: `translate(${
                  location.position.x === "center" ? "-50%" : "0"
                }, 0)`,
              }}
            >
              {/* Line with Informasi label */}
              <motion.div
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="relative"
              >
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
                    minWidth: "200px",
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
        <motion.div
          className="absolute top-1/2 pt-20 left-0 right-0 z-20 flex justify-center items-center"
          style={{ opacity: textOpacity, x: textLeft }}
        >
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm text-white mr-4 hover:bg-white/50 transition-colors"
            aria-label="Previous location"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="flex space-x-4 px-6 py-3 ">
            {keyFacts.map((fact, index) => {
              const IconComponent = icons[fact.icon];
              return (
                <div key={index} className="group">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:shadow-red-900/20 h-full">
                    <div className="flex flex-col items-center text-center text-white">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">{fact.title}</h3>
                      <p className="foreground">{fact.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
    </section>
  );
}
