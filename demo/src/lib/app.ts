import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import fastifyAutoload from '@fastify/autoload'
import { join } from 'path'

type AppOptions = fastify.FastifyServerOptions & {
  targetUrl?: string;
}

export async function build (opts: AppOptions = {}) {
  const app = fastify(opts)

  app.register(fastifyStatic, {
    root: join(import.meta.dirname, '..', '..', 'public'),
    prefix: '/public/',
  })

  app.register(fastifyAutoload, {
    dir: join(import.meta.dirname, 'routes'),
    options: { targetUrl: opts.targetUrl }
  })

  app.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  return app
}
