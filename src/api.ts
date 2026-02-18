const API_BASE = "http://localhost:3000";

export async function createDeck(title: string, description: string) {
  const res = await fetch(`${API_BASE}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
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

// update a deck: tbc

// delete a deck: tbc
