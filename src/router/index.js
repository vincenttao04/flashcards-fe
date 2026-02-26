import { createRouter, createWebHistory } from "vue-router";

/**
 * Vue Router Configuration
 * Defines the routing structure for the Flash Card application
 *
 * Routes:
 * - / (home): Displays all decks
 * - /deck/:deckId: Shows a specific deck of cards
 * - /create: Create a new deck of cards
 * - /edit/:deckId: Edit an existing deck of cards
 */
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/HomePage.vue"),
    },
    {
      path: "/:deckId",
      name: "deck",
      component: () => import("@/pages/ViewDeck.vue"),
      props: true,
    },
    {
      path: "/create",
      name: "create",
      component: () => import("@/pages/CreateDeck.vue"),
    },
    {
      path: "/:deckId/edit",
      name: "edit",
      component: () => import("@/pages/EditDeck.vue"),
      props: true,
    },
  ],
});

export default router;
