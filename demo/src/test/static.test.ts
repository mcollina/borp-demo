import { test } from 'node:test'
import assert from 'node:assert'
import { build } from '../lib/app.js'
import Snap from '@matteo.collina/snap'

const snap = Snap(import.meta.url)

test('serve static files', async () => {
  const app = await build()
  const response = await app.inject({
    method: 'GET',
    url: '/public/file.txt'
  })
  assert.strictEqual(response.statusCode, 200)
  assert.strictEqual(response.payload, await snap(response.payload))
})
