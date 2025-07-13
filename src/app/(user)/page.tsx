
import VideoHero from "../_homepage/hero-video";
import ExploreBy from "../_homepage/explore-by";
import Navbar from "../Navbar";
import EventsHighlightStacked from "../_homepage/event-highlight";
import FoodGalery from "../_homepage/food-gallery";
import Institution from "../_homepage/institution";
import Cta from "../_homepage/cta-section";

export default function Home() {
  return (
    <div className="relative h-fit">
      <Navbar />

      <VideoHero />
      <section className="min-h-screen relative z-10 bg-white py-8 ">
        <div className="bg-flower absolute z-20 opacity-10 bottom-1/3 top-0 h-full right-300 w-full animate-[bounce-smooth_3s_ease-in-out_infinite] saturate-50" />
        <ExploreBy />
      </section>
      <FoodGalery />
      <EventsHighlightStacked />
      {/* <KeyFact /> */}
      <Institution />
      <Cta />
    </div>
  );
}
