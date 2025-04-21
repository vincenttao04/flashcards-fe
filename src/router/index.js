import { createRouter, createWebHistory } from "vue-router";

/**
 * Vue Router Configuration
 * Defines the routing structure for the Flash Card application
 *
 * Routes:
 * - / (home): Displays all flashcard sets
 * - /flashcards/:setId: Shows specific flashcard set
 * - /create: Create new flashcard set
 */
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
