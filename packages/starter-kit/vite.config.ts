import { defineConfig } from 'vite';
import sallaComponentPlugin from '@salla.sa/twilight-bundles/vite-plugin';

export default defineConfig({
  plugins: [
    sallaComponentPlugin(),
  ],
  server: {
    port: 5173,
    open: '/src/demo.html',
    watch: {
      usePolling: true,
      interval: 100
    }
  }
});
