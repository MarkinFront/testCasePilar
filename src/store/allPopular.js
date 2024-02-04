import { defineStore } from 'pinia';

export const useStoreAllPopular = defineStore('storeAllPopular', {
  state: () => ({
    popularMovies: [],
    genres: [],
    renderTemplate: false,
    currentPage: 1,
    initialPage: 1,
  }),

  getters: {
    totalPopularMovies: (state) => {
      return state.popularMovies.length;
    },
  },

  actions: {
    async fetchPopularMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${this.currentPage}`
        );
        const data = await response.json();

        if (data.success !== false) {
          this.popularMovies = data.results;
          this.currentPage++;
          this.renderTemplate = true;
        }
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    },

    async fetchMorePopularMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${this.currentPage}`
        );

        const data = await response.json();

        if (data.success !== false) {
          this.popularMovies.push(...data.results);

          if (data.results.length < 20) {
            this.renderTemplate = true;
          }

          this.currentPage++;
        }
      } catch (error) {
        console.error('Error fetching more popular movies:', error);
      }
    },

    hasMoreResults() {
      return this.popularMovies.length >= 20;
    },

    resetPage() {
      this.currentPage = this.initialPage;
    },
  },
});

export default useStoreAllPopular;
