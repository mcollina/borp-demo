import { test, describe } from 'node:test'
import { strictEqual } from 'node:assert'
import { setTimeout as sleep } from 'node:timers/promises'

test('suite', async () => {
  await test('synchronous passing test', (t) => {
    strictEqual(1, 1)
  })

  await test('asynchronous passing test', async (t) => {
    await sleep(1)
    strictEqual(1, 1)
  })
})
