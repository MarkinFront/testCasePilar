<script setup>
import 'tailwindcss/tailwind.css';

const githubLink = 'https://github.com/MarkinFront';
</script>

<template>
  <footer class="border-t dark:border-gray-800 border-gray-400 py-4">
    <div class="flex flex-col-reverse md:flex-row justify-between container place-items-center mx-auto p-4">
      <div>
        <img src="../assets/logo.png" alt="Logo" class="w-60 h-auto mr-2" />
        <p class="text-lg">Created by @MarkinFront</p>
        <p>This product uses the<a href="https://www.themoviedb.org/documentation/api"> TMDB API</a> but is not endorsed
          or certified by TMDB</p>
      </div>
      <div class="mb-8 md:mb-0 flex items-center">
        <a href="https://github.com/MarkinFront" target="_blank" rel="noopener noreferrer">
          <img src="../assets/github.png" alt="GitHub" class="w-8 h-8 mr-2" />
        </a>
        <p class="text-lg">Find me on <a href="{{ githubLink }}" class="text-blue-500" target="_blank" rel="noopener noreferrer">GitHub</a></p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #1c2333;
  color: #fff;
}

img {
  filter: invert(100%);
}

a {
  text-decoration: underline;
}
</style>
