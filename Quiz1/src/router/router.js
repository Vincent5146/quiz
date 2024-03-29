import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import("../pages/Home.vue"),
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () =>
      import("../pages/Favorite.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
