import { Filter, SlidersHorizontal, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SearchFilters() {
    const popularFilters = ["WiFi Gratis", "Kolam Renang", "Parkir Gratis", "Restoran", "AC", "Resepsionis 24 Jam"]

    return (
        <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Filter & Urutkan</h3>
                        <p className="text-sm text-gray-600">Temukan hotel sesuai kriteria yang Anda inginkan</p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                            <SlidersHorizontal className="w-4 h-4 mr-2" />
                            Filter Fasilitas
                        </Button>
                        <Button variant="outline" className="border-gray-200">
                            <Filter className="w-4 h-4 mr-2" />
                            Urutkan Harga
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Fasilitas Populer</h4>
                        <div className="flex flex-wrap gap-2">
                            {popularFilters.map((filter, index) => (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors px-3 py-1"
                                >
                                    {filter}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Rating:</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className="w-4 h-4 text-yellow-400 fill-yellow-400 cursor-pointer hover:scale-110 transition-transform"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Harga:</span>
                            <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                                &lt; Rp 1 Juta
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                                Rp 1-2 Juta
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                                &gt; Rp 2 Juta
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
