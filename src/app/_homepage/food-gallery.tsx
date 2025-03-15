import Image from "next/image";

export default function FoodGalery() {
    const images = [
        {
            src: "https://media.gettyimages.com/id/1360911596/photo/tomato-sauce-bowl-of-rigatoni-with-human-hand-olive-oil-and-parmisan-cheese.jpg?s=612x612&w=gi&k=20&c=OZQlXfA7_UuNwLsNEK4x6RpmlgkwSZz0FdVYE8mac3Y=",
            alt: "Tomato Sauce Bowl",
            colSpan: "col-span-2",
            rowSpan: "row-span-6",
        },
        {
            src: "https://media.istockphoto.com/id/1128687123/photo/shopping-bag-full-of-fresh-vegetables-and-fruits.jpg?s=612x612&w=0&k=20&c=jXInOVcduhEnfuUVffbUacldkF5CwAeThD3MDUXCItM=",
            alt: "Shopping Bag with Vegetables",
            colSpan: "col-span-2",
            rowSpan: "row-span-3",
        },
        {
            src: "https://bigbiscuit.com/wp-content/uploads/2024/12/Website-size-horizontal-5.png",
            alt: "Big Biscuit Breakfast",
            colSpan: "col-span-2",
            rowSpan: "row-span-3",
        },
        {
            src: "https://static.vecteezy.com/system/resources/previews/033/879/667/non_2x/rice-with-meat-and-vegetables-on-wooden-table-thai-food-indonesian-traditional-bali-food-indonesia-ai-generated-free-photo.jpg",
            alt: "Rice with Meat and Vegetables",
            colSpan: "col-span-2",
            rowSpan: "row-span-3",
        },
        {
            src: "https://img.lovepik.com/photo/20211209/medium/lovepik-vertical-shot-of-boiled-pork-slices-picture_501719672.jpg",
            alt: "Boiled Pork Slices",
            colSpan: "col-span-2",
            rowSpan: "row-span-6",
        },
        {
            src: "https://www.indonesia.travel/content/dam/indtravelrevamp/en/trip-ideas/don-t-leave-indonesia-before-you-get-a-taste-of-these-12-favorite-local-foods/batagor.jpg",
            alt: "Indonesian Batagor",
            colSpan: "col-span-2",
            rowSpan: "row-span-3",
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0yeSxHiUiM_0mub8wwk8Ldk0ojruNbeGbOw&s",
            alt: "Fried Indonesian Dish",
            colSpan: "col-span-4",
            rowSpan: "row-span-3",
        },
        {
            src: "https://media.cnn.com/api/v1/images/stellar/prod/160222142959-indonesian-food-indomie-9444-1900px.jpg?q=w_1900,h_1069,x_0,y_0,c_fill/h_447",
            alt: "Indomie Goreng",
            colSpan: "col-span-2",
            rowSpan: "row-span-3",
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYVLnI2aKC3dkb-rpHcNKXtrvU6rzVCGJunQ&s",
            alt: "Indonesian Dish",
            colSpan: "col-span-2",
            rowSpan: "row-span-3",
        },
    ];
    return (
        <section className="w-full bg-[#FFF6E1] h-fit z-10 relative mx-auto  ">
            <Image src={'/images/food-bg.png'} width={500} height={500} alt="makanan palembang" className="absolute bottom-0 right-0" />
            <div className="py-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 ">Explore the food</h1>
                <p className="text-sm text-gray-600 mb-4 text-center lg:max-w-1/2 w-full mx-auto">Discover the best food in palembang Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus optio porro at nihil ipsa dolorum voluptas voluptatibus quaerat debitis quidem.</p>
                {/* mobile gallery */}
                <div className="lg:hidden grid grid-cols-12 grid-rows-6 gap-2 mt-8 max-w-5xl mx-auto h-52">
                    <div className="col-span-4 row-span-6 relative ">
                        <Image width={300} height={500} src="/images/eventsample.jpg" alt="Temples" className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                    </div>
                    <div className="col-span-8 row-span-3 relative ">
                        <Image width={600} height={300} src="/images/eventsample.jpg" alt="Temples" className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                    </div>
                    <div className="col-span-8 row-span-3 relative ">
                        <Image width={600} height={300} src="/images/eventsample.jpg" alt="Temples" className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold">Food</div>
                    </div>
                </div>
                {/* dekstop gallery */}
                <div className="hidden lg:grid grid-cols-12 grid-rows-6 gap-2 h-[350px] mt-8 max-w-7xl mx-auto">
                    {images.map((image, index) => (
                        <div key={index} className={`${image.colSpan} ${image.rowSpan} relative`}>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 1200px) 100vw, 50vw"
                                className="object-cover rounded-lg"
                                priority={index === 0} // Prioritas loading gambar pertama
                            />
                            <div className="absolute inset-0 bg-black/30 rounded-lg flex items-end p-2 text-white text-sm font-semibold"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
