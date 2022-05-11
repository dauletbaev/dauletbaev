import { FastifyPluginAsync } from 'fastify';
import { responseSchema } from '../schemas/root.schema';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', { schema: responseSchema }, async (request, reply) => ({
    ok: true,
    timestamp: new Date().toISOString(),
  }));
};

export default root;
