
import Link from "next/link"
import Image from 'next/image'
import LangTogle from "@/components/lang-togle"

  
export default function Navbar() {
    return (
        <header className="fixed top-0 z-50 w-full  text-white  dark:bg-gray-950/90">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                    <Image alt="logo palembang" className="w-12" src={'/images/logopale.png'} width={100} height={100} />
                </Link>
                <nav className="hidden space-x-4 md:flex">
                    <Link
                        href="#"
                        className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                        prefetch={false}
                    >
                        Home
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                        prefetch={false}
                    >
                        About
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                        prefetch={false}
                    >
                        Services
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                        prefetch={false}
                    >
                        Contact
                    </Link>
                </nav>
                {/* <Button>Get Started</Button> */}

<LangTogle/>
            </div>
        </header>
    )
}