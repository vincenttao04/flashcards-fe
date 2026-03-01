<!--
  Attribution Component
  ---------------------
  Displays author attribution and primary technologies used.

  Accessibility:
  - Uses <footer> for semantic meaning.
  - Provides aria-label describing technology stack.
  - Icons are marked decorative (aria-hidden).
-->

<template>
  <footer class="attribution-container">
    <span class="author">Vincent Tao</span>
    <span class="separator" aria-hidden="true">·</span>

    <span
      class="icon-container"
      aria-label="Built with Vue, TypeScript, Node.js, and Prisma"
    >
      <i-simple-icons-vuedotjs aria-hidden="true" />
      <i-simple-icons-typescript aria-hidden="true" />
      <i-simple-icons-nodedotjs aria-hidden="true" />
      <i-simple-icons-prisma aria-hidden="true" />
    </span>
  </footer>
</template>

<style scoped>
.attribution-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding-top: 3.6rem;
  color: #6c757d;
  width: 100%;
  font-size: 0.9rem;
}

.icon-container {
  display: flex;
  gap: 0.35rem;
  margin-bottom: 0.2rem;
}

.separator {
  margin: 0 0.2rem;
}

.author {
  text-align: center;
}
</style>
