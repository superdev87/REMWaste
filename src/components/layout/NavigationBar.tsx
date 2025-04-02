import { MapPin, Trash2, Truck, Shield, Calendar, CreditCard } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type StepStatus = 'completed' | 'current' | 'upcoming';

interface Step {
  icon: React.ElementType;
  label: string;
  status: StepStatus;
  onClick: (() => void) | null;
}

const NavigationBar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [activeStepIndex] = useState<number>(2);
  
  const steps: Step[] = [
    { icon: MapPin, label: 'Postcode', status: 'completed', onClick: () => console.log('Postcode clicked') },
    { icon: Trash2, label: 'Waste Type', status: 'completed', onClick: () => console.log('Waste Type clicked') },
    { icon: Truck, label: 'Select Skip', status: 'current', onClick: () => console.log('Select Skip clicked') },
    { icon: Shield, label: 'Permit Check', status: 'upcoming', onClick: null },
    { icon: Calendar, label: 'Choose Date', status: 'upcoming', onClick: null },
    { icon: CreditCard, label: 'Payment', status: 'upcoming', onClick: null },
  ];

  // Check if navigation is scrollable on resize
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollRef.current) {
        setIsScrollable(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  // Auto-scroll to active step
  useEffect(() => {
    if (scrollRef.current && activeStepIndex !== null) {
      const container = scrollRef.current;
      const activeStep = container.children[activeStepIndex] as HTMLElement;
      
      if (activeStep) {
        const containerWidth = container.offsetWidth;
        const stepLeft = activeStep.offsetLeft;
        const stepWidth = activeStep.offsetWidth;
        
        container.scrollTo({
          left: stepLeft - (containerWidth / 2) + (stepWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [activeStepIndex]);

  const getStepClasses = useCallback((status: StepStatus) => {
    switch(status) {
      case 'current':
        return 'text-[#0037C1] font-medium';
      case 'completed':
        return 'text-white';
      default:
        return 'text-gray-500';
    }
  }, []);

  const getIconClasses = useCallback((status: StepStatus) => {
    switch(status) {
      case 'current':
      case 'completed':
        return 'text-[#0037C1]';
      default:
        return 'text-gray-500';
    }
  }, []);

  const getConnectorClasses = useCallback((index: number) => {
    if (index < activeStepIndex) return 'bg-[#0037C1]';
    if (index === activeStepIndex) return 'bg-gradient-to-r from-[#0037C1] to-[#2A2A2A]';
    return 'bg-[#2A2A2A]';
  }, [activeStepIndex]);

  return (
    <div className="sticky top-0 z-50 w-full bg-[#121212] border-b border-[#2A2A2A] shadow-lg">
      <div className="relative max-w-7xl mx-auto">
        {isScrollable && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-12 pointer-events-none bg-gradient-to-r from-[#121212] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none bg-gradient-to-l from-[#121212] to-transparent z-10" />
          </>
        )}
        
        <div className="w-full overflow-x-hidden">
          <div className="container mx-auto px-4">
            <div 
              className="flex items-center py-2 overflow-x-auto no-scrollbar"
              ref={scrollRef}
            >
              {steps.map((step, index) => (
                <div key={index} className="flex items-center flex-shrink-0">
                  {/* Step item */}
                  <div 
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300
                      ${getStepClasses(step.status)}
                      ${step.status !== 'upcoming' ? 'cursor-pointer hover:bg-[#2A2A2A]/50' : 'cursor-default'}
                    `}
                    onClick={step.status !== 'upcoming' && step.onClick ? step.onClick : undefined}
                    aria-current={step.status === 'current' ? 'step' : undefined}
                  >
                    <div className={`w-6 h-6 flex items-center justify-center ${getIconClasses(step.status)}`}>
                      <step.icon size={20} />
                    </div>
                    
                    <span className="whitespace-nowrap">{step.label}</span>
                  </div>
                  
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="px-2">
                      <div className={`h-[1px] w-12 transition-colors duration-500 ${getConnectorClasses(index)}`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar; 