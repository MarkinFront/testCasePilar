import { createRouter, createWebHistory } from "vue-router";
import MoviesIndex from "../views/MoviesIndex.vue";
import PeopleIndex from "../views/PeopleIndex.vue";
import TvShowsIndex from "../views/TvShowsIndex.vue";
import TvShowDetail from "../views/TvShowDetail.vue";
import MovieDetail from "../views/MovieDetail.vue";
import PersonDetail from "../views/PersonDetail.vue";
import PageNotFound from "../views/PageNotFound.vue";
import AllTrends from "../views/AllTrends.vue";
import AllPopular from "../views/AllPopular.vue";
import SearchResults from "../views/SearchResults.vue";
import useStoreAllPopular from '../store/allPopular';
import useStoreAllTrend from "../store/allTrends";
import useStorePeople from "../store/storePeople";

const routes = [
  {
    path: "/",
    name: "MoviesIndex",
    component: MoviesIndex,
  },
  {
    path: "/movies",
    redirect: { name: "MoviesIndex" },
  },
  {
    path: "/people",
    name: "PeopleIndex",
    component: PeopleIndex,
    beforeEnter: (to, from, next) => {
      useStorePeople().resetPage();
      next();
    }
  },
  {
    path: "/person/:id",
    name: "PersonDetail",
    component: PersonDetail,
    props: true,
  },
  {
    path: "/tvShows",
    name: "TvShowsIndex",
    component: TvShowsIndex,
  },
  {
    path: "/movie/:id",
    name: "MovieDetail",
    component: MovieDetail,
    props: true,
  },
  {
    path: "/tvShow/:id",
    name: "TvShowDetail",
    component: TvShowDetail,
    props: true,
  },
  {
    path: "/all-trends",
    name: "AllTrends",
    component: AllTrends,
    beforeEnter: (to, from, next) => {
      useStoreAllTrend().resetPage();
      next();
    },
  },
  {
    path: "/all-popular",
    name: "AllPopular",
    component: AllPopular,
    beforeEnter: (to, from, next) => {
      useStoreAllPopular().resetPage();
      next();
    },
  },
  {
    path: "/search",
    name: "search-results",
    component: SearchResults,
    props: (route) => ({ query: route.query.query || "" }),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    window.scrollTo(0, 0);
  },
});



export default router;
