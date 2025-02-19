import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        'twilight-bundles': resolve(__dirname, 'src/index.ts'),
        'vite-plugins/index': resolve(__dirname, 'vite-plugins.ts'),
        'vite-plugins/build': resolve(__dirname, 'src/vite-plugins/build.ts'),
        'vite-plugins/demo': resolve(__dirname, 'src/vite-plugins/demo.ts'),
        'vite-plugins/transform': resolve(__dirname, 'src/vite-plugins/transform.ts')
      },
      formats: ['es', 'cjs']
    },
    rollupOptions: {
        external: [/^lit/, 'fs', 'path', 'glob'],
        output: {
            globals: {
                lit: 'lit',
                'lit-element': 'litElement',
                'lit-html': 'litHtml',
            },
            sourcemap: true,
            dir: 'dist',    
        },
    }
  },
});
