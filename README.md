# Salla Twilight Bundles Monorepo

This monorepo contains the core SDK and starter kit for building custom Salla components using Twilight Bundles.

## Repository Structure

```
@salla.sa/twilight-bundles/
├── packages/
│   ├── core/             # Core SDK package
│   └── starter-kit/      # Template project for new components
```

## Packages

### Core (@salla.sa/twilight-bundles)
The core SDK package provides the foundation for building custom Salla components. It includes:
- Core utilities and base classes
- Vite plugin for bundle building
- Type definitions and interfaces

### Starter Kit (@salla.sa/twilight-bundles-starter-kit)
A template project that helps you get started with building custom Salla components. It includes:
- Project structure and configuration
- Example components
- Testing setup
- Development environment

## Development

### Prerequisites
- Node.js >= 16.0.0
- pnpm >= 9.0.0

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Common Commands
- `pnpm dev`: Start development mode for all packages
- `pnpm build`: Build all packages
- `pnpm test`: Run tests for all packages
- `pnpm lint`: Run linting for all packages
- `pnpm format`: Format code in all packages

## License
MIT
