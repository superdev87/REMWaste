import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Footer from './Footer';
import { Skip } from '../../types';

// Mock framer-motion to avoid animation-related issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...otherProps } = props;
      return <div {...otherProps}>{children}</div>;
    },
    button: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...otherProps } = props;
      return <button {...otherProps}>{children}</button>;
    },
    img: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...otherProps } = props;
      return <img {...otherProps}>{children}</img>;
    },
    span: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...otherProps } = props;
      return <span {...otherProps}>{children}</span>;
    }
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Footer', () => {
  // Mock skip for testing
  const mockSkip: Skip = {
    id: 1,
    size: 8,
    hire_period_days: 14,
    price_before_vat: 220,
    vat: 20,
    allowed_on_road: true,
    allows_heavy_waste: true,
    transport_cost: 50,
    per_tonne_cost: 10,
    postcode: 'NR32',
    area: 'Lowestoft',
    forbidden: false,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  };

  it('renders with no skip selected', () => {
    const onBack = vi.fn();
    const onContinue = vi.fn();
    
    render(<Footer selectedSkip={null} onBack={onBack} onContinue={onContinue} />);
    
    // Continue button should be disabled
    const continueButton = screen.getAllByText('Continue')[0].closest('button');
    expect(continueButton).toBeDisabled();
    
    // Should show hint text
    expect(screen.getByText('Select a skip to continue')).toBeInTheDocument();
  });

  it('renders with a skip selected', () => {
    const onBack = vi.fn();
    const onContinue = vi.fn();
    
    render(<Footer selectedSkip={mockSkip} onBack={onBack} onContinue={onContinue} />);
    
    // Continue button should be enabled
    const continueButton = screen.getAllByText('Continue')[0].closest('button');
    expect(continueButton).not.toBeDisabled();
    
    // Should show the price - only check that it exists, not the exact count
    // as the number of instances depends on layout state
    expect(screen.getAllByText('£264').length).toBeGreaterThan(0);
  });

  it('calls onBack when Back button is clicked', () => {
    const onBack = vi.fn();
    const onContinue = vi.fn();
    
    render(<Footer selectedSkip={mockSkip} onBack={onBack} onContinue={onContinue} />);
    
    // Click on the Back button
    fireEvent.click(screen.getAllByText('Back')[0]);
    
    // onBack should have been called
    expect(onBack).toHaveBeenCalled();
  });

  it('calls onContinue when Continue button is clicked with a skip selected', () => {
    const onBack = vi.fn();
    const onContinue = vi.fn();
    
    render(<Footer selectedSkip={mockSkip} onBack={onBack} onContinue={onContinue} />);
    
    // Click on the Continue button
    fireEvent.click(screen.getAllByText('Continue')[0]);
    
    // onContinue should have been called
    expect(onContinue).toHaveBeenCalled();
  });

  it('expands and collapses mobile details when clicking Show/Hide details', async () => {
    const onBack = vi.fn();
    const onContinue = vi.fn();
    
    // Override window.innerWidth to simulate mobile view
    Object.defineProperty(window, 'innerWidth', { value: 500, writable: true });
    window.dispatchEvent(new Event('resize'));
    
    render(<Footer selectedSkip={mockSkip} onBack={onBack} onContinue={onContinue} />);
    
    // Initially details should be hidden - we look for a specific label that only appears in expanded mode
    expect(screen.queryByText('Price (Excl. VAT):')).not.toBeInTheDocument();
    
    // Click "Show details"
    fireEvent.click(screen.getByText('Show details'));
    
    // Wait for animation to complete
    await waitFor(() => {
      // Now details should be visible
      expect(screen.getByText('Price (Excl. VAT):')).toBeInTheDocument();
    });
    
    // Click "Hide details"
    fireEvent.click(screen.getByText('Hide details'));
    
    // Wait for animation to complete
    await waitFor(() => {
      // Details should be hidden again
      expect(screen.queryByText('Price (Excl. VAT):')).not.toBeInTheDocument();
    });
  });

  it('toggles desktop details modal when Details button is clicked', async () => {
    const onBack = vi.fn();
    const onContinue = vi.fn();
    
    // Override window.innerWidth to simulate desktop view
    Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });
    window.dispatchEvent(new Event('resize'));
    
    render(<Footer selectedSkip={mockSkip} onBack={onBack} onContinue={onContinue} />);
    
    // Initially modal should be hidden
    expect(screen.queryByText('Skip Details')).not.toBeInTheDocument();
    
    // Find and click the Details button on desktop
    const detailsButton = screen.getByText('Details');
    fireEvent.click(detailsButton);
    
    // Modal should now be visible
    expect(screen.getByText('Skip Details')).toBeInTheDocument();
    
    // Close the modal
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    
    // Modal should be hidden again
    await waitFor(() => {
      expect(screen.queryByText('Skip Details')).not.toBeInTheDocument();
    });
  });
}); 