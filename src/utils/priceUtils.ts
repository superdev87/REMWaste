import { Skip } from '../types';

/**
 * Calculates the price including VAT for a skip
 */
export function calculatePriceWithVAT(skip: Skip): number {
  return Math.round(skip.price_before_vat * (1 + skip.vat / 100));
}

/**
 * Formats currency value to GBP
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
} 