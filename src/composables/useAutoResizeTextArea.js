/**
 * useAutoResizeTextArea
 * ---------------------
 * Automatically resizes a textarea element up to a maximum number of rows.
 *
 * @param {number} maxRows - Maximum visible rows (default: 5)
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
