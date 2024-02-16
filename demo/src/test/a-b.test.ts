import { test, describe } from 'node:test'
import { equal, deepEqual } from 'node:assert/strict'
import { build } from '../lib/app.js'
import { tspl } from '@matteo.collina/tspl'
import type { Plan } from '@matteo.collina/tspl'
import Fastify from 'fastify'

describe('a/b', () => {
  test('/', async (t) => {
    const app = await build()
    t.after(() => app.close())
    const res = await app.inject({
      url: '/a/b',
    })
    equal(res.statusCode, 200)
    deepEqual(res.json(), {
      hello: 'from c'
    })
  })

  test('target', async (t) => {
    const plan: Plan = tspl(t, { plan: 1 })
    const target = Fastify()
    t.after(() => target.close())
    target.get('/', async (request, reply) => {
      plan.ok('target called')
      return { hello: 'from target' }
    })
    await target.listen({ port: 0 })
    const app = await build({
      targetUrl: target.listeningOrigin
    })
    t.after(() => app.close())
    const res = await app.inject({
      url: '/a/b/c'
    })
    equal(res.statusCode, 200)
    deepEqual(res.json(), {
      hello: 'from target'
    })

    // await plan.completed
  })
})
