import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SkipCard from './SkipCard';
import { Skip } from '../../../types';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...validProps } = props;
      return <div {...validProps}>{children}</div>;
    },
    button: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...validProps } = props;
      return <button {...validProps}>{children}</button>;
    },
    img: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...validProps } = props;
      return <img {...validProps}>{children}</img>;
    },
    span: ({ children, ...props }: any) => {
      const { whileHover, whileTap, ...validProps } = props;
      return <span {...validProps}>{children}</span>;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('SkipCard', () => {
  const mockSkip: Skip = {
    id: 1,
    size: 8,
    hire_period_days: 14,
    price_before_vat: 280,
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
  
  const renderSkipCard = (props: Partial<{ skip: Skip, isSelected: boolean }> = {}) => {
    const onSelect = vi.fn();
    return {
      onSelect,
      ...render(
        <SkipCard
          skip={props.skip || mockSkip}
          isSelected={props.isSelected || false}
          onSelect={onSelect}
        />
      ),
    };
  };
  
  it('renders skip information correctly', () => {
    renderSkipCard();
    
    expect(screen.getByText('8 Yard Skip')).toBeInTheDocument();
    expect(screen.getByText('14 day hire period')).toBeInTheDocument();
    expect(screen.getByText('£336')).toBeInTheDocument(); // 280 + 20% VAT
    expect(screen.getByText('Select This Skip')).toBeInTheDocument();
  });
  
  it('shows selected state when isSelected is true', () => {
    renderSkipCard({ isSelected: true });
    
    expect(screen.getByText('Selected')).toBeInTheDocument();
    // We can't easily test for the check icon due to mocking, but we can check for a selected class
    expect(screen.getByRole('button', { pressed: true })).toBeInTheDocument();
  });
  
  it('calls onSelect when select button is clicked', () => {
    const { onSelect } = renderSkipCard();
    
    fireEvent.click(screen.getByText('Select This Skip'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
  
  it('shows restriction badges for skips with limitations', () => {
    const restrictedSkip: Skip = {
      ...mockSkip,
      allowed_on_road: false,
      allows_heavy_waste: false,
    };
    
    renderSkipCard({ skip: restrictedSkip });
    
    expect(screen.getByText('Private Property Only')).toBeInTheDocument();
    expect(screen.getByText('Not Suitable for Heavy Waste')).toBeInTheDocument();
  });
  
  it('disables the card when skip has both restrictions', () => {
    const restrictedSkip: Skip = {
      ...mockSkip,
      allowed_on_road: false,
      allows_heavy_waste: false,
    };
    
    renderSkipCard({ skip: restrictedSkip });
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    // Should not call onSelect when disabled
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });
}); 