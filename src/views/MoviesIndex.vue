<script setup>
  import MovieCard from "../components/MovieCard.vue";
  import { useSpinnerStore } from "../store/spinnerStore";
  import { ref, onMounted } from "vue";
  import { useStoreMovies } from "../store/storeMovies";

  const spinnerStore = useSpinnerStore();
  const storeMovies = useStoreMovies();

onMounted(async () => {
  try {
    spinnerStore.show();
    await storeMovies.fetchMovies();
    renderTemplate.value = true;
  } catch (error) {
    console.error(error);
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 600));
    spinnerStore.hide();
  }
});

const handleShowMoreClick = async (category) => {
  try {
  } catch (error) {
    console.error("Error during show more click:", error);
  }
};
const genres = ref([]);
const renderTemplate = ref(false);
</script>

<template>
  <div v-if="renderTemplate" class="container mx-auto px-4 pt-16">
    <div class="popular-movies pb-16">
      <h2
        class="flex items-center justify-between uppercase tracking-wider dark:text-amber-300 text-red-500 text-xl font-bold"
      >
        Popular Movies
        <router-link
          to="/all-popular"
          class="text-sm text-gray-500 hover:text-gray-700 transition"
          @click="handleShowMoreClick('Popular')"
        >
          Show More
        </router-link>
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
      >
        <div
          v-for="popularMovie in storeMovies.popularMovies"
          :key="popularMovie.id"
          class="mt-8"
        >
          <MovieCard :movie="popularMovie" :genres="storeMovies.genres" />
        </div>
      </div>
    </div>

    <div class="upcoming-movies py-16">
      <h2
        class="flex items-center justify-between uppercase tracking-wider dark:text-amber-300 text-red-500 text-xl font-bold"
      >
        Upcoming Movies
        <router-link
          to="/all-upcomming"
          class="text-sm text-gray-500 hover:text-gray-700 transition"
          @click="handleShowMoreClick('Upcomming')"
        >
          Show More
        </router-link>
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
      >
        <div
          v-for="upcomingMovie in storeMovies.upcomingMovies"
          :key="upcomingMovie.id"
          class="mt-8"
        >
          <MovieCard :movie="upcomingMovie" :genres="genres" />
        </div>
      </div>
    </div>

    <div class="now-playing-movies py-16">
      <h2
        class="flex items-center justify-between uppercase tracking-wider dark:text-amber-300 text-red-500 text-xl font-bold"
      >
        Trend Movies
        <router-link
          to="/all-trends"
          class="text-sm text-gray-500 hover:text-gray-700 transition"
          @click="handleShowMoreClick('Now Playing')"
        >
          Show More
        </router-link>
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
      >
        <div
          v-for="trendMovie in storeMovies.trendMovies"
          :key="trendMovie.id"
          class="mt-8"
        >
          <MovieCard :movie="trendMovie" :genres="genres" />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="h-screen flex justify-center items-center">
    <Spinner />
  </div>
</template>

<style scoped>
.movie-card {
  transition: transform 0.3s;
}

.movie-card:hover {
  transform: translateZ(20px);
}
</style>
