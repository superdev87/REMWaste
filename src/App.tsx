import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import NavigationBar from './components/layout/NavigationBar';
import Footer from './components/layout/Footer';
import { useSkips } from './hooks/useSkips';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy-loaded components
const SkipSelection = lazy(() => import('./components/features/skips/SkipSelection'));

function App() {
  const { 
    skips, 
    selectedSkip, 
    setSelectedSkip, 
    loading, 
    error 
  } = useSkips('NR32', 'Lowestoft');

  const handleBack = () => {
    console.log('Back clicked');
    // Implement navigation logic
  };

  const handleContinue = () => {
    console.log('Continue clicked with skip:', selectedSkip);
    // Implement navigation logic
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <NavigationBar />
        
        <main className="relative mt-0 pb-24">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={() => window.location.reload()} />
          ) : (
            <Suspense fallback={<LoadingState />}>
              <SkipSelection 
                skips={skips} 
                selectedSkip={selectedSkip} 
                onSelectSkip={setSelectedSkip} 
              />
            </Suspense>
          )}
        </main>
        
        <Footer 
          selectedSkip={selectedSkip} 
          onBack={handleBack} 
          onContinue={handleContinue} 
        />
      </ErrorBoundary>
    </div>
  );
}

// Extracted UI components for cleaner code
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <Loader2 className="w-10 h-10 text-[#0037C1] animate-spin mb-4" />
    <p className="text-gray-400">Loading skip options...</p>
  </div>
);

const ErrorState = ({ error, onRetry }: { error: string, onRetry: () => void }) => (
  <div className="text-center p-8 rounded-lg bg-[#2A2A2A] max-w-md mx-auto my-16 shadow-lg">
    <h3 className="text-red-400 font-bold mb-2">Error Loading Data</h3>
    <p className="text-gray-300 mb-4">{error}</p>
    <button 
      onClick={onRetry}
      className="px-4 py-2 bg-[#0037C1] text-white rounded-md hover:bg-[#002da1] transition-colors"
    >
      Try Again
    </button>
  </div>
);

const ErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white p-4">
    <div className="text-center p-8 rounded-lg bg-[#2A2A2A] max-w-md mx-auto shadow-lg">
      <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-300 mb-6">
        We're sorry, but there was an unexpected error. Our team has been notified.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-[#0037C1] text-white rounded-md hover:bg-[#002da1] transition-colors"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

export default App;
