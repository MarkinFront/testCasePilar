import { defineStore } from "pinia";

export const useStoreMovies = defineStore("storeMovies", {
  state: () => ({
    popularMovies: [],
    upcomingMovies: [],
    trendMovies: [],
    genres: [],
    renderTemplate: false,
  }),

  getters: {
    totalPopularMovies: (state) => state.popularMovies.length,
    totalUpcomingMovies: (state) => state.upcomingMovies.length,
    totalTrendMovies: (state) => state.trendMovies.length,
  },

  actions: {
    async fetchMovies() {
      try {
        const responses = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${
              import.meta.env.VITE_API_KEY
            }`
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${
              import.meta.env.VITE_API_KEY
            }`
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${
              import.meta.env.VITE_API_KEY
            }`
          ),
          fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${
              import.meta.env.VITE_API_KEY
            }`
          ),
        ]);

        const data = await Promise.all(
          responses.map((response) => response.json())
        );

        if (data[0].success !== false) {
          this.popularMovies = data[0].results.slice(0, 10);
          this.upcomingMovies = data[1].results.slice(0, 10);
          this.trendMovies = data[2].results.slice(0, 10);
          this.genres = data[3].genres;
          this.renderTemplate = true;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async loadMoreMovies(category) {
      try {
      } catch (error) {
        console.error("Error during load more movies:", error);
      }
    },
  },
});
