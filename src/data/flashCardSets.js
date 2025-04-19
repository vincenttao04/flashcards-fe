export const flashCardSets = [
  {
    id: "vue-basics",
    title: "Vue.js Basics",
    description: "Learn the fundamentals of Vue.js framework",
    cards: [
      {
        question: "What is Vue.js?",
        answer:
          "Vue.js is a progressive JavaScript framework for building user interfaces.",
      },
      {
        question: "What is a component in Vue?",
        answer:
          "A component is a reusable Vue instance with a name that encapsulates HTML, CSS, and JavaScript.",
      },
      {
        question: "What is the Vue instance?",
        answer:
          "The Vue instance is the root of a Vue application that controls the entire app.",
      },
      {
        question: "What is v-bind used for?",
        answer:
          "v-bind is used to bind an attribute to a dynamic value from your data.",
      },
      {
        question: "What is v-model?",
        answer:
          "v-model is used for two-way data binding on form inputs and components.",
      },
    ],
  },
  {
    id: "js-fundamentals",
    title: "JavaScript Fundamentals",
    description: "Core concepts of JavaScript programming",
    cards: [
      {
        question: "What is closure?",
        answer:
          "A closure is the combination of a function and the lexical environment within which that function was declared.",
      },
      // ... more cards
    ],
  },
];

export function getFlashCardSet(setId) {
  return flashCardSets.find((set) => set.id === setId);
}
