import axios from "axios";

const API_KEY = `49390436-eaa1c4fe3003ec0e1553f6322`;
const BASE_URL = `https://pixabay.com/api/`;

export async function fetchImages(query, limit = 15, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: true,
        per_page: limit,
        page: page,
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching images:`, error);
    throw error;
  }
}