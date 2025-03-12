import Image from "next/image";
import VideoHero from "./_homepage/hero-video";
import ExploreBy from "./_homepage/explore-by";

export default function Home() {
  return (
    <div className="">
      <VideoHero />
      <ExploreBy/>
    </div>
  );
}
