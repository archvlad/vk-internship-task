import { makeAutoObservable } from "mobx";
import { Show } from "../services/shows/types";
import { getShows } from "../services/shows/showsService";

export interface StoredShow extends Show {
  liked?: boolean;
}

export class ShowsStore {
  page: number = 1;
  loading: boolean = true;
  shows: StoredShow[] = [];
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setPage(page: number) {
    this.page = page;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setShows(shows: StoredShow[]) {
    this.shows = shows;
  }

  clearShows() {
    this.shows = [];
  }

  updateShow(id: number, show: Partial<StoredShow>) {
    const index = this.shows.findIndex((show) => show.id === id);
    if (index !== -1) {
      this.shows[index] = {
        ...this.shows[index],
        ...show,
      };
    }
  }

  removeShow(id: number) {
    this.shows = this.shows.filter((show) => show.id !== id);
  }

  async fetchShows(options: {
    sortByCategory: string;
    sortByDirection: string;
  }) {
    try {
      this.setLoading(true);
      const data = await getShows(
        this.page,
        options.sortByCategory,
        options.sortByDirection
      );
      this.setShows([
        ...this.shows,
        ...data.map<StoredShow>((show: Show) => {
          return {
            ...show,
            liked: false,
          };
        }),
      ]);
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.setLoading(false);
    }
  }
}

export default new ShowsStore();
