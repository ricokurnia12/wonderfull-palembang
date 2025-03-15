import { Button } from '@/components/ui/button'
import React from 'react'

const Cta = () => {
    return (
        <section className='relative z-10 bg-white'>
            <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
                    <div className="max-w-3xl mx-auto ">
                        <h2 className="text-3xl font-bold mb-4">Plan Your Visit to Palembang</h2>
                        <p className="text-muted-foreground mb-8">
                            Experience the rich history, vibrant culture, and delicious cuisine of this historic Indonesian city. From
                            ancient temples to modern attractions, Palembang offers something for every traveler.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className='bg-yellow-500 hover:bg-yellow-600' size="lg">Book Your Trip</Button>
                            <Button variant="outline" size="lg">
                                View Travel Guide
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cta