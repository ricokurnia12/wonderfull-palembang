import { Button } from "@/components/ui/button"
import {

    ChevronRight,

    Shield,
    Building,
    GraduationCap,
    Stethoscope,
    Plane,
    AlertTriangle,
    ExternalLink,
} from "lucide-react"

import Link from "next/link"

const Institution = () => {
    return (
        <section className="py-16 relative z-10 w-full bg-[#9B1B30]">
            <section className="pyn">
                {/* Background with gradient */}
                <div className="absolute inset-0  "></div>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/20 blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white/20 blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Official Institutions</h2>
                        <div className="h-1 w-20 bg-white/50 mx-auto rounded-full mb-6"></div>
                        <p className="text-white/80 max-w-2xl mx-auto">
                            Connect with official government agencies, law enforcement, educational institutions, and other important
                            organizations in Palembang.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Polres Palembang */}
                        <div className="group">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:shadow-red-900/20 h-full">
                                <div className="flex items-start gap-5">
                                    <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <Shield className="h-7 w-7 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">Polres Palembang</h3>
                                        <p className="text-white/70 mb-5 text-sm leading-relaxed">
                                            The Palembang Police Department provides law enforcement and public safety services for the city
                                            and its residents.
                                        </p>
                                        <Link
                                            href="https://poldasumsel.id/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-white text-sm font-medium group-hover:underline"
                                        >
                                            <span className="border-b border-white/40 group-hover:border-white">Visit Official Website</span>
                                            <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pemerintah Kota Palembang */}
                        <div className="group">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:shadow-red-900/20 h-full">
                                <div className="flex items-start gap-5">
                                    <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <Building className="h-7 w-7 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">Pemerintah Kota Palembang</h3>
                                        <p className="text-white/70 mb-5 text-sm leading-relaxed">
                                            The official local government of Palembang city, providing public services and information to
                                            citizens.
                                        </p>
                                        <Link
                                            href="https://palembang.go.id/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-white text-sm font-medium group-hover:underline"
                                        >
                                            <span className="border-b border-white/40 group-hover:border-white">Visit Official Website</span>
                                            <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Universitas Sriwijaya */}
                        <div className="group">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:shadow-red-900/20 h-full">
                                <div className="flex items-start gap-5">
                                    <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <GraduationCap className="h-7 w-7 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">Universitas Sriwijaya</h3>
                                        <p className="text-white/70 mb-5 text-sm leading-relaxed">
                                            The largest public university in South Sumatra, named after the ancient Srivijaya Empire.
                                        </p>
                                        <Link
                                            href="https://unsri.ac.id/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-white text-sm font-medium group-hover:underline"
                                        >
                                            <span className="border-b border-white/40 group-hover:border-white">Visit Official Website</span>
                                            <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RSUP Dr. Mohammad Hoesin */}
                        <div className="group">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:shadow-red-900/20 h-full">
                                <div className="flex items-start gap-5">
                                    <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <Stethoscope className="h-7 w-7 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">RSUP Dr. Mohammad Hoesin</h3>
                                        <p className="text-white/70 mb-5 text-sm leading-relaxed">
                                            The main referral hospital in South Sumatra, providing comprehensive healthcare services.
                                        </p>
                                        <Link
                                            href="https://rsmh.co.id/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-white text-sm font-medium group-hover:underline"
                                        >
                                            <span className="border-b border-white/40 group-hover:border-white">Visit Official Website</span>
                                            <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dinas Pariwisata Palembang */}
                        <div className="group">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:shadow-red-900/20 h-full">
                                <div className="flex items-start gap-5">
                                    <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <Plane className="h-7 w-7 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">Dinas Pariwisata</h3>
                                        <p className="text-white/70 mb-5 text-sm leading-relaxed">
                                            The tourism department of Palembang, providing information for tourists and promoting local
                                            attractions.
                                        </p>
                                        <Link
                                            href="https://pariwisata.palembang.go.id/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-white text-sm font-medium group-hover:underline"
                                        >
                                            <span className="border-b border-white/40 group-hover:border-white">Visit Official Website</span>
                                            <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Badan Penanggulangan Bencana Daerah */}
                        <div className="group">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-xl hover:shadow-red-900/20 h-full">
                                <div className="flex items-start gap-5">
                                    <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <AlertTriangle className="h-7 w-7 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">BPBD Sumsel</h3>
                                        <p className="text-white/70 mb-5 text-sm leading-relaxed">
                                            The regional disaster management agency for South Sumatra, handling emergency response and
                                            disaster mitigation.
                                        </p>
                                        <Link
                                            href="https://bpbd.sumselprov.go.id/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-white text-sm font-medium group-hover:underline"
                                        >
                                            <span className="border-b border-white/40 group-hover:border-white">Visit Official Website</span>
                                            <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-14 text-center">
                        <Button
                            variant="outline"
                            className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white"
                        >
                            View All Institutions <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </section>

        </section>
    )
}

export default Institution