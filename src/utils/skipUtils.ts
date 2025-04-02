import { Skip } from '../types';

/**
 * Gets the appropriate image URL based on skip size
 */
export function getSkipImageUrl(): string {
    return "https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&amp;w=800";
}

/**
 * Filters skips based on search term and filter criteria
 */
export function filterSkips(
  skips: Skip[], 
  searchTerm: string = '', 
  filterType: string | null = null
): Skip[] {
  let filteredSkips = [...skips];
  
  // Apply search filter
  if (searchTerm) {
    const lowerCaseSearch = searchTerm.toLowerCase();
    filteredSkips = filteredSkips.filter(skip => 
      skip.size.toString().includes(lowerCaseSearch) || 
      `${skip.size} yard skip`.toLowerCase().includes(lowerCaseSearch)
    );
  }
  
  // Apply category filter
  if (filterType) {
    switch(filterType) {
      case 'small':
        filteredSkips = filteredSkips.filter(skip => skip.size <= 4);
        break;
      case 'medium':
        filteredSkips = filteredSkips.filter(skip => skip.size >= 6 && skip.size <= 8);
        break;
      case 'large':
        filteredSkips = filteredSkips.filter(skip => skip.size >= 10 && skip.size <= 12);
        break;
      case 'xl':
        filteredSkips = filteredSkips.filter(skip => skip.size >= 14);
        break;
      case 'road':
        filteredSkips = filteredSkips.filter(skip => skip.allowed_on_road);
        break;
      case 'heavy':
        filteredSkips = filteredSkips.filter(skip => skip.allows_heavy_waste);
        break;
      case 'best':
        filteredSkips = filteredSkips.filter(skip => skip.size >= 8);
        break;
    }
  }
  
  return filteredSkips;
} 