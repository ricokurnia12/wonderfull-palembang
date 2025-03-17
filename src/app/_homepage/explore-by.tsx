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
            Culinary
          </TabsTrigger>
          <TabsTrigger value="religi" className="rounded-full data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
            Religion
          </TabsTrigger>
          {/* <TabsTrigger value="northeast" className="rounded-full">
              North East
            </TabsTrigger> */}

        </TabsList>

        <TabsContent value="culture" className="mt-12">
          <div className="grid md:grid-cols-6 gap-8 items-start">
            <div className="relative col-span-4">
              <Image
                src="https://palpos.bacakoran.co/upload/1afd9c0833626042ce6d6906f18f06c5.jpg"
                alt="Secret of Sriwijaya"
                width={500}
                height={800}
                //   fill
                className="mx-auto w-full rounded-2xl shadow-2xl "
              />
            </div>

            <div className="space-y-6 col-span-2">
              <h2 className="text-5xl font-bold text-[#9B1B30]">Discovering Palembang</h2>
              <p className="text-gray-700">
              Palembang, an old city with traces of Sriwijaya's glory. From grand palaces to historic museums, discover the stories of the past that still live on today!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">


            <Card className="overflow-hidden p-0 pb-4 ">
              <div className="relative h-52">
                <Image
                  src="/images/amperabridge.jpg"
                  alt="Ampera Bridge"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="px-4">
                <h3 className="text-xl font-medium mb-2">Ampera Bridge</h3>
                <p className="text-sm text-muted-foreground mb-4">
                In the heart of Palembang, the majestic Ampera Bridge stretches, a timeless icon, uniting Seberang Ulu and Seberang Ilir which are separated by the Musi River which divides the city. 
                </p>
                <Link href="#" className="text-primary flex items-center text-sm">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

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
                <h3 className="text-xl font-medium mb-2">Museum SMB II</h3>
                <p className="text-sm text-muted-foreground mb-4">
                Sultan Mahmud Badaruddin II Museum, a building that contains traces of the long civilization of the city of Pempek. Previously, this place was part of the Palace of the Palembang Darussalam Sultanate, where the sultans ruled and regulated city life.
                </p>
                <Link href="#" className="text-primary flex items-center text-sm">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
            <Card className="overflow-hidden p-0 pb-4 ">
              <div className="relative h-52">
                <Image
                  src="/images/monpera.jpeg"
                  alt="Ampera Bridge"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="px-4">
                <h3 className="text-xl font-medium mb-2">MONPERA</h3>
                <p className="text-sm text-muted-foreground mb-4">
                The People's Struggle Monument (Monpera) stands firmly in the center of Palembang, precisely on Jalan Merdeka, opposite the Great Mosque.
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

