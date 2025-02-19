//@ts-nochecks
import { defineConfig } from 'vite';
import { 
  sallaBuildPlugin, 
  sallaDemoPlugin, 
  sallaTransformPlugin 
} from '@salla.sa/twilight-bundles/vite-plugins';

export default defineConfig({
  plugins: [
    // Transform plugin for component registration
    sallaTransformPlugin(),
    
    // // Build plugin for bundling and optimization
    sallaBuildPlugin({
      outDir: 'dist',
      componentsGlob: 'src/components/*/index.ts'
    }),
    
    // // Demo plugin for development server
    sallaDemoPlugin({
      port: 5173,
      host: 'localhost'
    })
  ],
  server: {
    // open: '/src/demo.html',
    watch: {
      usePolling: true,
      interval: 100
    }
  }
});
