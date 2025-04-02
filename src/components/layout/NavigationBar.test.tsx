import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationBar from './NavigationBar';

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock the scrollTo method
Element.prototype.scrollTo = vi.fn();

describe('NavigationBar', () => {
  beforeEach(() => {
    // Setup mocks
    window.ResizeObserver = ResizeObserverMock;
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('renders all navigation steps', () => {
    render(<NavigationBar />);
    
    // Check if all steps are rendered
    expect(screen.getByText('Postcode')).toBeInTheDocument();
    expect(screen.getByText('Waste Type')).toBeInTheDocument();
    expect(screen.getByText('Select Skip')).toBeInTheDocument();
    expect(screen.getByText('Permit Check')).toBeInTheDocument();
    expect(screen.getByText('Choose Date')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
  });

  it('highlights the current step correctly', () => {
    render(<NavigationBar />);
    
    // The "Select Skip" step should be marked as current
    const currentStep = screen.getByText('Select Skip').closest('div');
    expect(currentStep).toHaveAttribute('aria-current', 'step');
    
    // Check for the current step styling class
    expect(currentStep).toHaveClass('text-[#0037C1]');
  });

  it('allows clicking on completed steps', () => {
    render(<NavigationBar />);
    
    // Click on the Postcode step (completed)
    fireEvent.click(screen.getByText('Postcode'));
    
    // Should have logged the click (we mocked console.log)
    expect(console.log).toHaveBeenCalledWith('Postcode clicked');
  });

  it('does not allow clicking on upcoming steps', () => {
    render(<NavigationBar />);
    
    // Try to click on the Permit Check step (upcoming)
    fireEvent.click(screen.getByText('Permit Check'));
    
    // Console.log should not have been called
    expect(console.log).not.toHaveBeenCalledWith('Permit Check clicked');
  });

  it('renders a different style for completed, current, and upcoming steps', () => {
    render(<NavigationBar />);
    
    // Completed step should have white text
    const completedStep = screen.getByText('Postcode').closest('div');
    expect(completedStep).toHaveClass('text-white');
    
    // Current step should have blue text
    const currentStep = screen.getByText('Select Skip').closest('div');
    expect(currentStep).toHaveClass('text-[#0037C1]');
    
    // Upcoming step should have gray text
    const upcomingStep = screen.getByText('Payment').closest('div');
    expect(upcomingStep).toHaveClass('text-gray-500');
  });
}); 