import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { server } from '@/tests/server';

// MSW lifecycle hooks
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
