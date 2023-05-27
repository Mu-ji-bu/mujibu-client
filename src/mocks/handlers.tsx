// src/mocks/handlers.js
import user from './actions/user';
import auth from './actions/auth';
import projects from './actions/projects';

export const handlers = [...user, ...auth, ...projects];
