# @salla.sa/twilight-bundles-starter-kit

A minimal starter kit for building custom Salla components using Lit.

## Features

- **Vite**: Fast development with HMR and optimized builds
- **Lit**: Modern, lightweight web components
- **TypeScript**: Type-safe component development
- **ESLint & Prettier**: Code quality and formatting
- **Import Maps**: CDN-based dependency management

## Getting Started

1. Clone and install dependencies:

```bash
# Clone the repository
git clone https://github.com/SallaApp/twilight-bundles.git

# Navigate to starter-kit
cd twilight-bundles/packages/starter-kit

# Install dependencies
pnpm install
```

2. Start development:

```bash
pnpm dev
```

3. Build for production:

```bash
pnpm build
```

## Project Structure

```
src/
├── components/         # Your custom components
│   ├── product-card/  # Example component
│   │   └── index.ts
│   └── table-list/    # Example component
│       └── index.ts
└── types/             # TypeScript type definitions
    └── index.ts
```

## Creating Components

1. Create a new component directory:

```bash
mkdir src/components/my-component
```

2. Create your component:

```typescript
// src/components/my-component/index.ts
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class MyComponent extends LitElement {
    @property({ type: Object }) settings: {name: string} = { name: 'Default Name'};

  render() {
    return html`
      <div>
        <h1>Hello, ${this.settings.name}!</h1>
      </div>
    `;
  }
}
```

## Development Notes

This starter kit is intentionally minimal to help you get started quickly. While testing is important for production components, we've omitted it here to keep the setup simple and focused on the basics.

### Future Improvements

1. **Testing**: Add testing infrastructure
   - Unit tests with Vitest
   - Component testing with Testing Library
   - E2E tests with Playwright

2. **Documentation**: Add comprehensive docs
   - Component API documentation
   - Usage examples
   - Best practices

3. **Features**:
   - Storybook integration
   - Visual regression testing
   - Performance monitoring

## License

MIT
