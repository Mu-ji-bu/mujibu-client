// src/mocks/browser.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// This configures a Service Worker with the given request handlers.
export const serverWorker = setupServer(...handlers);
