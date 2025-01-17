import { getShows } from "../services/shows/showsService";
import { ShowsStore, StoredShow } from "./showsStore";

jest.mock("../services/shows/showsService", () => ({
  getShows: jest.fn(),
}));

const createMockShow = (id: number): StoredShow => {
  return {
    id: id,
    name: "Mock Show Name",
    original_name: "Mock Original Name",
    overview: "This is a mock overview for the show.",
    popularity: 100.0,
    vote_average: 8.5,
    vote_count: 200,
    first_air_date: "2020-01-01",
    poster_path: "/mock-poster.jpg",
    backdrop_path: "/mock-backdrop.jpg",
    genre_ids: [1, 2, 3],
    original_language: "en",
    origin_country: ["US"],
    adult: false,
    liked: false,
  };
};

describe(ShowsStore, () => {
  let showsStore: ShowsStore;

  beforeEach(() => {
    showsStore = new ShowsStore();
  });

  it("should have a default state", () => {
    expect(showsStore.page).toBe(1);
    expect(showsStore.loading).toBe(true);
    expect(showsStore.shows).toEqual([]);
    expect(showsStore.error).toEqual(null);
  });

  it("should set the page", () => {
    showsStore.setPage(2);
    expect(showsStore.page).toBe(2);
  });

  it("should set the loading state", () => {
    showsStore.setLoading(false);
    expect(showsStore.loading).toBe(false);
  });

  it("should set shows", () => {
    const shows = new Array(2).fill(0).map((_v, i) => createMockShow(i));
    showsStore.setShows(shows);
    expect(showsStore.shows).toEqual(shows);
  });

  it("should update a show", () => {
    const shows = new Array(2).fill(0).map((_v, i) => createMockShow(i));
    showsStore.setShows(shows);
    showsStore.updateShow(1, { liked: true });
    expect(showsStore.shows[1].liked).toBe(true);
  });

  it("should remove a show", () => {
    const shows = new Array(2).fill(0).map((_v, i) => createMockShow(i));
    showsStore.setShows(shows);
    showsStore.removeShow(1);
    expect(showsStore.shows.length).toEqual(1);
  });

  it("should clear shows", () => {
    const shows = new Array(2).fill(0).map((_v, i) => createMockShow(i));
    showsStore.setShows(shows);
    showsStore.clearShows();
    expect(showsStore.shows.length).toEqual(0);
  });

  it("should fetch shows and update the store", async () => {
    const shows = new Array(2).fill(0).map((_v, i) => createMockShow(i));
    (getShows as jest.Mock).mockResolvedValue(shows);

    await showsStore.fetchShows({
      sortByCategory: "",
      sortByDirection: "",
    });

    expect(showsStore.shows).toEqual([...shows]);
    expect(showsStore.loading).toBe(false);
  });

  it("should set error on error response", async () => {
    (getShows as jest.Mock).mockRejectedValue(new Error("Async error"));

    await showsStore.fetchShows({
      sortByCategory: "",
      sortByDirection: "",
    });

    expect(showsStore.shows).toEqual([]);
    expect(showsStore.loading).toBe(false);
    expect(showsStore.error?.message).toBe("Async error");
  });
});
