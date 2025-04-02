# Skip Hire Web Application

## Project Overview
A modern web application built with React and TypeScript for booking skip hire services. This application allows users to search for skips by postcode, filter options by size and features, and complete the booking process with a streamlined user experience.

## Features
- **Location-based Skip Search**: Find available skips in your area
- **Advanced Filtering**: Filter skips by size, waste type compatibility, and placement options
- **Responsive Design**: Optimized for both mobile and desktop experiences
- **Interactive UI**: Smooth animations and transitions for a modern feel
- **Step-by-step Booking**: Guided navigation through the booking process
- **Price Calculation**: Real-time price display with VAT breakdown

## User Experience (UI/UX) Focus

We've implemented a user-centric design approach with these key UI/UX enhancements:

### Visual Design and Interaction
- **Animated Transitions**: Smooth transitions between states provide visual feedback and improve perceived performance
- **Micro-interactions**: Small animations on buttons, cards and selections create a responsive, engaging experience
- **Consistent Design Language**: Uniform color palette, spacing, and component styling throughout the application
- **Visual Hierarchy**: Important elements (like prices and CTA buttons) are visually emphasized
- **Skeleton Loading States**: Placeholders show while content loads to reduce perceived wait time

### Navigation and User Flow
- **Progress Indicator**: Clear step visualization in the NavigationBar helps users understand their location in the booking process
- **Contextual Guidance**: The Footer adapts to show relevant actions based on the current step
- **Breadcrumb Navigation**: Users can navigate back to previous steps easily
- **Mobile-optimized Navigation**: Touch-friendly targets and simplified navigation on smaller screens

### Accessibility Improvements
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Compatibility**: Semantic HTML and ARIA attributes for assistive technology
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: High contrast text meets WCAG AA standards
- **Error Presentation**: Clear error states with helpful recovery instructions

### Mobile Responsiveness
- **Adaptive Layouts**: Components restructure themselves based on screen size
- **Touch-Optimized Interfaces**: Larger touch targets on mobile
- **Collapsible Information**: Expandable sections conserve space on smaller screens
- **Responsive Typography**: Text sizes adjust for readability across devices

### Error Handling and User Feedback
- **Graceful Error Recovery**: ErrorBoundary component prevents catastrophic failures
- **Loading Indicators**: Transparent feedback during asynchronous operations
- **Toast Notifications**: Non-intrusive success and error messages
- **Form Validation**: Immediate feedback for input errors
- **Empty States**: Helpful guidance when no results are found

## Technical Implementation

### Frontend Stack
- **React 18**: For component-based UI architecture
- **TypeScript**: For type safety and improved developer experience
- **Tailwind CSS**: For utility-first styling approach
- **Framer Motion**: For smooth animations and transitions
- **Vite**: For fast development and optimized builds
- **React Testing Library & Vitest**: For comprehensive testing

### Key Components
- **SkipSelection**: Main component for displaying and filtering available skips
- **SkipCard**: Reusable component for displaying individual skip options
- **NavigationBar**: Step indicator for the booking process
- **Footer**: Context-aware action buttons and price summary
- **ErrorBoundary**: Graceful error handling throughout the application

## Testing Strategy

### Testing Philosophy
Our testing approach follows these principles:
1. **Component Isolation**: Testing components in isolation with mocked dependencies
2. **Behavior-Driven**: Testing user interactions and expected outcomes
3. **Complete Coverage**: Targeting high test coverage across all components
4. **Realistic Scenarios**: Testing real-world user flows and edge cases

### Test Categories

#### 1. Component Tests
- **Unit Tests**: Testing individual components in isolation
  - Props validation
  - Rendering states (loading, empty, populated)
  - Conditional rendering
  
- **Interaction Tests**: Testing user interactions
  - Click handlers
  - Form inputs
  - Selection states
  - Filters and search functionality

#### 2. Utility Function Tests
- **Input/Output Testing**: Verifying correct function behavior
  - `filterSkips`: Testing filtering logic for various criteria

#### 3. Custom Hook Tests
- **State Management**: Testing hook state initialization and updates
- **API Integration**: Testing data fetching and error handling
- **Side Effects**: Testing cleanup and effect dependencies

#### 4. Error Handling Tests
- **Error Boundary**: Testing component error catching
- **API Errors**: Testing graceful handling of backend failures
- **Validation Errors**: Testing form validation and error messaging

### Testing Tools and Setup
- **Vitest**: Test runner and assertion library
- **React Testing Library**: Component rendering and DOM interaction
- **MSW (Mock Service Worker)**: API mocking
- **User-Event**: Simulating user interactions
- **Vitest Coverage**: Tracking test coverage

### Test Mocking Strategy
- **Component Mocks**: Simplified versions of complex components for testing
- **API Mocks**: Consistent data responses for predictable tests
- **Animation Mocks**: Simplified Framer Motion behavior for testing
- **Browser API Mocks**: Window resize, scrolling, and other browser functionality

## Code Structure and Organization

### Feature-Based Architecture
- **Feature Modules**: Components organized by business domain
  - `/skips`: Skip selection and filtering
  - `/checkout`: Payment and booking confirmation (not implemented) 
  - `/user`: User profile and preferences (not implemented) 

### Shared Components
- **UI Elements**: Reusable UI components (buttons, inputs, etc.)
- **Layout Components**: Page structure components (NavigationBar, Footer)
- **Utility Components**: Helper components (ErrorBoundary, LoadingIndicator)

### State Management
- **React Hooks**: Local component state
- **Custom Hooks**: Shared state logic (useSkips, useFilteredSkips)
- **Context API**: Global state for booking process

## Performance Considerations
- **Code Splitting**: Lazy loading of components for faster initial load
- **Memoization**: React.memo and useMemo for expensive operations
- **Optimized Animations**: Hardware-accelerated animations for smooth performance
- **Responsive Images**: Appropriately sized images for different viewports

## Accessibility Features
- **Semantic HTML**: Proper element usage for screen readers
- **ARIA Attributes**: Enhanced accessibility for interactive elements
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Focus Management**: Proper focus handling for modals and dialogs

## Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- src/components/features/skips/SkipSelection.test.tsx
```

## Future Enhancements
- **Integration Tests**: End-to-end testing of full user journeys
- **Visual Regression Tests**: Ensuring UI consistency across changes
- **Performance Tests**: Measuring and optimizing component rendering times
- **Internationalization**: Support for multiple languages
- **A11y Automated Tests**: Automated accessibility checks

---

This project demonstrates a comprehensive approach to building and testing a modern React application, with a focus on user experience, code quality, and maintainability.
