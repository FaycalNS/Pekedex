import { setupServer } from 'msw/node';
import { handlers as graphqlHandlers } from './handlers';
import { restHandlers } from './rest-handlers';

export const server = setupServer(
  ...graphqlHandlers,
  ...restHandlers
);