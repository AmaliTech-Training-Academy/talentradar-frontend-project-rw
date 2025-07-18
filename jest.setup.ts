import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { server } from '@/tests/server';
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, {
    TextEncoder,
    TextDecoder,
});

// MSW lifecycle hooks
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
