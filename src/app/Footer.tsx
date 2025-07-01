import {
    Building2,
    ArrowUp,
} from "lucide-react"

import Link from "next/link"
const Footer = () => {
    return (
        <footer className="bg-[url('/navbarbg.png')] bg-cover  text-zinc-200 z-10 relative">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Column 1: About */}
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">Palembang City</h3>
                        </div>
                        <p className=" text-sm mb-6">
                            The website of Palembang City, South Sumatra, Indonesia. Discover the rich history, vibrant
                            culture, and modern attractions of one of Indonesia oldest cities.
                        </p>
                        {/* <div className="flex gap-4">
                            <Link
                                href="#"
                                className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <Facebook className="h-4 w-4" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link
                                href="#"
                                className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <Instagram className="h-4 w-4" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link
                                href="#"
                                className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <Twitter className="h-4 w-4" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="#"
                                className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                                <Youtube className="h-4 w-4" />
                                <span className="sr-only">YouTube</span>
                            </Link>
                        </div> */}
                    </div>

                    {/* Column 2: Quick Links */}
                    {/* <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                                    <ChevronRight className="h-4 w-4 text-red-500" />
                                    <span>About Palembang</span>
                                </Link>
                            </li>
                    
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                                    <ChevronRight className="h-4 w-4 text-red-500" />
                                    <span>Local Cuisine</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                                    <ChevronRight className="h-4 w-4 text-red-500" />
                                    <span>Events Calendar</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                                    <ChevronRight className="h-4 w-4 text-red-500" />
                                    <span>Transportation</span>
                                </Link>
                            </li>
                        
                        </ul>
                    </div> */}

                    {/* Column 3: Government Links */}
                    {/* <div>
                        <h3 className="text-lg font-bold mb-6">Government Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                                    <ChevronRight className="h-4 w-4 text-red-500" />
                                    <span>Public Services</span>
                                </Link>
                            </li>                          
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                                    <ChevronRight className="h-4 w-4 text-red-500" />
                                    <span>Public Safety</span>
                                </Link>
                            </li>
                            
        
                        </ul>
                    </div> */}

                    {/* Column 4: Contact */}
                    {/* <div>
                        <h3 className="text-lg font-bold mb-6">Contact Information</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPinned className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                <span className="text-zinc-400">Jalan Merdeka No. 1, Palembang, South Sumatra, Indonesia 30131</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-red-500 shrink-0" />
                                <span className="text-zinc-400">+62 711 123456</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-red-500 shrink-0" />
                                <span className="text-zinc-400">info@palembang.go.id</span>
                            </li>
                        </ul>
                        <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
                            <h4 className="font-medium mb-2">Tourism Information Center</h4>
                            <p className="text-zinc-400 text-sm">
                                Need help planning your visit? Contact our tourism information center for assistance.
                            </p>
                            <Button className="mt-3 w-full bg-red-600 hover:bg-red-700">Contact Now</Button>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Bottom Footer */}
            {/* <div className="border-t border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-zinc-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} Palembang City. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-zinc-500 hover:text-white text-sm">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-zinc-500 hover:text-white text-sm">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-zinc-500 hover:text-white text-sm">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div> */}

            {/* Back to top button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Link
                    href="#top"
                    className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
                    aria-label="Back to top"
                >
                    <ArrowUp className="h-5 w-5 text-white" />
                </Link>
            </div>
        </footer>
    )
}

export default Footer