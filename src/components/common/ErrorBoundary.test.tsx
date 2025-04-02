import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error
const ErrorThrowingComponent = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error occurred</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error for cleaner test output
  let consoleErrorSpy: any;
  
  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <div>Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('renders fallback UI when an error occurs', () => {
    // Using a key to force re-mounting the component
    render(
      <ErrorBoundary key="test-error" fallback={<div>Something went wrong</div>}>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByText('No error occurred')).not.toBeInTheDocument();
  });

  it('calls componentDidCatch when an error occurs', () => {
    const componentDidCatchSpy = vi.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
    
    // Using a key to force re-mounting the component
    render(
      <ErrorBoundary key="test-catch" fallback={<div>Something went wrong</div>}>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(componentDidCatchSpy).toHaveBeenCalled();
    componentDidCatchSpy.mockRestore();
  });

  it('recovers when error condition is resolved', () => {
    // First render with error
    const { rerender } = render(
      <ErrorBoundary key="test-recovery" fallback={<div>Something went wrong</div>}>
        <ErrorThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Re-render with error condition removed - requires a new ErrorBoundary instance
    rerender(
      <ErrorBoundary key="test-recovery-new" fallback={<div>Something went wrong</div>}>
        <ErrorThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error occurred')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });
}); 