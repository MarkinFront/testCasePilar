<template>
  <div v-if="showSpinner" class="hollow-dots-spinner">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { createPinia } from 'pinia';
import { useSpinnerStore } from "../store/spinnerStore";

const pinia = createPinia();
pinia.use();
const spinnerStore = useSpinnerStore(pinia);
const showSpinner = ref(spinnerStore.showSpinner);

watch(
  () => spinnerStore.showSpinner,
  (newValue) => {
    showSpinner.value = newValue;
  }
);
</script>
<style scoped>
.hollow-dots-spinner {
  height: 30px; 
  width: calc(30px * 3); 
}

.hollow-dots-spinner .dot {
  width: 30px; 
  height: 30px; 
  margin: 0 calc(30px / 2);
  border: calc(30px / 5) solid #fcd34d;
  border-radius: 50%;
  float: left;
  transform: scale(0);
  animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;
}

.hollow-dots-spinner .dot:nth-child(1) {
  animation-delay: calc(300ms * 1);
}

.hollow-dots-spinner .dot:nth-child(2) {
  animation-delay: calc(300ms * 2);
}

.hollow-dots-spinner .dot:nth-child(3) {
  animation-delay: calc(300ms * 3);
}

@keyframes hollow-dots-spinner-animation {
  50% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
