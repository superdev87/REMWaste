import { ArrowRight, ChevronUp, Info } from 'lucide-react';
import { Skip } from '../../types';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FooterProps {
  selectedSkip: Skip | null;
  onBack: () => void;
  onContinue: () => void;
}

const Footer = ({ selectedSkip, onBack, onContinue }: FooterProps) => {
  const [animatePrice, setAnimatePrice] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [desktopDetailsOpen, setDesktopDetailsOpen] = useState(false);
  
  const priceWithVAT = selectedSkip 
    ? Math.round(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100))
    : 0;
  
  useEffect(() => {
    if (selectedSkip) {
      setAnimatePrice(true);
      const timer = setTimeout(() => setAnimatePrice(false), 500);
      return () => clearTimeout(timer);
    }
  }, [selectedSkip]);

  const toggleDesktopDetails = () => {
    setDesktopDetailsOpen(!desktopDetailsOpen);
  };

  return (
    <>
      {/* Desktop details modal */}
      <AnimatePresence>
        {desktopDetailsOpen && selectedSkip && (
          <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4 hidden lg:flex">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#1C1C1C] rounded-lg max-w-md w-full shadow-xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Skip Details</h3>
                  <button 
                    onClick={toggleDesktopDetails}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center gap-4 mb-6 p-4 bg-[#0D0D0D] rounded-lg">
                  <div className="w-16 h-16 bg-[#2A2A2A] rounded-md overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=800"
                      alt={`${selectedSkip.size} Yard Skip`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{selectedSkip.size} Yard Skip</h4>
                    <p className="text-gray-400">{selectedSkip.hire_period_days} day hire period</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-[#2A2A2A]">
                    <span className="text-gray-400">Skip Size:</span>
                    <span className="font-medium">{selectedSkip.size} Yards</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#2A2A2A]">
                    <span className="text-gray-400">Hire Period:</span>
                    <span className="font-medium">{selectedSkip.hire_period_days} Days</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#2A2A2A]">
                    <span className="text-gray-400">Placement:</span>
                    <span className="font-medium">
                      {selectedSkip.allowed_on_road ? 'Road or Private Property' : 'Private Property Only'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#2A2A2A]">
                    <span className="text-gray-400">Waste Type:</span>
                    <span className="font-medium">
                      {selectedSkip.allows_heavy_waste ? 'All Waste Types' : 'No Heavy Waste'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#2A2A2A]">
                    <span className="text-gray-400">Price (Excl. VAT):</span>
                    <span className="font-medium">£{selectedSkip.price_before_vat}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#2A2A2A]">
                    <span className="text-gray-400">VAT ({selectedSkip.vat}%):</span>
                    <span className="font-medium">£{Math.round(selectedSkip.price_before_vat * selectedSkip.vat / 100)}</span>
                  </div>
                  <div className="flex justify-between py-2 pt-3">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-[#0037C1] text-xl">£{priceWithVAT}</span>
                  </div>
                </div>
                
                <button
                  onClick={toggleDesktopDetails}
                  className="w-full mt-6 py-3 px-4 bg-[#0037C1] text-white rounded-md hover:bg-[#002da1] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile expandable footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <motion.div 
          className="bg-[#0D0D0D] border-t border-[#2A2A2A] p-4 shadow-lg shadow-black/50"
          animate={{ y: expanded ? 0 : 'auto' }}
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setExpanded(!expanded)}
                className="flex items-center text-gray-400 text-sm"
              >
                <ChevronUp className={`w-4 h-4 mr-1 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                {expanded ? 'Hide details' : 'Show details'}
              </button>
                
              <div className="flex items-center">
                {selectedSkip ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-right ${animatePrice ? 'animate-pulse' : ''}`}
                  >
                    <p className="text-xs text-gray-400">Total price</p>
                    <p className="text-xl font-bold text-white">£{priceWithVAT}</p>
                  </motion.div>
                ) : (
                  <p className="text-sm text-gray-400">Select a skip to continue</p>
                )}
              </div>
            </div>
            
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  {selectedSkip && (
                    <div className="border-t border-[#2A2A2A] pt-4 mb-4">
                      <div className="bg-[#1C1C1C] p-4 rounded-lg mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Skip Size:</span>
                          <span className="font-medium">{selectedSkip.size} Yards</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Hire Period:</span>
                          <span className="font-medium">{selectedSkip.hire_period_days} Days</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">Price (Excl. VAT):</span>
                          <span className="font-medium">£{selectedSkip.price_before_vat}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-400">VAT ({selectedSkip.vat}%):</span>
                          <span className="font-medium">£{Math.round(selectedSkip.price_before_vat * selectedSkip.vat / 100)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-[#2A2A2A]">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold text-[#0037C1]">£{priceWithVAT}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={onBack}
                className="flex-1 py-3 px-4 rounded-md bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] transition-all duration-300"
              >
                Back
              </button>
              <motion.button
                onClick={onContinue}
                disabled={!selectedSkip}
                className={`
                  flex-1 py-3 px-4 rounded-md text-white transition-all duration-300
                  flex items-center justify-center gap-2
                  ${selectedSkip ? 'bg-[#0037C1] hover:bg-[#002da1]' : 'bg-[#2A2A2A] opacity-50 cursor-not-allowed'}
                `}
                whileHover={selectedSkip ? { scale: 1.02 } : {}}
                whileTap={selectedSkip ? { scale: 0.98 } : {}}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Desktop footer */}
      <div className="hidden lg:block fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-[#2A2A2A] p-4 z-50 shadow-lg shadow-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="py-2.5 px-6 rounded-md bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#0037C1]"
              >
                Back
              </button>
            </div>
            
            <div className="flex justify-center">
              {selectedSkip && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-[#1C1C1C] rounded-lg px-6 py-3 flex items-center gap-6"
                >
                  <div>
                    <p className="text-sm text-gray-400">Selected Skip</p>
                    <p className="font-medium">{selectedSkip.size} Yard Skip</p>
                  </div>
                  <div className={`text-right ${animatePrice ? 'animate-pulse' : ''}`}>
                    <p className="text-sm text-gray-400">Total price</p>
                    <p className="text-xl font-bold text-[#0037C1]">£{priceWithVAT}</p>
                  </div>
                  <button
                    onClick={toggleDesktopDetails}
                    className="ml-2 flex items-center gap-1 py-1.5 px-3 bg-[#2A2A2A] hover:bg-[#3A3A3A] rounded-md text-sm transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    <span>Details</span>
                  </button>
                </motion.div>
              )}
            </div>
            
            <div className="flex justify-end">
              <motion.button
                onClick={onContinue}
                disabled={!selectedSkip}
                className={`
                  py-2.5 px-6 rounded-md text-white transition-all duration-300
                  flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0037C1]
                  ${selectedSkip ? 'bg-[#0037C1] hover:bg-[#002da1]' : 'bg-[#2A2A2A] opacity-50 cursor-not-allowed'}
                `}
                whileHover={selectedSkip ? { y: -2 } : {}}
                whileTap={selectedSkip ? { y: -1 } : {}}
              >
                Continue
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer; 