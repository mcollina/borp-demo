import { test } from 'node:test'
import { notEqual } from 'node:assert/strict'

test('foo is not bar', (t) => {
  notEqual('foo', 'bar')
})
