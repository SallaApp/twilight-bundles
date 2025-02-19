# @salla.sa/twilight-bundles

Core package for building and developing custom Salla components using Lit.

## Features

- **Vite Plugins**: A collection of plugins to streamline component development
  - `sallaBuildPlugin`: Handles bundling and optimization of components
  - `sallaDemoPlugin`: Provides a development server with hot reloading
  - `sallaTransformPlugin`: Automatically registers components with proper naming

- **Base Components**: Foundational components and utilities
  - `SallaBaseComponent`: Base class for all Salla components with shared functionality

## Installation

```bash
pnpm add @salla.sa/twilight-bundles
```

## Usage

1. Import and use the Vite plugins in your `vite.config.ts`:

```typescript
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
    
    // Build plugin for bundling and optimization
    sallaBuildPlugin({
      outDir: 'dist',
      componentsGlob: 'src/components/*/index.ts'
    }),
    
    // Demo plugin for development server
    sallaDemoPlugin({
      port: 5173,
      host: 'localhost'
    })
  ]
});
```

2. Extend `SallaBaseComponent` in your components:

```typescript
import { SallaBaseComponent } from '@salla.sa/twilight-bundles';

export class MyComponent extends SallaBaseComponent {
  // Your component code here
}
```

## Development

This package is intentionally kept minimal to focus on the core functionality needed for component development. While testing is important for production components, we've omitted it here to keep the setup simple and easy to understand.

### Future Improvements

1. **Testing**: Add comprehensive test suite
   - Unit tests for plugins and base components
   - Integration tests for component lifecycle
   - E2E tests for development workflow

2. **Documentation**: Expand documentation
   - API reference
   - Plugin configuration options
   - Best practices and examples

3. **Features**:
   - Component scaffolding tools
   - Performance optimization utilities
   - Development tools and debugging helpers

## License

MIT
