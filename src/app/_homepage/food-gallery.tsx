import Image from "next/image";

export default function FoodGalery() {
    const images = [
        {
            src: "/images/foodies/pindangpatin.jpeg",
            alt: "Pindang Patin",
            colSpan: "col-span-2",
            rowSpan: "row-span-6",
        },
        {
            src: "/images/foodies/laksan.jpeg",
            alt: "Laksan",
            colSpan: "col-span-2",
            rowSpan: "row-span-3",
        },
        {
            src: "/images/foodies/martabakhar.jpg",
            alt: "Martabak Har",
            colSpan: "col-span-2",
            rowSpan: "row-span-3",
        },
        {
            src: "/images/foodies/malbi1.jpeg",
            alt: "Malbi",
            colSpan: "col-span-2",
            rowSpan: "row-span-3",
        },
        {
            src: "/images/foodies/laksan1.jpeg",
            alt: "Laksan",
            colSpan: "col-span-2",
            rowSpan: "row-span-6",
        },
        {
            src: "/images/foodies/tekwan1.jpeg",
            alt: "Tekwan",
            colSpan: "col-span-2",
            rowSpan: "row-span-3",
        },
        {
            src: "/images/foodies/model1.jpeg",
            alt: "Model",
            colSpan: "col-span-4",
            rowSpan: "row-span-3",
        },
        {
            src: "/images/foodies/miecelor.jpeg",
            alt: "Mie Celor",
            colSpan: "col-span-2",
            rowSpan: "row-span-3",
        },
        {
            src: "/images/foodies/eskacangmerah.jpeg",
            alt: "Es Kacang Merah",
            colSpan: "col-span-2",
            rowSpan: "row-span-3",
        },
    ];
    return (
        <section className="w-full bg-[#FFF6E1] h-fit z-10 relative mx-auto  ">
            <Image src={'/images/food-bg.png'} width={500} height={500} alt="makanan palembang" className="absolute bottom-0 right-0" />
            <div className="py-8">
                <h1 className="text-4xl font-bold text-center text-gray-800 ">"Eat Like a Local, Savor the Authenticity!"</h1>
                <p className="text-lg text-gray-600 mb-4 text-center lg:max-w-1/2 w-full mx-auto">Dive into the heart of Palembang’s food culture with every bite.</p>
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
