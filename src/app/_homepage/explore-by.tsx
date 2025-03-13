import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function ExploreBy() {
  return (
    <main className="min-h-screen relative z-10 bg-white">
      {/* Header with navigation would go here */}

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Explore pale by Categories</h1>

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
              <Card className="overflow-hidden">
                <CardContent className="p-0 relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Tak - Dam and reservoir surrounded by mountains"
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-2xl font-bold text-white">Tak</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-0 relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Kanchanaburi - Train on railway bridge along cliff"
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-2xl font-bold text-white">Kanchanaburi</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="p-0 relative">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="Ratchaburi - Mountain landscape"
                    width={400}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-2xl font-bold text-white">Ratchaburi</h3>
                  </div>
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
    </main>
  )
}

