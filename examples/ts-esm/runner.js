import { spec } from 'node:test/reporters';
import { run } from 'node:test'
import process from 'node:process';
import { glob } from 'glob'

process.env.NODE_OPTIONS = '--loader ts-node/esm'

const files = glob.sync('test/*.ts', { ignore: 'node_modules/**' });

run({ files, concurrency: true })
  .compose(spec)
  .pipe(process.stdout);
