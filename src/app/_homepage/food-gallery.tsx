export default function FoodGalery() {
    return (
        <div className="w-full bg-white z-10 relative mx-auto p-4 space-y-4">

            <h1 className="text-4xl font-bold text-center text-gray-800 ">Explore the food</h1>
            <p className="text-sm text-gray-600 mb-4 text-center lg:max-w-1/2 w-full mx-auto">Discover the best food in palembang Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus optio porro at nihil ipsa dolorum voluptas voluptatibus quaerat debitis quidem.</p>
            <div className="lg:hidden grid grid-cols-12 grid-rows-6 gap-2 mt-8 max-w-5xl mx-auto">
                <div className="col-span-2 row-span-6 relative ">
                    <img src="/images/eventsample.jpg" alt="Temples" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                </div>
            </div>
            <div className="hidden lg:grid grid-cols-12 grid-rows-6 gap-2 mt-8 max-w-5xl mx-auto">

                <div className="col-span-2 row-span-6 relative ">
                    <img src="/images/eventsample.jpg" alt="Temples" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                </div>

                <div className="col-span-2 row-span-3 relative">
                    <img src="/images/palaces.jpg" alt="Palaces" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                </div>
                <div className="col-span-2 row-span-3 relative">
                    <img src="/images/palaces.jpg" alt="Palaces" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                </div>
                <div className="col-span-2 row-span-3 relative">
                    <img src="/images/palaces.jpg" alt="Palaces" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                </div>
                <div className="col-span-2 row-span-6 relative">
                    <img src="/images/palaces.jpg" alt="Palaces" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                </div>
                <div className="col-span-2 row-span-3 relative">
                    <img src="/images/palaces.jpg" alt="Palaces" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                </div>
                <div className="col-span-4 row-span-3 relative">
                    <img src="/images/palaces.jpg" alt="Palaces" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                </div>
                <div className="col-span-2 row-span-3 relative">
                    <img src="/images/palaces.jpg" alt="Palaces" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                </div>
                <div className="col-span-2 row-span-3 relative">
                    <img src="/images/palaces.jpg" alt="Palaces" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                </div>

                {/* Medium Image - Festivals */}
                {/* <div className="col-span-2 row-span-1 relative">
                    <img src="/images/culturehero.jpg" alt="Festivals" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-4 text-white text-lg font-semibold">Food</div>
                </div> */}

                {/* Small Images */}
                {/* <div className="col-span-1 row-span-1 relative">
                    <img src="/images/beaches.jpg" alt="Beaches" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                </div> */}

                {/* <div className="col-span-1 row-span-1 relative">
                    <img src="/images/adventures.jpg" alt="Adventures" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                </div> */}
            </div>
        </div>
    );
}
