import { Skip } from '../../../types';
import SkipCard from "./SkipCard";
import { Search, X, Filter } from 'lucide-react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkipSelectionProps {
  skips: Skip[];
  selectedSkip: Skip | null;
  onSelectSkip: (skip: Skip) => void;
}

const SkipSelection = ({ skips, selectedSkip, onSelectSkip }: SkipSelectionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filteredSkips, setFilteredSkips] = useState<Skip[]>(skips);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filterScrollRef = useRef<HTMLDivElement>(null);
  
  // Filter categories
  const filterOptions = [
    { id: 'all', label: 'All Skips' },
    { id: 'small', label: 'Small (2-4 Yards)' },
    { id: 'medium', label: 'Medium (6-8 Yards)' },
    { id: 'large', label: 'Large (10-12 Yards)' },
    { id: 'xl', label: 'Extra Large (14+ Yards)' },
    { id: 'road', label: 'Road Placement' },
    { id: 'heavy', label: 'Heavy Waste' },
    { id: 'best', label: 'Best Value' },
  ];

  // Apply filters based on search term and active filter
  useEffect(() => {
    let results = [...skips];
    
    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      results = results.filter(skip => 
        skip.size.toString().includes(lowerCaseSearch) || 
        `${skip.size} yard skip`.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Apply category filter
    if (activeFilter) {
      switch(activeFilter) {
        case 'small':
          results = results.filter(skip => skip.size <= 4);
          break;
        case 'medium':
          results = results.filter(skip => skip.size >= 6 && skip.size <= 8);
          break;
        case 'large':
          results = results.filter(skip => skip.size >= 10 && skip.size <= 12);
          break;
        case 'xl':
          results = results.filter(skip => skip.size >= 14);
          break;
        case 'road':
          results = results.filter(skip => skip.allowed_on_road);
          break;
        case 'heavy':
          results = results.filter(skip => skip.allows_heavy_waste);
          break;
        case 'best':
          results = results.filter(skip => skip.size >= 20);
          break;
        case 'all':
        default:
          // No additional filtering
          break;
      }
    }
    
    setFilteredSkips(results);
  }, [skips, searchTerm, activeFilter]);

  // Focus search input when filters are opened
  useEffect(() => {
    if (isFiltersOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isFiltersOpen]);

  // Scroll active filter into view
  useEffect(() => {
    if (activeFilter && filterScrollRef.current) {
      const activeElement = filterScrollRef.current.querySelector(`[data-filter="${activeFilter}"]`);
      if (activeElement) {
        const container = filterScrollRef.current;
        const scrollLeft = activeElement.getBoundingClientRect().left + container.scrollLeft - container.getBoundingClientRect().left - 16;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeFilter]);

  const handleFilterClick = useCallback((filterId: string) => {
    setActiveFilter(prevFilter => prevFilter === filterId ? null : filterId);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const toggleFilters = useCallback(() => {
    setIsFiltersOpen(prev => !prev);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-32 pt-4">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Select Your Skip</h1>
        <p className="text-gray-400">Choose the right skip for your waste disposal needs</p>
      </div>
      
      {/* Filter bar */}
      <div className="sticky top-[61px] z-40 pt-3 pb-3 bg-[#121212] border-b border-[#2A2A2A] mb-6">
        <div className="flex flex-col space-y-4">
          {/* Search and filter toggles */}
          <div className="flex items-center gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by skip size..."
                className="w-full py-2.5 pl-10 pr-10 bg-[#2A2A2A] border-0 rounded-md text-white focus:ring-2 focus:ring-[#0037C1] focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <button
              onClick={toggleFilters}
              className={`
                flex items-center justify-center p-2.5 rounded-md transition-colors
                ${isFiltersOpen ? 'bg-[#0037C1] text-white' : 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]'}
              `}
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
          
          {/* Filters */}
          <AnimatePresence>
            {isFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div 
                  ref={filterScrollRef}
                  className="flex gap-2 pb-1 overflow-x-auto scrollbar-hide"
                >
                  {filterOptions.map(filter => (
                    <button
                      key={filter.id}
                      data-filter={filter.id}
                      onClick={() => handleFilterClick(filter.id)}
                      className={`
                        px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap flex-shrink-0
                        transition-all duration-200 transform hover:-translate-y-0.5
                        ${activeFilter === filter.id 
                          ? 'bg-[#0037C1] text-white' 
                          : 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]'}
                      `}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Skip cards grid */}
      {filteredSkips.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 px-4"
        >
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-[#2A2A2A] mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No skips found</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveFilter(null);
            }}
            className="px-4 py-2 bg-[#2A2A2A] text-white rounded-md hover:bg-[#3A3A3A]"
          >
            Clear all filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          {filteredSkips.map((skip, index) => (
            <motion.div
              key={skip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <SkipCard
                skip={skip}
                isSelected={selectedSkip?.id === skip.id}
                onSelect={() => onSelectSkip(skip)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SkipSelection; 