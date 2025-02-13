# @salla.sa/twilight-bundles

A powerful SDK for developing custom web components for the Salla platform. This package provides the core functionality and tools needed to create, test, and build Salla-compatible web components.

## Features

- **Base Components**: Ready-to-use base components with Salla integration
- **Vite Plugin**: Automated component processing and registration
- **Custom Component Wrapper**: Easy integration with Salla's component system
- **Development Tools**: Built-in utilities for development and testing
- **Build System**: Optimized component bundling for production

## Installation

```bash
pnpm add @salla.sa/twilight-bundles
```

## Core Components

### SallaBaseComponent

Base class for creating Salla-compatible web components:

```typescript
import { SallaBaseComponent } from '@salla.sa/twilight-bundles';

export class MyComponent extends SallaBaseComponent {
    static properties = {
        settings: { type: Object }
    };
}
```

### SallaCustomComponent

Wrapper component that loads and renders custom components:

```html
<salla-custom-component 
    component-name="my-component" 
    settings='{"prop": "value"}'
></salla-custom-component>
```

## Vite Plugin

The package includes a Vite plugin for processing Salla components:

```typescript
import sallaComponentPlugin from '@salla.sa/twilight-bundles/vite-plugin';

export default defineConfig({
  plugins: [
    sallaComponentPlugin({
      // Custom pattern for matching component files
      pattern: /^.*\/(?<componentDir>components)\/(?<componentName>[^/]+)\/index\.ts$/
    })
  ]
});
```

### Plugin Features

1. **Automatic Component Detection**:
   - Uses named capture groups to identify components
   - `componentDir`: Matches the components directory
   - `componentName`: Extracts the component name from folder

2. **Component Registration**:
   - Automatically adds the `salla-` prefix
   - Handles component registration code
   - Ensures unique component names

3. **Build Integration**:
   - Processes component files during build
   - Optimizes for production
   - Handles dependencies correctly

## Development Mode

The package provides development utilities:

```typescript
// Enable demo mode
<script type="module" src="node_modules/@salla.sa/twilight-bundles/dist/twilight-bundles.js" demo-mode></script>

// Configure components
window.customComponents = ['/src/components/my-component/index.ts'];
```

## Component Structure

Components should follow this structure:
```
src/
  components/
    my-component/
      index.ts         # Main component file
```

## API Reference

### SallaBaseComponent

Base component class with built-in features:

- `settings`: Component configuration object
- `registerSallaComponent()`: Register component with Salla
- `connectedCallback()`: Lifecycle hook for initialization
- `updated()`: Lifecycle hook for updates

### Vite Plugin Options

```typescript
interface PluginOptions {
  pattern?: RegExp;  // Custom pattern for component detection
}
```

### Global Utilities

Available through the global `Salla` object:

```typescript
Salla.onReady(() => {
  // Initialize after Salla is ready
});

Salla.log('message');      // Logging
Salla.success('message');  // Success notification
Salla.error('message');    // Error notification
```

## Best Practices

1. **Component Organization**
   - Use folder-based component structure
   - Follow naming conventions (`salla-` prefix)
   - Keep components focused and isolated

2. **Development**
   - Use TypeScript for type safety
   - Test in demo mode before production
   - Handle component lifecycle properly

3. **Building**
   - Use the provided Vite plugin
   - Follow the recommended build setup
   - Test built components before deployment

## Integration

Components built with this package can be:
1. Used directly in Salla stores
2. Integrated with Salla's component system
3. Loaded dynamically through the component loader

## Requirements

- Node.js >= 16.0.0
- pnpm >= 9.0.0 (recommended)

## License

MIT

## Support

For support and documentation:
- [Salla Documentation](https://docs.salla.dev)
- [Component Development Guide](https://docs.salla.dev/components)
