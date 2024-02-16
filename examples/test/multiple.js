import { test } from 'node:test'
import { strictEqual } from 'node:assert'
import { setTimeout as sleep } from 'node:timers/promises'

test('synchronous passing test', (t) => {
  strictEqual(1, 1)
})

test('synchronous failing test', { only: true }, (t) => {
  strictEqual(1, 2)
})

test('asynchronous passing test', async (t) => {
  await sleep(1)
  strictEqual(1, 1)
})

test('asynchronous failing test', async (t) => {
  await sleep(1)
  strictEqual(1, 2)
})
