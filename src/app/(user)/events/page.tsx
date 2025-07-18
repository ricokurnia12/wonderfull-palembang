/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React from "react";
import EventsList from "./event-list";

const EventPageList = async ({ searchParams }: { searchParams: any }) => {
  const resolvedParams = (await searchParams) || {};
  const params = new URLSearchParams(
    Object.entries(resolvedParams).flatMap(([key, value]) =>
      Array.isArray(value)
        ? value.filter((v) => v !== undefined).map((v) => [key, v])
        : value !== undefined
        ? [[key, value]]
        : []
    )
  );
  const title = params.get("title");
  const sortBy = params.get("sortBy");
  const sortOrder = params.get("sortOrder");

  const page = params.get("page");
  let link = `${process.env.PUBLIC_API_URL}/eventsclient?`;
  const queryParams = [];
  if (title) {
    queryParams.push(`title=${encodeURIComponent(title)}`);
  }
  if (sortBy) {
    queryParams.push(`sortBy=${encodeURIComponent(sortBy)}`);
  }
  if (sortOrder) {
    queryParams.push(`sortOrder=${encodeURIComponent(sortOrder)}`);
  }
  if (page) {
    queryParams.push(`page=${encodeURI(page)}`);
  }
  if (queryParams.length > 0) {
    link += `&${queryParams.join("&")}`;
  }
  console.log({ link });

  try {
    const res = await axios.get(link);
    console.log(res);
    return (
      <div>
        <EventsList
          data={res.data.data}
          page={res.data.page}
          totalPages={res.data.totalPages}
        />
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default EventPageList;
