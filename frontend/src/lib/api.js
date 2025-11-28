// /frontend/lib/api.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // <--- IMPORTANT: Match your backend server address

/**
 * Fetches data from a public API endpoint.
 * @param {string} endpoint - The path (e.g., 'products' or 'blog/my-post')
 * @returns {Promise<Object>} The JSON response data
 */
export async function fetchPublicData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      // Throw an error if the response status is 4xx or 5xx
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    return null;
  }
}