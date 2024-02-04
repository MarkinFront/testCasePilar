  <script setup>
import { ref } from 'vue'

const darkMode = ref(true)

function toggleMode() {
  document.getElementsByTagName('body')[0].classList.toggle('dark')
}

</script>

<template>
  <footer class="border-t dark:border-gray-800 border-gray-400 py-4">
    <div class="flex flex-col-reverse md:flex-row justify-between container place-items-center mx-auto p-4">
      <div>
        <p>Created by Me</p>
        <p>This product uses the<a href="https://www.themoviedb.org/documentation/api"> TMDB API</a> but is not endorsed
          or certified by TMDB</p>
      </div>
      <div class="mb-8 md:mb-0">
        <!-- <label class="switch">
          <input type="checkbox" v-model="darkMode">
          <span @click="toggleMode" class="slider round"></span>
        </label> -->
      </div>
    </div>
  </footer>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fcd34d;
}

.slider:before {
  z-index: 1;
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #fcd34d;
}

.slider:after {
  position: absolute;
  z-index: 1;
  content: url("../assets/sun.svg");
  left: 6px;
  top: 6px;
}

input:checked+.slider {
  background-color: #a1a1aa;
}

input:checked+.slider:before {
  background: #a1a1aa;
}

input:checked+.slider:after {
  position: absolute;
  z-index: 1;
  content: url("../assets/moon.svg");
  left: 50px;
  top: 1px;
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>