import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Spinner from "./components/Spinner.vue";
import MovieCard from './components/MovieCard.vue';
import TvShowCard from './components/TvShowCard.vue'

import './index.css'

const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)

app.component('Spinner', Spinner);
app.component('MovieCard', MovieCard);
app.component('TvShowCard', TvShowCard);

app.mount('#app')
