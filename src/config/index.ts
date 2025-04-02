// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://app.wewantwaste.co.uk/api';

// Feature Flags
export const FEATURES = {
  ENABLE_FILTERS: true,
  SHOW_BEST_VALUE: true,
  DEBUG_MODE: import.meta.env.MODE === 'development',
};

// Styling Constants
export const COLORS = {
  PRIMARY: '#0037C1',
  PRIMARY_DARK: '#002da1',
  BACKGROUND: '#121212',
  SURFACE: '#1C1C1C',
  SURFACE_LIGHT: '#2A2A2A',
  SURFACE_LIGHTER: '#3A3A3A',
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#CCCCCC',
  TEXT_TERTIARY: '#999999',
};

// Navigation Steps
export const NAVIGATION_STEPS = [
  { key: 'postcode', label: 'Postcode', icon: 'MapPin' },
  { key: 'waste_type', label: 'Waste Type', icon: 'Trash2' },
  { key: 'select_skip', label: 'Select Skip', icon: 'Truck' },
  { key: 'permit_check', label: 'Permit Check', icon: 'Shield' },
  { key: 'choose_date', label: 'Choose Date', icon: 'Calendar' },
  { key: 'payment', label: 'Payment', icon: 'CreditCard' },
]; 