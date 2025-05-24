import { notFound } from "next/navigation";
import axios from "axios";
import EventDetail from "./event-detail";

export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  try {
    const res = await axios.get(`${process.env.PUBLIC_API_URL}/events/${slug}`);
    if (!res.data) {
      notFound();
    }
    return (
      <div>
        <EventDetail event={res.data} />
      </div>
    );
  } catch {
    notFound();
  }
}
