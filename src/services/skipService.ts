import { Skip } from '../types';
import { API_BASE_URL } from '../config';

/**
 * Fetches available skips based on location
 * @param postcode Postcode for delivery
 * @param area Area name
 * @returns Promise with array of available skips
 */
export async function fetchSkips(postcode: string, area: string): Promise<Skip[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/skips/by-location?postcode=${postcode}&area=${area}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const message = errorData?.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(message);
    }
    
    return response.json();
  } catch (error) {
    console.error('Failed to fetch skips:', error);
    throw error;
  }
} 