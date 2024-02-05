<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const searchText = ref("");
const searchResults = ref([]);
const target = ref(null);
const searchIsOpen = ref(false);
const debounce = ref(null);
const mobileMenuIsOpen = ref(false);
const toggleSpinner = ref(false);
const noResults = ref(false);
// const darkMode = ref(true);
const router = useRouter();

const handleInput = () => {
  noResults.value = false;
  clearTimeout(debounce.value);
  debounce.value = setTimeout(() => {
    searchResults.value = [];
    if (searchText.value) {
      callApi();
    }
  }, 1000);
};

onMounted(() => {
  document.addEventListener("click", (e) => {
    if (target.value && target.value.contains(e.target) === false) {
      searchIsOpen.value = false;
    }
  });
});

function clearSearchText() {
  searchText.value = "";
  searchResults.value = [];
}
// function toggleMode() {
//   document.getElementsByTagName("body")[0].classList.toggle("dark");
// }

function toggleMenu() {
  if (searchIsOpen.value) searchIsOpen.value = false;
  if (window.matchMedia("(max-width: 768px)").matches) {
    mobileMenuIsOpen.value = !mobileMenuIsOpen.value;
  }
}

function debounceSearch() {
  noResults.value = false;
  clearTimeout(debounce.value);
  debounce.value = setTimeout(() => {
    searchResults.value = [];
    if (searchText.value) {
      callApi();
    }
  }, 1000);
}

function performGeneralSearch() {
  if (searchText.value.trim() !== "") {
    router.push({ name: "search-results", query: { query: searchText.value } });
    searchIsOpen.value = false;
  }
}

router.beforeEach((to, from, next) => {
  clearSearchText();
  next();
});

function callApi() {
  toggleSpinner.value = true;
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${
      searchText.value
    }&api_key=${import.meta.env.VITE_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data.results.length) noResults.value = true;
      searchResults.value = data.results.slice(0, 5);
      toggleSpinner.value = false;
      console.log("searchResults", searchResults.value);
    });
}
</script>

<template>
  <nav class="border-b dark:border-gray-800 border-gray-400">
    <div class="container mx-auto py-5 px-5 md:flex">
      <router-link @click="mobileMenuIsOpen = false" to="/" class="mr-5">
        <img
          src="../assets/logo.png"
          alt="PilarFlix Logo"
          class="dark:text-amber-300 text-red-500 text-3xl logo"
          style="width: 200px; height: auto"
        />
      </router-link>

      <span
        @click="toggleMenu"
        class="absolute md:hidden right-6 top-4 cursor-pointer"
      >
        <svg
          v-if="!mobileMenuIsOpen"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
        <svg
          v-else
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
      <ul
        class="dark:bg-gray-900 bg-slate-200 text-xl md:flex md:items-center md:px-0 px-10 md:pb-0 pb-14 md:static absolute md:w-auto w-full top-20 duration-300 ease-in"
        :class="[mobileMenuIsOpen ? 'left-0' : 'left-[-100%]']"
      >
        <li class="md:mx-4 md:my-0 my-6">
          <router-link
            @click="toggleMenu"
            to="/"
            class="dark:hover:text-gray-300 hover:text-gray-500 flex items-center"
          >
            <i class="fas fa-film text-xl mr-2"></i>
            Movies
          </router-link>
        </li>
        <li class="md:mx-4 md:my-0 my-6">
          <router-link
            @click="toggleMenu"
            to="/tvShows"
            class="dark:hover:text-gray-300 hover:text-gray-500 flex items-center"
          >
            <i class="fas fa-desktop mr-2"></i>

            Tv's
          </router-link>
        </li>
        <li class="md:mx-4 md:my-0 my-6">
          <router-link
            @click="toggleMenu"
            to="/people"
            class="dark:hover:text-gray-300 hover:text-gray-500 flex items-center"
          >
            <i class="fas fa-users mr-2"></i>

            People
          </router-link>
        </li>
        <li class="md:mx-4 md:my-0 my-6">
          <router-link
            @click="toggleMenu"
            class="dark:hover:text-gray-300 hover:text-gray-500 flex items-center"
            to="/all-popular"
          >
            <i class="fas fa-fire mr-2"></i>
            Popular
          </router-link>
        </li>
        <li class="md:mx-4 md:my-0 my-6">
          <router-link
            @click="toggleMenu"
            class="dark:hover:text-gray-300 hover:text-gray-500 flex items-center"
            to="/all-trends"
          >
            <i class="fas fa-poll mr-2"></i>
            Trends
          </router-link>
        </li>
      </ul>
      <div
        class="ml-auto md:flex md:items-center md:px-0 px-10 md:pb-0 pb-10 md:static absolute md:w-auto w-full top-64 duration-300 ease-in"
        :class="[mobileMenuIsOpen ? 'left-0' : 'left-[-100%]']"
      >
        <div class="relative mt-3 md:mt-0" ref="target">
          <div class="relative">
            <input
              @focus="searchIsOpen = true"
              @keydown="searchIsOpen = true"
              v-model="searchText"
              @input="handleInput"
              @keydown.enter="performGeneralSearch"
              type="text"
              :class="[
                'dark:bg-gray-800 dark:border-0 border bg-slate-200 border-gray-400 text-sm rounded-full w-full md:w-64 px-4 pl-8 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500 shadow-md',
                { 'mt-mobile-menu': mobileMenuIsOpen },
              ]"
              placeholder="Search a movie..."
            />
            <div class="absolute top-1 left-2">
              <svg
                class="fill-current w-4 text-gray-500 mt-2 ml-1"
                :class="{ 'mt-mobile-menu': mobileMenuIsOpen }"
                viewBox="0 0 24 24"
              >
                <path
                  class="heroicon-ui"
                  d="M16.32 14.9l5.39 5.4a1 1 0 01-1.42 1.4l-5.38-5.38a8 8 0 111.41-1.41zM10 16a6 6 0 100-12 6 6 0 000 12z"
                />
              </svg>
            </div>
            <svg
              v-show="toggleSpinner"
              class="absolute top-1 right-2 w-5 h-5 text-gray-400 fill-red-500 animate-spin dark:text-gray-600 dark:fill-amber-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <svg
              v-show="searchText.length && !toggleSpinner"
              @click="clearSearchText"
              class="absolute top-2 right-2 w-5 h-5 text-red-500 dark:text-amber-300 cursor-pointer"
              :class="{ 'mt-mobile-menu': mobileMenuIsOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              style="margin-right: 10px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div
              v-show="searchText.length && searchIsOpen"
              class="z-50 absolute dark:bg-gray-800 dark:border-0 border border-gray-400 bg-slate-200 text-sm rounded w-full md:w-64 mt-5"
            >
              <ul v-show="searchResults.length">
                <li
                  v-for="searchResult in searchResults"
                  :key="searchResult.id"
                  class="border-b dark:border-gray-700 border-gray-400"
                >
                  <router-link
                    @click="toggleMenu"
                    :to="`/movie/${searchResult.id}`"
                    class="dark:hover:bg-gray-700 hover:bg-gray-500 hover:text-white px-3 py-3 flex items-center transition ease-in-out duration-150"
                  >
                    <img
                      v-if="searchResult.poster_path"
                      :src="`https://image.tmdb.org/t/p/w92/${searchResult.poster_path}`"
                      alt="poster"
                      class="w-8"
                    />
                    <img
                      v-else
                      src="https://via.placeholder.com/50x75"
                      alt="poster"
                      class="w-8"
                    />
                    <span class="ml-4">{{ searchResult.title }}</span>
                  </router-link>
                </li>
              </ul>
              <div v-show="noResults" class="px-3 py-3">
                No results for "{{ searchText }}"
              </div>
              <div
                class="ml-auto md:flex md:items-center md:px-0 px-10 md:pb-0 pb-10 md:static absolute md:w-auto w-full top-64 duration-300 ease-in"
                :class="[mobileMenuIsOpen ? 'left-0' : 'left-[-100%]']"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.dark .router-link-active:not(.logo) {
  color: #dfba00;
}

.router-link-active:not(.logo) {
  color: #6b7280;
}
.absolute.top-2.left-2 {
  top: 0.2rem; /* Ajuste conforme necessário para descer mais a lupa */
}

.mt-mobile-menu {
  margin-top: 6.5rem;
}
.absolute.top-1.left-2 {
  top: 0.1rem;
}

@media (max-width: 768px) {
  .hidden-mobile {
    display: none;
  }
  .mt-10 {
    margin-top: 6rem;
  }
}
</style>
