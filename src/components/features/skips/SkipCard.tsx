import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, Check } from 'lucide-react';
import { Skip } from '../../../types';
import { getSkipImageUrl } from '../../../utils/skipUtils';
import { calculatePriceWithVAT } from '../../../utils/priceUtils';

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: () => void;
}

const SkipCard = ({ skip, isSelected, onSelect }: SkipCardProps) => {
  const isDisabled = !skip.allowed_on_road && !skip.allows_heavy_waste;
  
  const priceWithVAT = useMemo(() => calculatePriceWithVAT(skip), [skip]);
  const skipImageUrl = getSkipImageUrl();
  
  return (
    <motion.div
      className={`
        relative rounded-lg border-2 h-full p-4 transition-all duration-300
        ${isSelected 
          ? 'border-[#0037C1] bg-[#0037C1]/10' 
          : isDisabled 
            ? 'border-[#2A2A2A] opacity-50' 
            : 'border-[#2A2A2A] hover:border-[#0037C1]/50 hover:shadow-lg hover:shadow-[#0037C1]/10'
        }
        bg-[#1C1C1C] text-white ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={isDisabled ? undefined : onSelect}
      role={isDisabled ? "presentation" : "button"}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 z-10"
        >
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <Check className="w-4 h-4 text-[#0037C1]" />
          </div>
        </motion.div>
      )}
      
      <div className="relative overflow-hidden rounded-md">
        <motion.img 
          src={skipImageUrl}
          alt={`${skip.size} Yard Skip`} 
          className="w-full aspect-video object-cover object-center bg-[#2A2A2A]"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Badge container */}
        <div className="absolute bottom-0 left-0 w-full p-3 flex flex-col gap-2">
          {!skip.allowed_on_road && (
            <div className="bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md inline-flex items-center w-54">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1 shrink-0" />
              <span className="text-xs font-medium text-yellow-500">Private Property Only</span>
            </div>
          )}
          
          {!skip.allows_heavy_waste && (
            <div className="bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md inline-flex items-center w-54">
              <AlertTriangle className="w-4 h-4 text-red-500 mr-1 shrink-0" />
              <span className="text-xs font-medium text-red-500">Not Suitable for Heavy Waste</span>
            </div>
          )}
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-1 mt-4 text-white">{skip.size} Yard Skip</h3>
      <p className="text-sm text-gray-400 mb-4">{skip.hire_period_days} day hire period</p>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-xl font-bold text-[#0037C1]">£{priceWithVAT}</span>
          <span className="text-sm text-gray-400 ml-1">per week</span>
        </div>
        
        {skip.size >= 20 && (
          <motion.span 
            className="bg-green-900/30 text-green-400 text-xs font-medium px-2.5 py-1 rounded"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Best value
          </motion.span>
        )}
      </div>
      
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          if (!isDisabled) onSelect();
        }}
        disabled={isDisabled}
        className={`
          w-full py-2.5 px-4 rounded-md transition-all duration-300 flex items-center justify-center space-x-2
          ${isSelected 
            ? 'bg-[#0037C1] text-white hover:bg-[#002da1]' 
            : 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]'
          }
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          focus:outline-none focus:ring-2 focus:ring-[#0037C1]
        `}
        whileHover={!isDisabled ? { y: -3 } : {}}
        whileTap={!isDisabled ? { y: -1 } : {}}
      >
        <span>{isSelected ? 'Selected' : 'Select This Skip'}</span>
        {!isSelected && <ArrowRight className="w-4 h-4 ml-1" />}
      </motion.button>
    </motion.div>
  );
};

export default SkipCard; 