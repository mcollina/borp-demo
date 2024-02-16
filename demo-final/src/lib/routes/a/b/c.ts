import type { FastifyInstance } from 'fastify';

type CTypes = {
  targetUrl: string;
}

export default async function (app: FastifyInstance, opts: CTypes) {
  app.get('/', async (request, reply) => {
    return { hello: 'from c' }
  })

  app.get('/c', async (request, reply) => {
    return fetch(opts.targetUrl)
  })

}

