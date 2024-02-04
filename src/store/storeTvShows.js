import { defineStore } from "pinia";

export const useStoreTvShows = defineStore("storeTvShows", {
  state: () => ({
    popularTvShows: [],
    onTheAirTvShows: [],
    topRatedTvShows: [],
    genres: [],
    renderTemplate: false,
  }),

  getters: {
    totalPopularTvShows: (state) => state.popularTvShows.length,
    totalOnTheAirTvShows: (state) => state.onTheAirTvShows.length,
    totalTopRatedTvShows: (state) => state.topRatedTvShows.length,
  },

  actions: {
    async fetchTv() {
      try {
        const responses = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${
              import.meta.env.VITE_API_KEY
            
              }`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/on_the_air?api_key=${
              import.meta.env.VITE_API_KEY
            
            }`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/top_rated?api_key=${
              import.meta.env.VITE_API_KEY
            
            }`
          ),
          fetch(
            `https://api.themoviedb.org/3/genre/tv/list?api_key=${
              import.meta.env.VITE_API_KEY
            }`
          ),
        ]);

        const data = await Promise.all(
          responses.map((response) => response.json())
        );

        if (data[0].success !== false) {
          this.popularTvShows = data[0].results.slice(0, 10);
          this.onTheAirTvShows = data[1].results.slice(0, 10);
          this.topRatedTvShows = data[2].results.slice(0, 10);
          this.genres = data[3].genres;
          this.renderTemplate = true;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async loadMoreTvs(category) {
      try {
      } catch (error) {
        console.error("Error during load more Tv Shows:", error);
      }
    },
  },
});
