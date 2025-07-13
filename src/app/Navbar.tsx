"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu } from "lucide-react"
import LangTogle from "@/components/lang-togle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/events", label: "Events" },
    { href: "/hotels", label: "Hotels" },
  ]

  return (
    <header className="fixed top-0 bg-gray-900/50 z-50 w-full text-white dark:bg-gray-950/90">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Image alt="logo palembang" className="w-12" src={"/images/logopale.png"} width={100} height={100} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Language Toggle */}
        <div className="hidden md:block">
          <LangTogle />
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-gray-900/95 text-white border-gray-700">
            <div className="flex flex-col space-y-6 mt-6">
              {/* Mobile Logo */}
              <div className="flex justify-center items-center gap-2 pb-4 border-b border-gray-700">
                <Image alt="logo palembang" className="w-10" src={"/images/logopale.png"} width={80} height={80} />
                <span className="text-lg font-semibold">Palembang</span>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col items-center space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium transition-colors hover:text-gray-300 py-2"
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Language Toggle */}
              <div className="pt-4 border-t border-gray-700">
                <LangTogle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
