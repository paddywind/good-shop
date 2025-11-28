// /frontend/lib/secureApi.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // Match your backend server address

/**
 * Fetches data or sends mutations to a protected API endpoint.
 * Automatically attaches the JWT from localStorage.
 * * @param {string} endpoint - The API path (e.g., 'products' or 'blog/my-post')
 * @param {string} method - HTTP method (POST, PUT, DELETE, GET)
 * @param {Object | FormData} bodyData - The data to send (JSON object or FormData for files)
 * @returns {Promise<Object>} The JSON response data or error
 */
export async function fetchProtectedData(endpoint, method = 'GET', bodyData = null) {
  const token = localStorage.getItem('jwt_token');

  if (!token) {
    throw new Error('Authentication token not found. Please log in.');
  }

  const url = `${BASE_URL}/${endpoint}`;
  const isFileBased = bodyData instanceof FormData;

  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  // Only set Content-Type: application/json if we are sending plain JSON (not FormData for file uploads)
  if (!isFileBased) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    method: method,
    headers: headers,
  };

  if (bodyData) {
    // If sending files (FormData), do NOT set the 'Content-Type' header here, 
    // as the browser sets it automatically (multipart/form-data) with the boundary.
    // If sending JSON, stringify the data.
    config.body = isFileBased ? bodyData : JSON.stringify(bodyData);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // Throw an error with the backend message
      throw new Error(data.message || `API Error! Status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`Protected Fetch Error (${method} ${url}):`, error);
    throw error; // Re-throw the error to be handled by the component
  }
}