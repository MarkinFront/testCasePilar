import { defineStore } from "pinia";

export const useStorePeople = defineStore("storePeople", {
  state: () => ({
    popularPeople: [],
    renderTemplate: false,
    currentPage: 1,
    page: 1,
  }),

  getters: {
    totalPopularPeople: (state) => {
      return state.popularPeople.length;
    },
  },

  actions: {
    async fetchPeople() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=${
            import.meta.env.VITE_API_KEY
          }&page=${this.page}`
        );
        const data = await response.json();

        if (data.success !== false) {
          this.popularPeople = data.results;
          this.page++;
          this.renderTemplate = true;
        }
      } catch (error) {
        console.error("Error fetching popular people:", error);
      }
    },

    async fetchMorePeople() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=${
            import.meta.env.VITE_API_KEY
          }&page=${this.page}`
        );

        const data = await response.json();

        if (data.success !== false) {
          this.popularPeople.push(...data.results);

          if (data.results.length < 20) {
            this.renderTemplate = true;
          }

          this.page++;
        }
      } catch (error) {
        console.error("Error fetching more people:", error);
      }
    },
    hasMoreResults() {
      return this.popularPeople.length >= 20;
    },

    resetPage() {
      this.page = this.currentPage;
    },
  },
});

export default useStorePeople;
