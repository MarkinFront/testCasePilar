<script setup>
import { computed } from "vue";

const props = defineProps({
  tvShow: Object,
  genres: Object,
});

const posterPath = computed(() => {
  if (props.tvShow.poster_path)
    return "https://image.tmdb.org/t/p/w500/" + props.tvShow.poster_path;
  else return "https://via.placeholder.com/300x450";
});

const tvShowGenres = computed(() =>
  props.genres
    .filter((genre) => props.tvShow.genre_ids.includes(genre.id))
    .map((g) => g.name)
    .join(", ")
);

const formatReleaseDate = computed(() =>
  new Date(props.tvShow.release_date).toLocaleDateString("el-GR")
);

const voteAverage = computed(() => props.tvShow.vote_average || "N/A");
</script>

<template>
  <router-link :to="`/tvShow/${tvShow.id}`">
    <img
      :src="posterPath"
      :alt="`Poster of the ${tvShow.title} TV Show`"
      class="hover:opacity-75 transition ease-in-out duration-150"
    />
  </router-link>
  <div class="mt-2">
    <router-link
      :to="`/tvShow/${tvShow.id}`"
      class="text-lg mt-2 hover:text-gray-300"
    >
      {{ tvShow.name }}
    </router-link>
    <div
      class="flex items-center dark:text-gray-400 text-gray-500 text-sm mt-1"
    >
      <svg
        class="fill-current dark:text-amber-300 text-red-500 w-4"
        viewBox="0 0 24 24"
      >
        <g data-name="Layer 2">
          <path
            d="M17.56 21a1 1 0 01-.46-.11L12 18.22l-5.1 2.67a1 1 0 01-1.45-1.06l1-5.63-4.12-4a1 1 0 01-.25-1 1 1 0 01.81-.68l5.7-.83 2.51-5.13a1 1 0 011.8 0l2.54 5.12 5.7.83a1 1 0 01.81.68 1 1 0 01-.25 1l-4.12 4 1 5.63a1 1 0 01-.4 1 1 1 0 01-.62.18z"
            data-name="star"
          />
        </g>
      </svg>
      <span class="ml-1">{{ voteAverage }}</span>
      <span class="mx-2">|</span>
      <span>{{ formatReleaseDate }}</span>
    </div>
    <div class="dark:text-gray-400 text-gray-500 text-sm">
      {{ tvShowGenres }}
    </div>
  </div>
</template>

<style></style>
