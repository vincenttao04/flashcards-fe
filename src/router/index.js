import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import FlashCardPage from "../pages/FlashCardPage.vue";
import CreateFlashCardPage from "../pages/CreateFlashCardPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/flashcards/:setId",
      name: "flashcards",
      component: FlashCardPage,
      props: true,
    },
    {
      path: "/create",
      name: "create",
      component: CreateFlashCardPage,
    },
  ],
});

export default router;
