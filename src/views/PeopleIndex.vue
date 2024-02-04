<script setup>
import { onMounted, watchEffect } from 'vue';
import Spinner from '../components/Spinner.vue';
import InfiniteLoading from 'v3-infinite-loading';
import useStorePeople from '../store/storePeople';
import 'v3-infinite-loading/lib/style.css';

const storePeople = useStorePeople();

onMounted(() => {
  storePeople.fetchPeople();
  setupIntersectionObserver();
});

watchEffect(() => {
  return () => {
    storePeople.resetPage();
  };
});
const load = async ($state) => {
  try {
    await storePeople.fetchMorePeople();

    if (storePeople.hasMoreResults()) {
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
        storePeople.fetchMorePeople(); 
      }
    });
  }, options);

  const target = document.getElementById('lastPersonCard'); 
  if (target) {
    observer.observe(target);
  }
};

const profilePath = (path) => {
  if (path) {
    return `https://image.tmdb.org/t/p/w500/${path}`;
  } else {
    return 'https://via.placeholder.com/300x450';
  }
};
</script>

<template>
  <div v-if="storePeople.renderTemplate" class="container mx-auto px-4 pt-16">
    <div class="popular-people pb-16">
      <h2
        class="uppercase tracking-wider dark:text-amber-300 text-red-500 text-xl font-bold"
      >
        Popular People
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
      >
        <div v-for="person in storePeople.popularPeople" :key="person.id" class="mt-8">
          <router-link :to="`/person/${person.id}`">
            <img
              :src="profilePath(person.profile_path)"
              :alt="`Picture of ${person.name}`"
              class="hover:opacity-75 transition ease-in-out duration-150"
            />
          </router-link>
          <div class="mt-2">
            <router-link
              :to="`/person/${person.id}`"
              class="text-lg mt-2 hover:text-gray-300"
            >
              {{ person.name }}
            </router-link>
            <div class="flex items-center text-gray-400 text-sm mt-1">
              <div class="text-gray-400 text-sm">
                {{ person.known_for_department }}
              </div>
            </div>
          </div>
        </div>
        <InfiniteLoading :people="storePeople.popularPeople" @infinite="load" />
      </div>
    </div>
  </div>
  <div v-else class="h-screen flex justify-center items-center">
    <Spinner />
  </div>
</template>

<style scoped></style>
