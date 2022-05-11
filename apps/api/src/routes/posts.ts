import { FastifyPluginAsync } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';

const post = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    content: { type: 'string' },
  },
  required: ['title', 'content'],
} as const;

const posts: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{
    Body: FromSchema<typeof post>;
    Reply: FromSchema<typeof post>;
  }>(
    '/post',
    {
      schema: {
        body: post,
        response: { 200: post },
      },
    },
    async (request, reply) => {
      const { title, content } = request.body;

      // TODO: Content should be sanitized (IMPORTANT)

      const post = await fastify.prisma.post.create({
        data: {
          title,
          content,
          published: false,
          authorId: 1,
        },
      });

      console.log(post);

      return request.body;
    }
  );

  fastify.put<{ Params: { id: string } }>(
    '/publish/:id',
    async (request, reply) => {
      const id = parseFloat(request.params.id);

      if (!id) {
        return { ok: false, message: 'Invalid parameter' };
      }

      const post = await fastify.prisma.post.update({
        where: { id },
        data: { published: true },
      });

      return post;
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    '/user/:id',
    async (request, reply) => {
      const id = parseFloat(request.params.id);

      if (!id) {
        return { ok: false, message: 'Invalid parameter' };
      }

      const user = await fastify.prisma.user.delete({
        where: { id },
      });

      return user;
    }
  );
};

export default posts;
