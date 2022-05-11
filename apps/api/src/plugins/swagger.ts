import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';

/**
 * This plugins adds auto generated swagger documentation to the server
 *
 * @see https://github.com/fastify/fastify-swagger
 */
export default fp(async (fastify, opts) => {
  fastify.register(fastifySwagger, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0',
      },
      host: '127.0.0.1:3002',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      // tags: [
      //   { name: 'user', description: 'User related end-points' },
      //   { name: 'code', description: 'Code related end-points' },
      // ],
      // definitions: {
      //   User: {
      //     type: 'object',
      //     required: ['id', 'email'],
      //     properties: {
      //       id: { type: 'string', format: 'uuid' },
      //       firstName: { type: 'string' },
      //       lastName: { type: 'string' },
      //       email: { type: 'string', format: 'email' },
      //     },
      //   },
      // },

      // securityDefinitions: {
      //   apiKey: {
      //     type: 'apiKey',
      //     name: 'apiKey',
      //     in: 'header',
      //   },
      // },
    },
    uiConfig: {
      // docExpansion: 'full',
      deepLinking: false,
    },
    // uiHooks: {
    //   onRequest: function (request, reply, next) {
    //     next();
    //   },
    //   preHandler: function (request, reply, next) {
    //     next();
    //   },
    // },
    staticCSP: true,
    // transformStaticCSP: (header) => header,
    exposeRoute: true,
  });
});
