# Flashcards (Frontend)

A flashcard web application built with **Vue 3** and **Vite**, developed for the COMPSCI 732 Individual Assignment at the University of Auckland (Semester 1, 2025).

The frontend communicates with a RESTful backend API for all data persistence. The backend repository can be found at [flashcards-be](https://github.com/vincenttao04/flashcards-be).

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
  - [Pages](#pages)
  - [Components](#components)
  - [Composables](#composables)
  - [API Layer](#api-layer)
  - [Router](#router)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Future Work](#future-work)
- [License](#license)
- [Author](#author)

## Demo

**Watch App Demo**

- [YouTube](https://youtu.be/L5bPalytsLU)
- [Video File](assets/demo.mp4)

## Features

- View all flashcard decks in a responsive grid layout
- Search decks by title, description, or card content
- Create new decks with any number of cards and a live preview
- Edit existing decks with pre-populated form data
- Delete decks with a confirmation prompt
- View cards one at a time with a flip animation (question ↔ answer)
- Navigate between cards with previous/next controls and a progress indicator
- Consistent loading and error states for both full-page and inline contexts
- Keyboard and screen-reader accessibility throughout
- Fully responsive design across desktop and mobile devices

## Tech Stack

**Core**

- [Vue 3](https://vuejs.org/) - Composition API
- [Vue Router 4](https://router.vuejs.org/) - Client-side routing with lazy-loaded routes
- [Vite 6](https://vite.dev/) - Development server and build tool

**Styling**

- [Bootstrap 5](https://getbootstrap.com/) - UI utilities and components
- [Bootstrap Icons](https://icons.getbootstrap.com/)

**Tooling**

- [ESLint](https://eslint.org/) + [eslint-plugin-vue](https://eslint.vuejs.org/)
- [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
- [Prettier](https://prettier.io/)
- [unplugin-icons](https://github.com/antfu/unplugin-icons) + [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) - Auto-imported icon components via `<i-simple-icons-*>` syntax

## Getting Started

### Prerequisites

| Tool                                 | Minimum Version | Check            |
| ------------------------------------ | --------------- | ---------------- |
| [Node.js](https://nodejs.org/)       | v14.0.0         | `node --version` |
| npm                                  | v6.0.0          | `npm --version`  |
| [Git](https://git-scm.com/downloads) | Any             | `git --version`  |

A code editor such as [VS Code](https://code.visualstudio.com/) is recommended.

### Installation

```bash
git clone https://github.com/vincenttao04/flashcards-fe.git
cd flashcards-fe
npm install
```

### Running the App

```bash
npm run dev
```

The app is typically available at [http://localhost:5173](http://localhost:5173). If the port is in use, Vite will select the next available one - check the terminal output.

> **Note:** The backend must also be running for data to load. See [flashcards-be](https://github.com/vincenttao04/flashcards-be) for setup instructions.

### Troubleshooting

- **Port conflict:** Vite auto-selects the next free port - check the terminal for the correct URL.
- **Installation errors:** Delete `node_modules`, then re-run `npm install` and `npm run dev`.
- **Missing dependencies:** Confirm you are in the correct directory and re-run `npm install`.
- **Windows permission errors:** Try running your terminal or VS Code as Administrator.

## Project Structure

```
flashcards-fe/
├── assets/
|   └── demo.mp4
|
├── src/
│   ├── api/
│   │   └── deckApi.js                    # Centralised backend API wrapper
│   │
│   ├── components/
│   │   ├── create-edit/
│   │   │   ├── CardInput.vue             # Question/answer textarea inputs for one card
│   │   │   ├── CardList.vue              # Renders and manages the list of CardInput items
│   │   │   ├── CardPreview.vue           # Live card preview with flip + navigation
│   │   │   ├── FormActions.vue           # Save / Cancel buttons with validation state
│   │   │   └── HeaderInput.vue           # Deck title + description inputs
│   │   │
│   │   ├── deck/
│   │   │   ├── CardIndicators.vue        # Pagination dots (implemented, currently unused)
│   │   │   ├── CardInterface.vue         # Clickable card with 3D flip animation
│   │   │   └── CardNavigator.vue         # Previous / Next controls + progress counter
│   │   │
│   │   ├── global/
│   │   │   ├── DeveloperAttribution.vue  # Footer with author name and tech icons
│   │   │   ├── ErrorInterface.vue        # Full-page and inline error display
│   │   │   ├── LoadingInterface.vue      # Full-page and inline loading spinner
│   │   │   └── PageHeader.vue            # Reusable heading with optional back link
│   │   │
│   │   └── home/
│   │       ├── DeckChip.vue              # Deck card with title, description, date, and actions
│   │       └── SearchBar.vue             # Search input with v-model and a clear button
│   │
│   ├── composables/
│   │   ├── useAsyncState.js              # loading + error state wrapper for async operations
│   │   └── useDeckForm.js                # Form state, validation, and card management
│   │
│   ├── pages/
│   │   ├── HomePage.vue                  # Deck library with search and delete
│   │   ├── CreateDeck.vue                # New deck form with live preview
│   │   ├── EditDeck.vue                  # Pre-populated edit form loaded by deck ID
│   │   └── ViewDeck.vue                  # Single deck viewer with flip and navigation
│   │
│   ├── router/
│   │   └── index.js                      # Vue Router config with lazy-loaded routes
│   │
│   ├── App.vue                           # Root shell: RouterView + footer
│   └── main.js                           # Entry point: registers router, imports global styles
│
├── vite.config.js                        # Vite config: Vue plugin, icon auto-import, @ alias
├── package.json
└── README.md
```

## Architecture

### Pages

Pages are route-level views responsible for fetching their own data and composing components.

| Page             | Route                | Description                                                                                                                                |
| ---------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `HomePage.vue`   | `/`                  | Fetches all decks on mount. Filters in real time across title, description, and card content. Handles deletion with a confirmation dialog. |
| `CreateDeck.vue` | `/create`            | Blank deck form. On save, POSTs to the API, resets the form, and redirects home. Shows a live preview while any card content exists.       |
| `EditDeck.vue`   | `/deck/:deckId/edit` | Loads and pre-populates the deck form on mount. On save, PUTs to the API and redirects to the deck view.                                   |
| `ViewDeck.vue`   | `/deck/:deckId`      | Loads a single deck by ID. Manages card index and flip state locally, with previous/next navigation and an edit shortcut in the header.    |

### Components

**`create-edit/`** - Used exclusively by `CreateDeck` and `EditDeck`.

- **`HeaderInput`** - Paired textareas for deck title and description.
- **`CardList`** - Renders a `CardInput` per card with Add/Remove controls. Remove is disabled when only one card remains.
- **`CardInput`** - Question and answer textareas for a single card.
- **`CardPreview`** - Live read-only preview reusing `CardInterface` and `CardNavigator`. Only shown when at least one card has content.
- **`FormActions`** - Save and Cancel buttons. Save is disabled when the form is invalid or a request is in progress. Shows a validation hint or API error below the buttons.

**`deck/`** - Used by `ViewDeck` and reused by `CardPreview`.

- **`CardInterface`** - The core flashcard UI. A full-height button with a CSS 3D `rotateY` flip transition and proper `aria-hidden` management on each face.
- **`CardNavigator`** - Previous/Next buttons with boundary-aware disabled states and an `aria-live` progress counter. Button labels are hidden on small screens (≤ 480 px).
- **`CardIndicators`** - Dot-style per-card pagination. Fully implemented but currently commented out in `ViewDeck` - ready to enable.

**`global/`** - Shared across the entire application.

- **`PageHeader`** - `<h1>` with an optional subtitle and back link. Accepts an `alignment` prop (`left` | `center` | `right`).
- **`LoadingInterface`** - Bootstrap spinner with a 300 ms mount delay to prevent flicker on fast requests. Supports `page` and `component` modes.
- **`ErrorInterface`** - Error display in either full-viewport (`page`) or inline (`component`) mode. In `page` mode, optionally shows a Home button.
- **`DeveloperAttribution`** - Footer with the author name and Simple Icons for Vue, TypeScript, Node.js, and Prisma.

**`home/`** - Used only by `HomePage`.

- **`DeckChip`** - Card-style deck summary showing title, description (2-line clamp), card count, creation date, and edit/delete actions. Delete emits to the parent rather than calling the API directly.
- **`SearchBar`** - Controlled `v-model` input. Toggles between a search icon (empty) and a clear button (with query).

### Composables

**`useAsyncState`** - Wraps an async function with `loading` and `error` reactive refs. `run(asyncFn)` sets `loading`, clears any prior error, and always resets `loading` on completion. Pages that need separate loading and saving states (e.g. `EditDeck`, `HomePage`) create two independent instances.

**`useDeckForm`** - Manages all reactive form state for deck creation and editing. Accepts optional `initialData` to pre-populate fields. Exposes:

- `title`, `description`, `cards`, `previewIndex` - reactive form values
- `isFormValid` - `true` only when all fields are non-empty
- `hasContent` - `true` when any card has at least one non-empty field
- `addCard()`, `removeCard(index)`, `updateCards(newCards)`, `resetForm()`

### API Layer

All backend communication is centralised in `src/api/deckApi.js`. The base URL is read from `VITE_API_BASE_URL`, defaulting to `http://localhost:3000`. An internal `handleResponse` function throws a descriptive error on non-OK responses and safely parses JSON on success.

| Method                 | HTTP     | Endpoint         |
| ---------------------- | -------- | ---------------- |
| `getAll()`             | `GET`    | `/decks`         |
| `get(deckId)`          | `GET`    | `/decks/:deckId` |
| `create(data)`         | `POST`   | `/decks`         |
| `update(deckId, data)` | `PUT`    | `/decks/:deckId` |
| `delete(deckId)`       | `DELETE` | `/decks/:deckId` |

### Router

Defined in `src/router/index.js` using `createWebHistory`. All pages are lazy-loaded and route params are passed as props to `ViewDeck` and `EditDeck`.

| Route                | Name     | Component    | Props    |
| -------------------- | -------- | ------------ | -------- |
| `/`                  | `home`   | `HomePage`   | -        |
| `/create`            | `create` | `CreateDeck` | -        |
| `/deck/:deckId`      | `deck`   | `ViewDeck`   | `deckId` |
| `/deck/:deckId/edit` | `edit`   | `EditDeck`   | `deckId` |

## Environment Variables

Create a `.env` file in the project root to override defaults:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Available Scripts

| Script    | Command                         | Description                            |
| --------- | ------------------------------- | -------------------------------------- |
| `dev`     | `vite`                          | Start the development server with HMR  |
| `build`   | `vite build`                    | Compile and bundle for production      |
| `preview` | `vite preview`                  | Preview the production build locally   |
| `lint`    | `eslint . --ext .js,.vue --fix` | Lint and auto-fix all JS and Vue files |

## Future Work

- Implement a marquee-style carousel for smoother and more intuitive card navigation within the deck view.
- Introduce user authentication with per-user deck storage and data isolation.
- Deploy the application to a production environment with proper environment configuration
- Implement proper confirmation dialogs for destructive actions (e.g., delete) instead of relying on native `alert()` prompts

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Vincent Tao - @vincenttao04
