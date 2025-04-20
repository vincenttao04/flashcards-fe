export const flashCardSets = [
  {
    id: "vue-basics",
    title: "Vue.js Basics",
    description: "Learn the fundamentals of Vue.js framework",
    createdAt: new Date("2024-04-20"),
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
    title: "JavaScript for Beginners",
    description: "Core concepts of JavaScript programming",
    createdAt: new Date("2024-04-15"),
    cards: [
      {
        question: "What is closure?",
        answer:
          "A closure is the combination of a function and the lexical environment within which that function was declared.",
      },
    ],
  },
  {
    id: "general-knowledge",
    title: "General Knowledge",
    description: "Questions to test your overall general knowledge.",
    createdAt: new Date("2025-04-10"),
    cards: [
      {
        question: "What is the capital of France?",
        answer: "Paris",
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        answer: "William Shakespeare",
      },
      {
        question: "What is the largest planet in our solar system?",
        answer: "Jupiter",
      },
      {
        question: "What year did World War II end?",
        answer: "1945",
      },
      {
        question: "Which element has the chemical symbol 'O'?",
        answer: "Oxygen",
      },
      {
        question: "Who painted the Mona Lisa?",
        answer: "Leonardo da Vinci",
      },
      {
        question: "What is the smallest prime number?",
        answer: "2",
      },
      {
        question: "What currency is used in Japan?",
        answer: "Yen",
      },
      {
        question: "What is the main language spoken in Brazil?",
        answer: "Portuguese",
      },
      {
        question: "How many continents are there on Earth?",
        answer: "Seven",
      },
    ],
  },
  {
    id: "fun-facts",
    title: "Fun Facts",
    description:
      "A collection of surprising and entertaining facts from around the world.",
    createdAt: new Date("2025-03-08"),
    cards: [
      {
        question: "What is the only food that never spoils?",
        answer: "Honey",
      },
      {
        question: "Which animal can hold its breath longer than a dolphin?",
        answer: "A sloth",
      },
      {
        question: "How many hearts does an octopus have?",
        answer: "Three",
      },
      {
        question: "What is the shortest war in history?",
        answer: "The Anglo-Zanzibar War, lasting about 38 minutes",
      },
      {
        question: "What fruit was once considered a symbol of hospitality?",
        answer: "Pineapple",
      },
      {
        question: "Can bananas float in water?",
        answer: "Yes, bananas float due to their low density and air content.",
      },
      {
        question: "Which country has more sheep than people?",
        answer: "New Zealand",
      },
    ],
  },
];

export function getFlashCardSet(setId) {
  return flashCardSets.find((set) => set.id === setId);
}
