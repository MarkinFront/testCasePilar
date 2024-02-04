<script setup>
import TvShowCard from "../components/TvShowCard.vue";
import { useSpinnerStore } from "../store/spinnerStore";
import { ref, onMounted } from "vue";
import { useStoreTvShows } from "../store/storeTvShows";

const spinnerStore = useSpinnerStore();
const storeTvShows = useStoreTvShows();

onMounted(async () => {
  try {
    spinnerStore.show();
    await storeTvShows.fetchTv();
    renderTemplate.value = true;
  } catch (error) {
    console.error(error);
  } finally {
    await new Promise((resolve) => setTimeout(resolve, 300));
    spinnerStore.hide();
  }
});

const handleShowMoreClick = async (category) => {
  try {
  } catch (error) {
    console.error("Error during show more click:", error);
  }
};
const renderTemplate = ref(false);
</script>

<template>
  <div v-if="renderTemplate" class="container mx-auto px-4 pt-16">
    <div class="popular-tv-shows py-16">
      <h2
        class="flex items-center justify-between uppercase tracking-wider dark:text-amber-300 text-red-500 text-xl font-bold"
      >
        <!-- Link sem rota apenas para demonstração de uma 404 -->
        Popular Tv Shows
        <router-link
          to="/popular-tvShows"
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
          v-for="popularTvshow in storeTvShows.popularTvShows"
          :key="popularTvshow.id"
          class="mt-8"
        >
          <TvShowCard :tvShow="popularTvshow" :genres="storeTvShows.genres" />
        </div>
      </div>
    </div>

    <div class="on-the-air-tv-shows py-16">
      <h2
        class="flex items-center justify-between uppercase tracking-wider dark:text-amber-300 text-red-500 text-xl font-bold"
      >
        <!-- Link sem rota apenas para demonstração de uma 404 -->
        On The Air Tv Shows
        <router-link
          to="/popular-tvShows"
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
          v-for="onTheAirTvshow in storeTvShows.onTheAirTvShows"
          :key="onTheAirTvshow.id"
          class="mt-8"
        >
          <TvShowCard :tvShow="onTheAirTvshow" :genres="storeTvShows.genres" />
        </div>
      </div>
    </div>

    <div class="top-rated-tv-shows py-16">
      <h2
        class="flex items-center justify-between uppercase tracking-wider dark:text-amber-300 text-red-500 text-xl font-bold"
      >
        <!-- Link sem rota apenas para demonstração de uma 404 -->
        Top Rated Tv Shows
        <router-link
          to="/popular-tvShows"
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
          v-for="topRatedTvShow in storeTvShows.topRatedTvShows"
          :key="topRatedTvShow.id"
          class="mt-8"
        >
          <TvShowCard :tvShow="topRatedTvShow" :genres="storeTvShows.genres" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="h-screen flex justify-center items-center">
    <Spinner />
  </div>
</template>

<style scoped></style>
