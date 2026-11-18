import Fastify, { FastifyInstance } from 'fastify';
import eventsRoutes from './routes/events';

const fastify: FastifyInstance = Fastify({
  logger: true
});

async function registerPlugins() {
  await fastify.register(import('@fastify/helmet'));
  await fastify.register(import('@fastify/cors'), {
    origin: true
  });
  await fastify.register(import('@fastify/rate-limit'), {
    max: 100,
    timeWindow: '1 minute'
  });
}

async function registerRoutes() {
  await fastify.register(eventsRoutes, { prefix: '/api' });
}

fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

const start = async (): Promise<void> => {
  try {
    await registerPlugins();
    await registerRoutes();
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info('Server listening on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

if (require.main === module) {
  start();
}

export { fastify, start };