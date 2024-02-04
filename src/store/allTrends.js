import { defineStore } from 'pinia';

export const useStoreAllTrend = defineStore('storeAllTrends', {
  state: () => ({
    trendMovies: [],
    genres: [],
    renderTemplate: false,
    currentPage: 2,
    initialPage: 2,
  }),

  getters: {
    totalTrendMovies: (state) => {
      return state.trendMovies.length;
    },
  },

  actions: {
    async fetchTrendMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&page=${this.currentPage}`
        );
        const data = await response.json();

        if (data.success !== false) {
          this.trendMovies = data.results;
          this.currentPage++;
          this.renderTemplate = true;
        }
      } catch (error) {
        console.error('Error fetching trends movies:', error);
      }
    },

    async fetchMoreTrendMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&page=${this.currentPage}`
        );

        const data = await response.json();

        if (data.success !== false) {
          this.trendMovies.push(...data.results);

          if (data.results.length < 20) {
            this.renderTemplate = true;
          }

          this.currentPage++;
        }
      } catch (error) {
        console.error('Error fetching more trend movies:', error);
      }
    },

    hasMoreResults() {
      return this.trendMovies.length >= 20;
    },

    resetPage() {
      this.currentPage = this.initialPage;
    },
  },
});

export default useStoreAllTrend;
