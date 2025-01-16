import axiosClient from "../axiosClient";
import { DiscoverTVResponse } from "./types";

const DISCOVER_TV_ENDPOINT = "discover/tv";

export const getShows = async (
  page: number,
  sortByCategory: string,
  sortByDirection: string
) => {
  const response = await axiosClient.get(DISCOVER_TV_ENDPOINT, {
    params: {
      include_adult: false,
      include_null_first_air_dates: false,
      language: "en-US",
      page: page,
      sort_by: sortByCategory + "." + sortByDirection,
    },
  });
  const data: DiscoverTVResponse = await response.data;
  return data.results;
};
