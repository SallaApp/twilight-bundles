# @salla.sa/twilight-bundles

A powerful SDK for developing custom web components for the Salla platform. This package provides the core functionality and tools needed to create, test, and build Salla-compatible web components using modern web technologies.

## Features

- **Modern Development Stack**: Built with Vite, TypeScript, and Lit
- **Vite Plugin**: Automated component processing and registration
- **Web Components**: Create reusable, encapsulated components
- **Development Tools**: Hot Module Replacement and instant feedback
- **Optimized Builds**: ESM and CJS output with tree-shaking
- **Salla Integration**: Seamless integration with Salla's component system

## Installation

```bash
pnpm add @salla.sa/twilight-bundles
```

## Usage

### 1. Configure Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import sallaComponentPlugin from '@salla.sa/twilight-bundles/vite-plugin';

export default defineConfig({
  plugins: [
    sallaComponentPlugin()
  ]
});
```

### 2. Create a Component

```typescript
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class TableList extends LitElement {
    @property({ type: Object })
    settings: {
        items: Array<{
            id: string | number;
            title: string;
            description?: string;
        }>;
    } = {
        items: []
    };

    static styles = css`
        .table-list {
            width: 100%;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
    `;

    render() {
        return html\`
            <div class="table-list">
                \${this.settings.items.map(item => html\`
                    <div class="table-item">
                        <h3>\${item.title}</h3>
                        \${item.description ? html\`<p>\${item.description}</p>\` : ''}
                    </div>
                \`)}
            </div>
        \`;
    }
}
```

### 3. Use in HTML

```html
<salla-custom-component 
    component-name="table-list" 
    settings='{
        "items": [
            {
                "id": 1,
                "title": "Example Item",
                "description": "Optional description"
            }
        ]
    }'
></salla-custom-component>
```

## Features

### Vite Plugin Options

```typescript
interface SallaComponentPluginOptions {
    pattern?: RegExp;              // Custom component pattern
    componentsGlob?: string;       // Components glob pattern
    outDir?: string;              // Output directory
}
```

### Component Development

- **Auto Registration**: Components are automatically registered with the `salla-` prefix
- **Hot Reload**: Changes are reflected instantly during development
- **TypeScript Support**: Full TypeScript support with decorators
- **CSS-in-JS**: Scoped styles using Lit's css tag
- **ESM/CJS Support**: Dual module format support for maximum compatibility

## Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build package
pnpm build

# Run tests
pnpm test
```

## Requirements

- Node.js >= 16.0.0
- pnpm >= 9.0.0

## License

MIT 
