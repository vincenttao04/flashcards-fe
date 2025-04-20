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
  {
    id: "finance-281",
    title: "Finance 281",
    description:
      "Learn the fundamentals of personal finance, investing, and financial literacy.",
    createdAt: new Date("2025-02-04"),
    cards: [
      {
        question: "What is a budget?",
        answer:
          "A budget is a plan for how you will spend and save your money.",
      },
      {
        question: "What does APR stand for?",
        answer: "Annual Percentage Rate",
      },
      {
        question: "What is credit score used for?",
        answer: "It indicates your creditworthiness to lenders.",
      },
      {
        question: "What is compound interest?",
        answer:
          "Interest calculated on both the principal and the accumulated interest.",
      },
      {
        question:
          "What is the difference between a debit card and a credit card?",
        answer:
          "A debit card uses your money; a credit card borrows money from the bank.",
      },
      {
        question: "What is an emergency fund?",
        answer: "Money set aside for unexpected expenses or emergencies.",
      },
      {
        question: "What is a stock?",
        answer: "A stock represents ownership in a company.",
      },
      {
        question: "What is a bond?",
        answer:
          "A bond is a loan made to a company or government by an investor.",
      },
      {
        question: "What does 'diversification' mean in investing?",
        answer: "Spreading investments across different assets to reduce risk.",
      },
      {
        question: "What is inflation?",
        answer:
          "The general increase in prices and decrease in purchasing power over time.",
      },
      {
        question: "What is a 401(k)?",
        answer: "A retirement savings plan offered by employers in the U.S.",
      },
      {
        question: "What does 'net worth' mean?",
        answer: "The value of your assets minus your liabilities.",
      },
      {
        question: "What is a mortgage?",
        answer:
          "A loan used to purchase real estate, typically paid over years.",
      },
    ],
  },
  // === Space & Astronomy Set ===
  {
    id: "space-astronomy",
    title: "Space & Astronomy",
    description:
      "Explore fascinating facts about space, planets, and the universe.",
    createdAt: new Date("2024-12-16"),
    cards: [
      {
        question: "Which planet is known as the Red Planet?",
        answer: "Mars",
      },
      {
        question: "What is the hottest planet in our solar system?",
        answer: "Venus",
      },
      {
        question: "How long does light from the Sun take to reach Earth?",
        answer: "About 8 minutes and 20 seconds",
      },
      {
        question: "What is a black hole?",
        answer:
          "A region of space where gravity is so strong that nothing can escape from it.",
      },
      {
        question: "Which planet has the most moons?",
        answer: "Saturn",
      },
      {
        question: "What galaxy is Earth located in?",
        answer: "The Milky Way Galaxy",
      },
      {
        question: "What causes a solar eclipse?",
        answer:
          "The Moon passes between the Earth and the Sun, blocking sunlight.",
      },
      {
        question: "What was the first human-made object to reach space?",
        answer: "The V-2 rocket in 1944",
      },
      {
        question: "Who was the first person on the Moon?",
        answer: "Neil Armstrong",
      },
      {
        question: "What is the International Space Station (ISS)?",
        answer:
          "A space station where astronauts live and work in orbit around Earth.",
      },
    ],
  },

  // === Technology & Innovation Set ===
  {
    id: "tech-innovation",
    title: "Tech & Innovation",
    description:
      "A set of questions covering key tech breakthroughs and digital trends.",
    createdAt: new Date("2024-11-02"),
    cards: [
      {
        question: "Who is known as the father of the computer?",
        answer: "Charles Babbage",
      },
      {
        question: "What does AI stand for?",
        answer: "Artificial Intelligence",
      },
      {
        question: "What is blockchain used for?",
        answer:
          "Secure, decentralized data storage and transactions (e.g., cryptocurrency).",
      },
      {
        question: "What is cloud computing?",
        answer: "The delivery of computing services over the internet.",
      },
      {
        question: "What is the Internet of Things (IoT)?",
        answer: "A network of physical devices connected and exchanging data.",
      },
      {
        question: "What language is commonly used to build websites?",
        answer: "HTML, CSS, and JavaScript",
      },
      {
        question: "Who founded Microsoft?",
        answer: "Bill Gates and Paul Allen",
      },
      {
        question: "What does VR stand for?",
        answer: "Virtual Reality",
      },
    ],
  },
];

export function getFlashCardSet(setId) {
  return flashCardSets.find((set) => set.id === setId);
}
