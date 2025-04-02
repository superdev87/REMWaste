import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { API_BASE_URL } from './config';

// Sample skip data for tests
export const mockSkips = [
  {
    id: 1,
    size: 4,
    hire_period_days: 14,
    price_before_vat: 220,
    vat: 20,
    allowed_on_road: true,
    allows_heavy_waste: false,
    transport_cost: 50,
    per_tonne_cost: 10,
    postcode: 'NR32',
    area: 'Lowestoft',
    weight_limit: 1000,
    lead_time_days: 2,
    company_id: 1,
    forbidden: false,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  },
  {
    id: 2,
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
    weight_limit: 1000,
    lead_time_days: 2,
    company_id: 1,
    forbidden: false,
    created_at: '2023-01-01',
    updated_at: '2023-01-01'
  },
];

// MSW handlers for v2
const handlers = [
  http.get(`${API_BASE_URL}/skips/by-location`, () => {
    return HttpResponse.json(mockSkips)
  }),
];

// Setup MSW server
const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { server }; 