import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function ExploreBy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Explore Destination by Categories</h1>

      <Tabs defaultValue="culture" className="w-full max-w-6xl mx-auto">
        <TabsList className="grid grid-cols-4 rounded-full bg-accent p-1 w-full max-w-3xl mx-auto">
          <TabsTrigger value="culture" className="rounded-full data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
            Culture
          </TabsTrigger>
          <TabsTrigger value="nature" className="rounded-full  data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
            Nature
          </TabsTrigger>
          <TabsTrigger value="cullinar" className="rounded-full data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
            Cullinar
          </TabsTrigger>
          <TabsTrigger value="religi" className="rounded-full data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
            Religi
          </TabsTrigger>
          {/* <TabsTrigger value="northeast" className="rounded-full">
              North East
            </TabsTrigger> */}

        </TabsList>

        <TabsContent value="culture" className="mt-12">
          <div className="grid md:grid-cols-6 gap-8 items-start">
            <div className="relative col-span-4">
              <Image
                src="/images/culturehero.jpg"
                alt="Thailand map with West region highlighted"
                width={500}
                height={800}
                //   fill
                className="mx-auto w-full rounded-2xl shadow-2xl "
              />
            </div>

            <div className="space-y-6 col-span-2">
              <h2 className="text-5xl font-bold text-[#9B1B30]">The culture of Ponorogo</h2>
              <p className="text-gray-700">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus rem cum error soluta et tenetur velit! A doloremque mollitia maiores.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">


            <Card className="overflow-hidden p-0 pb-4 ">
              <div className="relative h-52">
                <Image
                  src="/images/museumSMB.jpeg"
                  alt="Ampera Bridge"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="px-4">
                <h3 className="text-xl font-medium mb-2">Ampera Bridge</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The iconic vertical-lift bridge spanning the Musi River, connecting Seberang Ulu and Seberang Ilir.
                </p>
                <Link href="#" className="text-primary flex items-center text-sm">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden p-0 pb-4 ">
              <div className="relative h-52">
                <Image
                  src="/images/puntikayu.jpg"
                  alt="Ampera Bridge"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="px-4">
                <h3 className="text-xl font-medium mb-2">Punti kayu</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The iconic vertical-lift bridge spanning the Musi River, connecting Seberang Ulu and Seberang Ilir.
                </p>
                <Link href="#" className="text-primary flex items-center text-sm">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
            <Card className="overflow-hidden p-0 pb-4 ">
              <div className="relative h-52">
                <Image
                  src="/images/tamanpurba.jpeg"
                  alt="Ampera Bridge"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="px-4">
                <h3 className="text-xl font-medium mb-2">Taman purba</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  The iconic vertical-lift bridge spanning the Musi River, connecting Seberang Ulu and Seberang Ilir.
                </p>
                <Link href="#" className="text-primary flex items-center text-sm">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tab contents would go here */}
        <TabsContent value="north">North region content</TabsContent>
        <TabsContent value="central">Central region content</TabsContent>
        <TabsContent value="south">South region content</TabsContent>
        <TabsContent value="east">East region content</TabsContent>
        <TabsContent value="northeast">North East region content</TabsContent>
      </Tabs>
    </div>

  )
}

