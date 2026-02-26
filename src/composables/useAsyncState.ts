import { ref } from "vue";

export function useAsyncState() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function run<T>(asyncFn: () => Promise<T>): Promise<T> {
    loading.value = true;
    error.value = null;

    try {
      return await asyncFn();
    } catch (err: any) {
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
