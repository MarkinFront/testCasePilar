<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import MovieCard from '../components/MovieCard.vue';
import useStoreAllPopular from '../store/allPopular';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

const storeAllPopular = useStoreAllPopular();


onMounted(() => {
  storeAllPopular.fetchPopularMovies();
  setupIntersectionObserver();
});

watchEffect(() => {
  return () => {
    storeAllPopular.resetPage();
  };
});

const loadMoreMovies = async ($state) => {
  try {
    await storeAllPopular.fetchMorePopularMovies();

    if (storeAllPopular.hasMoreResults()) {
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
        storeAllPopular.fetchMorePopularMovies();
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
        Popular Movies
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
      >
        <template v-if="storeAllPopular.popularMovies.length">
          <div
            v-for="popularMovie in storeAllPopular.popularMovies"
            :key="popularMovie.id"
            class="mt-8"
          >
            <MovieCard :movie="popularMovie" :genres="storeAllPopular.genres" />
          </div>
        </template>
        <template v-else>
          <p>No popular movies available.</p>
        </template>
        <InfiniteLoading
          :people="storeAllPopular.popularMovies"
          @infinite="loadMoreMovies"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
