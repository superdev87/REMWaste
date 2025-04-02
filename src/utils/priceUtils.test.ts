import { describe, expect, it } from 'vitest';
import { calculatePriceWithVAT, formatCurrency } from './priceUtils';
import { Skip } from '../types';

describe('priceUtils', () => {
  describe('calculatePriceWithVAT', () => {
    it('should calculate the correct price with VAT', () => {
      const skipData = {
        id: 1,
        size: 8,
        hire_period_days: 14,
        price_before_vat: 100,
        vat: 20,
        allowed_on_road: true,
        allows_heavy_waste: true,
        transport_cost: 50,
        per_tonne_cost: 10,
        postcode: 'NR32',
        area: 'Lowestoft',
        weight_limit: 1000,
        lead_time_days: 2,
        company_id: 1,
        forbidden: false,
        created_at: '2023-01-01',
        updated_at: '2023-01-01'
      } as Skip;
      
      expect(calculatePriceWithVAT(skipData)).toBe(120);
    });
    
    it('should round the price to the nearest integer', () => {
      const skipData = {
        id: 2,
        size: 4,
        hire_period_days: 14,
        price_before_vat: 99.5,
        vat: 20,
        allowed_on_road: true,
        allows_heavy_waste: false,
        transport_cost: 50,
        per_tonne_cost: 10,
        postcode: 'NR32',
        area: 'Lowestoft',
        weight_limit: 1000,
        lead_time_days: 2,
        company_id: 1,
        forbidden: false,
        created_at: '2023-01-01',
        updated_at: '2023-01-01'
      } as Skip;
      
      expect(calculatePriceWithVAT(skipData)).toBe(119);
    });
  });
  
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1000)).toBe('£1,000');
      expect(formatCurrency(99.9)).toBe('£100');
    });
  });
}); 