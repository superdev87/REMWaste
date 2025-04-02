import { describe, expect, it } from 'vitest';
import { getSkipImageUrl, filterSkips } from './skipUtils';
import { mockSkips } from '../setupTests';
import { Skip } from '../types';

describe('skipUtils', () => {
  describe('getSkipImageUrl', () => {
    it('returns correct image URL for skips', () => {
      expect(getSkipImageUrl()).toBe("https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&amp;w=800");
    });
  });

  describe('filterSkips', () => {
    // Sample skips for testing filters
    const testSkips: Skip[] = [
      { ...mockSkips[0], size: 4, allowed_on_road: true, allows_heavy_waste: false },
      { ...mockSkips[1], size: 8, allowed_on_road: true, allows_heavy_waste: true },
      { ...mockSkips[0], id: 3, size: 10, allowed_on_road: false, allows_heavy_waste: true },
      { ...mockSkips[1], id: 4, size: 14, allowed_on_road: false, allows_heavy_waste: false }
    ];

    it('returns all skips when no filters are applied', () => {
      const result = filterSkips(testSkips);
      expect(result).toEqual(testSkips);
    });

    it('filters skips by search term (numeric match)', () => {
      const result = filterSkips(testSkips, '8');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(testSkips[1].id);
    });

    it('filters skips by search term (text match)', () => {
      const result = filterSkips(testSkips, '10 yard');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(testSkips[2].id);
    });

    it('filters skips by "small" category', () => {
      const result = filterSkips(testSkips, '', 'small');
      expect(result).toHaveLength(1);
      expect(result[0].size).toBe(4);
    });

    it('filters skips by "medium" category', () => {
      const result = filterSkips(testSkips, '', 'medium');
      expect(result).toHaveLength(1);
      expect(result[0].size).toBe(8);
    });

    it('filters skips by "large" category', () => {
      const result = filterSkips(testSkips, '', 'large');
      expect(result).toHaveLength(1);
      expect(result[0].size).toBe(10);
    });

    it('filters skips by "xl" category', () => {
      const result = filterSkips(testSkips, '', 'xl');
      expect(result).toHaveLength(1);
      expect(result[0].size).toBe(14);
    });

    it('filters skips by "road" category', () => {
      const result = filterSkips(testSkips, '', 'road');
      expect(result).toHaveLength(2);
      expect(result.every(skip => skip.allowed_on_road)).toBe(true);
    });

    it('filters skips by "heavy" category', () => {
      const result = filterSkips(testSkips, '', 'heavy');
      expect(result).toHaveLength(2);
      expect(result.every(skip => skip.allows_heavy_waste)).toBe(true);
    });

    it('filters skips by "best" category', () => {
      const result = filterSkips(testSkips, '', 'best');
      expect(result).toHaveLength(3);
      expect(result.every(skip => skip.size >= 8)).toBe(true);
    });

    it('combines search term and category filter', () => {
      const result = filterSkips(testSkips, '10', 'large');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(testSkips[2].id);
    });
  });
}); 