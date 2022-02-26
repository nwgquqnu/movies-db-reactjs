import { server } from './server';
import { default as crossFetch } from 'cross-fetch';

// import('node-fetch').then(module => globalThis.fetch = module.default as any);
globalThis.fetch = crossFetch;
// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())