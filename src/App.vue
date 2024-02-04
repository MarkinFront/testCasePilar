<script setup>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<template>
  <div class="dark:bg-gray-900 bg-slate-200 dark:text-white font-roboto">
    <TheHeader />
    <router-view />
    <TheFooter />
  </div>
</template>

<style></style>
