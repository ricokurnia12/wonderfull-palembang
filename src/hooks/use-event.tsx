"use client";
// hooks/useEvents.ts
import { useQuery } from "@tanstack/react-query";
import qs from "query-string";
import axios from "axios";
export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  province: string;
  category: "music" | "art" | "culture";
  featured: boolean;
};

type UseEventsParams = {
  page: number;
  limit: number;
  search?: string;
  category?: string;
};

const fetchEvents = async ({
  page,
  limit,
  search,
  category,
}: UseEventsParams) => {
  const query = qs.stringify({ page, limit, search, category });
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events?${query}`);
  //   if (!res.ok) throw new Error("Failed to fetch events");
  //   return res.json(); // Expected shape: { data: Event[], total: number }
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/events?${query}`
    );
    console.log(res.data.total);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch events");
  }
};

export function useEvents(params: UseEventsParams) {
  const queryKey = ["events", params]; // Unique per query

  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: () => fetchEvents(params),
    // placeholderData : keepPreviousData, // useful for pagination
  });

  return {
    data: data?.data ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    error: isError ? error : null,
  };
}
