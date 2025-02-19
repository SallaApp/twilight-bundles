# Salla Twilight Bundles Starter Kit

This starter kit provides a foundation for building custom Twilight components for Salla's e-commerce platform. It includes a pre-configured build setup and development environment to help you get started quickly.

## Getting Started

1. Clone this repository
2. Remove the example components in `src/components/`
3. Create your own components in the `src/components/` directory
4. Run `pnpm install` to install dependencies
5. Run `pnpm run dev` to start the development server
6. Run `pnpm run build` to build your components for production

## Project Structure

```
src/
  components/
    your-component-name/
      index.ts        # Main component file
      styles.ts       # Component styles (optional)
      types.ts        # Component types (optional)
```

## Built-in Plugins

This starter kit includes three Vite plugins that handle the build process:

### 1. Transform Plugin (`sallaTransformPlugin`)
- Transforms component files to ensure proper naming and registration
- Matches components in `src/components/*/index.ts`
- To disable: Remove from `vite.config.ts` plugins array

### 2. Build Plugin (`sallaBuildPlugin`)
- Handles component bundling and output
- Creates individual files for each component in `dist/`
- Configures external dependencies (lit libraries)
- To customize: Remove from plugins array and configure your own build settings:
  ```typescript
  {
    build: {
      lib: {
        entry: {/* your entries */},
        formats: ['es'],
        fileName: (format, entryName) => `${entryName}.js`
      },
      rollupOptions: {
        external: [/^lit/],
        output: {/* your output config */}
      }
    }
  }
  ```

### 3. Demo Plugin (`sallaDemoPlugin`)
- Provides a development environment for testing components
- Creates a demo page with your components
- Configures hot module reloading
- To disable: Remove from plugins array and set up your own dev server

## Component Requirements

Each component should:
1. Be a class that extends `LitElement`
2. Export the class as default
3. Be placed in its own directory under `src/components/`
4. Have an `index.ts` as the entry point

Example:
```typescript
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class MyComponent extends LitElement {
  @property({ type: String })
  name = 'World';

  static styles = css`/* your styles */`;

  render() {
    return html`<div>Hello ${this.name}!</div>`;
  }
}
```

## Building for Production

Run `pnpm run build` to create production-ready bundles in the `dist/` directory. Each component will have its own file named after the component (e.g., `my-component.js`).

## Development

Run `pnpm run dev` to start the development server. This will:
1. Create a demo page with all your components
2. Enable hot module reloading
3. Provide a development environment for testing

## License

MIT
