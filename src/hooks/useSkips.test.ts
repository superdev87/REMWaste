import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';
import { useSkips } from './useSkips';
import { mockSkips } from '../setupTests';
import { server } from '../setupTests'; // Import server
import { http, HttpResponse } from 'msw'; // Import MSW v2 methods
import { API_BASE_URL } from '../config';

describe('useSkips', () => {
  it('should fetch and return skips', async () => {
    const { result } = renderHook(() => useSkips('NR32', 'Lowestoft'));
    
    // Initially in loading state
    expect(result.current.loading).toBe(true);
    expect(result.current.skips).toEqual([]);
    
    // Wait for the API call to resolve
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    // Should have skips data
    expect(result.current.skips).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 1, size: 4 }),
      expect.objectContaining({ id: 2, size: 8 })
    ]));
    expect(result.current.error).toBeNull();
  });
  
  it('should handle errors when API fails', async () => {
    // Spy on console.error to suppress error output
    const consoleErrorSpy = vi.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});
    
    // Override the handler to return an error for this test
    server.use(
      http.get(`${API_BASE_URL}/skips/by-location`, () => {
        return new HttpResponse(
          JSON.stringify({ message: 'Server error' }),
          { status: 500 }
        );
      })
    );
    
    const { result } = renderHook(() => useSkips('NR32', 'Lowestoft'));
    
    // Wait for the API call to resolve
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    // Should have error
    expect(result.current.error).not.toBeNull();
    expect(result.current.skips).toEqual([]);
    
    // Restore console.error
    consoleErrorSpy.mockRestore();
  });
  
  it('should set selectedSkip correctly', async () => {
    const { result } = renderHook(() => useSkips('NR32', 'Lowestoft'));
    
    // Wait for the API call to resolve
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    // Initially no skip is selected
    expect(result.current.selectedSkip).toBeNull();
    
    // Select a skip
    act(() => {
      result.current.setSelectedSkip(mockSkips[0]);
    });
    
    // Should have the selected skip
    expect(result.current.selectedSkip).toEqual(mockSkips[0]);
  });
}); 