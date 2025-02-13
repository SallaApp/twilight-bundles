import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SallaTwilightBundles',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: 'twilight-bundles.js',
        dir: 'dist'
      }
    },
    target: 'esnext',
    sourcemap: true
  }
});
