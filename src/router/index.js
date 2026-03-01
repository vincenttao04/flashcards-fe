/**
 * router
 * Purpose: Vue Router routes for Home, Create, View Deck, and Edit Deck pages.
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
