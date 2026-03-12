/**
 * API module to handle fetching data from a public REST API
 */

// Use FakeStoreAPI as an example data source for a portfolio/products context
const API_URL = 'https://fakestoreapi.com/products';

/**
 * Fetches product data from the API
 * @returns {Promise<Array>} The fetched items
 */
export async function fetchItems() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
