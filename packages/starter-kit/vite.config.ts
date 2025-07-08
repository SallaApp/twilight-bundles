//@ts-nocheck
declare global {
    const Salla: any;
}
import { defineConfig } from 'vite';
import {
  sallaBuildPlugin,
  sallaDemoPlugin,
  sallaTransformPlugin,
} from '@salla.sa/twilight-bundles/vite-plugins';

export default defineConfig({
  plugins: [
    sallaTransformPlugin(),
    sallaBuildPlugin(),
    sallaDemoPlugin({
      // Uncomment to show only specific components
      // components: ['product-card', 'scroll-top']
    }),
  ]
});
