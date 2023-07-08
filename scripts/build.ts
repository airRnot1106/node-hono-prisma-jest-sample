import path from 'path';
import { argv } from 'process';

import { build } from 'esbuild';
import { aliasPath } from 'esbuild-plugin-alias-path';

import type { BuildOptions } from 'esbuild';

const options: BuildOptions = {
  entryPoints: [path.resolve(__dirname, '../src/index.ts')],
  minify: argv[2] === 'production',
  bundle: true,
  target: 'es2015',
  platform: 'node',
  external: [],
  outfile: path.resolve(__dirname, '../dist/index.js'),
  plugins: [
    aliasPath({
      alias: {
        '@': path.resolve(__dirname, '../src'),
      },
    }),
  ],
};

build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
