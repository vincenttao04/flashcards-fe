/**
 * deckApi
 * ----------
 * Centralised API layer for deck-related requests.
 *
 * Responsibilities:
 * - Handles all HTTP communication with the backend
 * - Normalises error handling
 * - Keeps fetch logic out of Vue components
 *
 * Environment:
 * - Uses VITE_API_BASE_URL if defined
 * - Falls back to local development server
 */

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

/**
 * Shared JSON headers for POST/PUT requests
 */
const JSON_HEADERS = {
  "Content-Type": "application/json",
};

/**
 * Normalises API responses.
 * - Throws an Error if response is not OK
 * - Safely attempts to parse JSON
 *
 * @param {Response} res
 * @returns {Promise<any>}
 */
async function handleResponse(res) {
  if (!res.ok) {
    let errorMessage = "Request failed";

    try {
      const error = await res.json();
      errorMessage = error?.error || errorMessage;
    } catch {
      // Ignore JSON parsing errors and keep default message
    }

    throw new Error(errorMessage);
  }

  try {
    return await res.json();
  } catch {
    return null;
  }
}

export const deckApi = {
  /**
   * Fetch all decks
   * @returns {Promise<Array>}
   */
  async getAll() {
    const res = await fetch(`${API_BASE}/decks`);
    return handleResponse(res);
  },

  /**
   * Fetch a single deck by ID
   * @param {string|number} deckId
   * @returns {Promise<Object>}
   */
  async get(deckId) {
    if (!deckId) throw new Error("Deck ID is required");

    const res = await fetch(`${API_BASE}/decks/${deckId}`);
    return handleResponse(res);
  },

  /**
   * Create a new deck
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const res = await fetch(`${API_BASE}/decks`, {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  /**
   * Update an existing deck
   * @param {string|number} deckId
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async update(deckId, data) {
    if (!deckId) throw new Error("Deck ID is required");

    const res = await fetch(`${API_BASE}/decks/${deckId}`, {
      method: "PUT",
      headers: JSON_HEADERS,
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  /**
   * Delete a deck by ID
   * @param {string|number} deckId
   * @returns {Promise<void>}
   */
  async delete(deckId) {
    if (!deckId) throw new Error("Deck ID is required");

    const res = await fetch(`${API_BASE}/decks/${deckId}`, {
      method: "DELETE",
    });

    return handleResponse(res);
  },
};