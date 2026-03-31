import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../../src/server/trpc/root';

export const config = { runtime: 'nodejs' };

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
    onError({ error, path }) {
      console.error(`tRPC error on '${path}':`, error);
    },
  });

export default handler;
