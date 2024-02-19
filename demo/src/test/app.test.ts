import { test } from 'node:test'
import assert from 'node:assert'
import { build } from '../lib/app.js'
import Fastify from 'fastify'
import { tspl } from '@matteo.collina/tspl'
import type { Plan } from '@matteo.collina/tspl'

test('root endpoint', async () => {
  const app = await build()
  const response = await app.inject({
    method: 'GET',
    url: '/'
  })
  assert.strictEqual(response.statusCode, 200)
  assert.deepStrictEqual(response.json(), { hello: 'world' })
})

test('target endpoint', async (t) => {
  const plan: Plan = tspl(t, { plan: 1 })
  const target = Fastify()
  t.after(() => target.close())
  target.get('/', async (request, reply) => {
    plan.ok('target called')
    return 'fastify'
  })
  await target.listen({ port: 0 })
  const app = await build({ targetUrl: target.listeningOrigin })
  const response = await app.inject({
    method: 'GET',
    url: '/target'
  })
  assert.strictEqual(response.statusCode, 200)
  assert.strictEqual(response.payload, 'fastify')
  await plan.completed
})
