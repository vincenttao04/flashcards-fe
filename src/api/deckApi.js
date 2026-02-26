const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Helper function to handle API responses
async function handleResponse(res) {
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error((error && error.error) || "Request failed");
  }
  return res.json().catch(() => null);
}

export const deckApi = {
  async getAll() {
    const res = await fetch(`${API_BASE}/decks`);
    return handleResponse(res);
  },

  async get(deckId) {
    const res = await fetch(`${API_BASE}/decks/${deckId}`);
    return handleResponse(res);
  },

  async create(data) {
    const res = await fetch(`${API_BASE}/decks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  async update(deckId, data) {
    const res = await fetch(`${API_BASE}/decks/${deckId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  async delete(deckId) {
    const res = await fetch(`${API_BASE}/decks/${deckId}`, {
      method: "DELETE",
    });

    return handleResponse(res);
  },
};
