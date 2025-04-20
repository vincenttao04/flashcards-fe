import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/HomePage.vue"),
    },
    {
      path: "/flashcards/:setId",
      name: "flashcards",
      component: () => import("../pages/FlashCardPage.vue"),
      props: true,
    },
    {
      path: "/create",
      name: "create",
      component: () => import("../pages/CreateFlashCardPage.vue"),
    },
  ],
});

export default router;
