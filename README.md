# FlashCard App (Vue)

This is a simple frontend flash card application built with Vue 3 and Vite. It demonstrates core Vue concepts like component structure, routing, and state management using basic functionalities.

---

## 🚀 Getting Started

Follow these steps to clone and run the project locally.

### Prerequisites (Important)

Before starting, make sure you have the following installed on your computer:

**Node.js (v14.0.0 or higher)**

- Download from: https://nodejs.org/
- To check if installed, run: "node --version" in your terminal

**npm (v6.0.0 or higher)**

- Comes with Node.js
- To check if installed, run: "npm --version" in your terminal

**Git**

- Download from: https://git-scm.com/downloads
- To check if installed, run: git --version in your terminal

**VS Code (recommended editor)**

- Download from: https://code.visualstudio.com/

## Running the App

### 1. Clone the Repository

```bash
git clone (HTTPS CLONING LINK)
cd your-repo-name
```

### 2. Install Dependencies

Open the project repo in VS Code (or run "code ."), open the terminal and run:

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Access the Application

The flashcard application will typically be running at: http://localhost:5173/

### 5. Troubleshooting

- If port 5173 is already in use, Vite will automatically try the next available port. Be sure to read text in the terminal to see which port Vite has selected.

- If you encounter any installation issues, try deleting the node_modules folder and running 'npm install' and 'npm run dev' again.

- If you see any errors about missing dependencies, make sure you're in the correct folder and ry running 'npm install' and 'npm run dev' again.

- For Windows users: If you get permission errors, try running your terminal and/or VS Code as administrator.

## Future Work

1. add a marquee carousel at the bottom for flash card navigation
2. a new edit feature on each individual card (so users can edit on the individual flash card page well)
3. my personal attribution at the bottom (add name, tech stack, etc.)
4. maybe deploy (see costing)
5. transition ease css ? 
6. make names consistent -> decks/sets, 
7. fix: tiny flicker, when fetching api, fe thinks there is no data when data has yet to arrive.
