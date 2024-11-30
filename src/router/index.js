import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/filmes',
    name: 'Movies',
    component: () => import('../views/MoviesView.vue'),
  },
  {
    path: '/filmes/:id',
    name: 'filme',
    component: () => import('../views/MovieShow.vue'),
    props: true
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import('../views/TvView.vue'),
  },
  {
    path: '/tv/:id',
    name: 'tv',
    component: () => import('../views/TvShow.vue'),
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;