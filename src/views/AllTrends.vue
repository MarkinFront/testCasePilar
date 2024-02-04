<script setup>
import { onMounted, watchEffect } from 'vue';
import MovieCard from '../components/MovieCard.vue';
import useStoreAllTrend from '../store/allTrends';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

const storeAllTrend = useStoreAllTrend();

onMounted(() => {
  storeAllTrend.fetchTrendMovies();
  setupIntersectionObserver();
});

watchEffect(() => {
  return () => {
    storeAllTrend.resetPage();
  };
});

const loadMoreMovies = async ($state) => {
  try {
    await storeAllTrend.fetchMoreTrendMovies();

    if (storeAllTrend.hasMoreResults()) {
      $state.loaded();
    } else {
      $state.complete();
    }
  } catch (error) {
    console.error('Error loading more popular movies:', error);
    $state.complete();
  }
};

const setupIntersectionObserver = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        storeAllTrend.fetchMoreTrendMovies();
      }
    });
  }, options);

  const target = document.getElementById('lastMovieCard');
  if (target) {
    observer.observe(target);
  }
};
</script>



<template>
  <div class="container mx-auto px-4 pt-16">
    <div class="popular-movies pb-16">
      <h2
        class="uppercase tracking-wider dark:text-amber-300 text-red-500 text-xl font-bold"
      >
        Trend Movies
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
      >
        <template v-if="storeAllTrend.trendMovies.length">
          <div
            v-for="trendMovies in storeAllTrend.trendMovies"
            :key="trendMovies.id"
            class="mt-8"
          >
            <MovieCard :movie="trendMovies" :genres="storeAllTrend.genres" />
          </div>
        </template>
        <template v-else>
          <p>No trend movies available.</p>
        </template>
        <InfiniteLoading
          :people="storeAllTrend.popularMovies"
          @infinite="loadMoreMovies"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
