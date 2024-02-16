import { test, describe } from 'node:test'
import { equal, deepEqual } from 'node:assert/strict'
import { build } from '../lib/app.js'
import Snap from '@matteo.collina/snap'

const snap = Snap(import.meta.url)

describe('root endpoint', () => {
  test('/', async (t) => {
    const app = await build()
    t.after(() => app.close())
    const res = await app.inject({
      url: '/',
    })
    equal(res.statusCode, 200)
    deepEqual(res.json(), {
      hello: 'world'
    })
  })

  test('snapshot testing', async (t) => {
    const app = await build()
    t.after(() => app.close())
    const res = await app.inject({
      url: '/',
    })
    equal(res.statusCode, 200)
    deepEqual(res.payload, await snap(res.payload))
  })
})
