<template>
  <div class="container mx-auto px-4 pt-16">
    <h2
      class="uppercase tracking-wider dark:text-amber-300 text-red-500 text-xl font-bold"
    >
      Search Results for "{{ route.query.query }}"
    </h2>

    <div v-if="loading">Loading...</div>

    <div v-if="results.length > 0">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
      >
        <div v-for="result in results" :key="result.id" class="mt-8">
          <MovieCard :movie="result" :genres="genres" />
        </div>
      </div>
      <InfiniteLoading @infinite="load" />
    </div>

    <div v-if="results.length === 0 && !loading">
      No results found for "{{ route.query.query }}"
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import MovieCard from "../components/MovieCard.vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const route = useRoute();
const results = ref([]);
const loading = ref(true);
const genres = ref([]);
let currentPage = 1;

const fetchData = async (query, page) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${
        import.meta.env.VITE_API_KEY
      }&page=${page}`
    );
    const data = await response.json();

    if (data.success !== false) {
      return data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

onMounted(() => {
  load();
});

watch(
  () => route.query.query,
  async () => {
    results.value = [];
    currentPage = 1;
    await load();
  }
);

const load = async ($state) => {
  try {
    const data = await fetchData(route.query.query, currentPage);

    if (data.results.length > 0) {
      results.value = results.value.concat(data.results);
      currentPage++;

      if (results.value.length >= data.total_results) {
        if ($state) {
          $state.complete();
        }
      } else {
        if ($state) {
          $state.loaded();
        }
      }
    } else {
      if ($state) {
        $state.complete();
      }
    }
  } catch (error) {
    console.error("Error loading more data:", error);
    if ($state) {
      $state.error();
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
