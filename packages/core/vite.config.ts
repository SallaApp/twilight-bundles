import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        'twilight-bundles': resolve(__dirname, 'src/index.ts'),
        'vite-plugin': resolve(__dirname, 'vite-plugin.ts')
      },
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vite', 'path', 'glob'],
      output: {
        sourcemap: true,
        dir: 'dist'
      }
    },
    target: 'esnext'
  }
});
