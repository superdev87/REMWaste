import { useState, useEffect } from 'react';
import { Skip } from '../types';
import { fetchSkips } from '../services/skipService';

export function useSkips(postcode: string, area: string) {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSkips = async () => {
      try {
        setLoading(true);
        const data = await fetchSkips(postcode, area);
        
        if (isMounted) {
          // Sort skips by size for better display
          const sortedSkips = [...data].sort((a, b) => a.size - b.size);
          setSkips(sortedSkips);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSkips();

    return () => {
      isMounted = false;
    };
  }, [postcode, area]);

  return { 
    skips, 
    selectedSkip, 
    setSelectedSkip,
    loading, 
    error 
  };
} 