const API_BASE = "http://localhost:3000";

type CardInput = {
  question: string;
  answer: string;
};

type DeckInput = {
  title: string;
  description: string;
  cards: CardInput[];
};

// Helper function to handle API responses
async function handleResponse(res: Response) {
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.error || "Request failed");
  }
  return res.json().catch(() => null);
}

export const deckApi = {
  async getAll() {
    const res = await fetch(`${API_BASE}/decks`);
    return handleResponse(res);
  },

  async get(deckId: number) {
    const res = await fetch(`${API_BASE}/decks/${deckId}`);
    return handleResponse(res);
  },

  async create(data: DeckInput) {
    const res = await fetch(`${API_BASE}/decks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  async update(deckId: number, data: DeckInput) {
    const res = await fetch(`${API_BASE}/decks/${deckId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  async delete(deckId: number) {
    const res = await fetch(`${API_BASE}/decks/${deckId}`, {
      method: "DELETE",
    });

    return handleResponse(res);
  },
};
