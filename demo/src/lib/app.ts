import Fastify from 'fastify'
import type { FastifyServerOptions } from 'fastify'
import fastifyStatic from '@fastify/static'
import { join } from 'path'

type AppOpts = FastifyServerOptions & {
  targetUrl?: string
}

export async function build (opts: AppOpts = {}) {
  const app = Fastify(opts)

  app.register(fastifyStatic, {
    root: join(import.meta.dirname, '..', '..', 'public'),
    prefix: '/public/'
  })

  app.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  app.get('/target', async (request, reply) => {
    return fetch(opts.targetUrl || 'http://localhost:3000')
  })

  return app
}
