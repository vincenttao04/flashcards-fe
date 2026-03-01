/**
 * Vue Router Configuration
 * -------------------------
 * Defines the routing structure for the Flashcard SPA.
 *
 * Routes:
 * - /                     → HomePage
 * - /create               → CreateDeck
 * - /deck/:deckId         → ViewDeck
 * - /deck/:deckId/edit    → EditDeck
 *
 * Notes:
 * - Route components are lazy-loaded for code splitting.
 * - deckId is passed as a prop to page components.
 * - Explicit /deck prefix prevents path collisions.
 */
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/HomePage.vue"),
    },
    {
      path: "/create",
      name: "create",
      component: () => import("@/pages/CreateDeck.vue"),
    },
    {
      path: "/deck/:deckId",
      name: "deck",
      component: () => import("@/pages/ViewDeck.vue"),
      props: true,
    },
    {
      path: "/deck/:deckId/edit",
      name: "edit",
      component: () => import("@/pages/EditDeck.vue"),
      props: true,
    },
  ],
});

export default router;
