# Salla Twilight Bundles Starter Kit

A starter kit for building custom Salla components using the `@salla.sa/twilight-bundles` package. This template provides everything you need to start developing beautiful, reusable components for Salla stores.

## Features

- 🚀 **Modern Stack**: Built with Vite, TypeScript, and Lit
- 🎯 **Component Architecture**: Organized structure under `src/components/`
- 🔥 **Hot Reload**: Instant feedback during development
- 🎨 **Auto Registration**: Components auto-register with `salla-` prefix
- 📦 **Optimized Builds**: Individual component builds with tree-shaking
- 🧪 **Testing Ready**: Set up for unit testing with Vitest

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build components
pnpm build
```

## Project Structure

```
.
├── src/
│   ├── components/           # Component directories
│   │   ├── product-card/    # Example product card component
│   │   │   └── index.ts
│   │   └── table-list/      # Example table list component
│   │       └── index.ts
│   └── demo.html            # Development demo page
├── dist/                    # Built components
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

## Component Examples

### Product Card Component

```typescript
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export default class ProductCard extends LitElement {
    @property({ type: Object })
    settings = {
        title: 'Product Name',
        price: '$99.99',
        image: 'https://placehold.co/200x200',
        discount: '-20%'
    };

    static styles = css`
        .product-card {
            width: 250px;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
    `;

    render() {
        return html`
            <div class="product-card">
                <img src="${this.settings.image}" alt="${this.settings.title}">
                <h3>${this.settings.title}</h3>
                <div class="price">${this.settings.price}</div>
            </div>
        `;
    }
}
```

### Using Components

```html
<!-- In your HTML -->
<salla-custom-component 
    component-name="product-card" 
    settings='{
        "title": "Awesome Product",
        "price": "$129.99",
        "image": "product.jpg",
        "discount": "-20%"
    }'
></salla-custom-component>

<salla-custom-component 
    component-name="table-list" 
    settings='{
        "items": [
            {
                "id": 1,
                "title": "List Item",
                "description": "Item description"
            }
        ]
    }'
></salla-custom-component>
```

## Development

### Starting the Dev Server

```bash
pnpm dev
```

This will:
1. Start the Vite dev server
2. Open the demo page in your browser
3. Enable hot module replacement
4. Auto-register your components

### Building Components

```bash
pnpm build
```

This will:
1. Compile TypeScript
2. Bundle components
3. Generate optimized builds
4. Output to `dist/` directory

## Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## Requirements

- Node.js >= 16.0.0
- pnpm >= 9.0.0

## License

MIT 
