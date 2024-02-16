import { test, describe} from 'node:test'
import { equal } from 'node:assert/strict'
import { build } from '../lib/app.js'

describe('static file serving', () => {
  test('/public/file.txt', async (t) => {
    const app = await build()
    t.after(() => app.close())
    const res = await app.inject({
      url: '/public/file.txt',
    })
    equal(res.statusCode, 200)
    equal(res.payload, 'hello\n')
  })
})
