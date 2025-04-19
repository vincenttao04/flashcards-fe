import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import FlashCardApp from "../views/FlashCardApp.vue";

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
      component: FlashCardApp,
      props: true,
    },
  ],
});

export default router;
