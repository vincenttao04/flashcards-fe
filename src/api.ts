const API_BASE = "http://localhost:3000";

export async function createDeck(
  title: string,
  description: string,
  cards: { question: string; answer: string }[],
) {
  const res = await fetch(`${API_BASE}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, cards }),
  });

  if (!res.ok) {
    throw new Error("Failed to create deck");
  }

  return res.json();
}

export async function getDecks() {
  const res = await fetch(`${API_BASE}/decks`);

  if (!res.ok) {
    throw new Error("Failed to fetch decks");
  }

  return res.json();
}

export async function getDeck(id: number) {
  const res = await fetch(`${API_BASE}/decks/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch deck");
  }

  return res.json();
}

export async function updateDeck(
  id: number,
  title: string,
  description: string,
  cards: { question: string; answer: string }[],
) {
  const res = await fetch(`${API_BASE}/decks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, cards }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.error || "Failed to update deck");
  }

  return res.json();
}

export async function deleteDeck(id: number) {
  const res = await fetch(`${API_BASE}/decks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.error || "Failed to delete deck");
  }

  return;
}
