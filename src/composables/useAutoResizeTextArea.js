/**
 * useAutoResizeTextArea
 * Purpose: Composable that auto-resizes a textarea up to a max number of rows.
 */

import { nextTick } from "vue";

export function useAutoResizeTextArea(maxRows = 5) {
  function resize(el) {
    if (!el) return;

    el.style.height = "auto";

    const style = getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight);
    const maxHeight = lineHeight * maxRows;

    el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
  }

  async function handleInput(e) {
    await nextTick();
    resize(e.target);
  }

  return { handleInput, resize };
}
