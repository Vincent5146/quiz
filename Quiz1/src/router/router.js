import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import("../pages/Home.vue"),
  },
  // {
  //   path: "/Card",
  //   name: "card",
  //   component: () =>
  //     import("../pages/Card.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
