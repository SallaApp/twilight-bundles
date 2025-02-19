//@ts-nocheck
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
      // components: ['product-card', 'scroll-top'],
      
      // Customize the demo grid layout
      grid: {
        // Use 3 equal-width columns
        columns: 'repeat(3, 1fr)',
        // Increase gap between components
        gap: '1.5rem',
        // Responsive breakpoint
        minWidth: '768px'
      },

      // Add custom CSS
      css: '.component-card { box-shadow: 0 2px 4px rgba(0,0,0,0.1); }',

      // Add custom JavaScript
      js: 'console.log("Demo page loaded!");'
    }),
  ]
});
