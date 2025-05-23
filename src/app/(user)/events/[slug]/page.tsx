import { notFound } from "next/navigation";
// import type { Metadata } from "next";
// import EventDetail from "./event-detail";
import axios from "axios";
import EventDetail from "./event-detail";
// import { events } from "@/data/event.data";

interface EventPageProps {
  params: {
    slug: string;
  };
}

// export async function generateMetadata({
//   params,
// }: EventPageProps): Promise<Metadata> {
//   const event = events.find((event) => event.id === Number.parseInt(params.id));

//   if (!event) {
//     return {
//       title: "Event Not Found",
//       description: "The requested event could not be found.",
//     };
//   }

//   return {
//     title: event.title,
//     description: event.description,
//   };
// }

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = params;
  try {
    const res = await axios.get(`${process.env.PUBLIC_API_URL}/events/${slug}`);
    console.log(res);

    return (
      <div>
        <EventDetail event={res.data} />
      </div>
    );
  } catch (er) {
    console.log(er);
  }
}
