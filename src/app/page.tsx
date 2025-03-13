
import VideoHero from "./_homepage/hero-video";
import ExploreBy from "./_homepage/explore-by";
import Navbar from "./Navbar";
import EventsHighlightStacked from "./_homepage/event-highlight";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <VideoHero />
      <ExploreBy />
      <EventsHighlightStacked />
    </div>
  );
}
