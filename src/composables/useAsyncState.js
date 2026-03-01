/**
 * useAsyncState
 * -------------
 * Manages loading and error state for async operations.
 *
 * Usage:
 * const { loading, error, run } = useAsyncState();
 * await run(() => apiCall());
 *
 * Behaviour:
 * - Sets loading=true during execution
 * - Captures error message
 * - Rethrows error for caller handling
 */
import { ref } from "vue";

export function useAsyncState() {
  const loading = ref(false);
  const error = ref(null);

  async function run(asyncFn) {
    loading.value = true;
    error.value = null;

    try {
      return await asyncFn();
    } catch (err) {
      error.value = err?.message || "Something went wrong";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    run,
  };
}
