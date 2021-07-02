import { createRouter, createWebHashHistory } from 'vue-router';

import WeatherSearch from '../views/WeatherSearch.vue';

const routes = [
  {
    path: '/',
    name: 'Search your Weather City',
    component: WeatherSearch,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'), // Lazy-loading
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
