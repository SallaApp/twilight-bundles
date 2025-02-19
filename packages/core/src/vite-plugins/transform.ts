import { Plugin } from 'vite';

function transformComponent(code: string, id: string, pattern: RegExp) {
    const match = id.match(pattern);
    if (!match) {
        return null;
    }

    // Extract component name from the class definition
    const classMatch = code.match(/class\s+(\w+)/i);
    if (!classMatch) {
        return null;
    }

    const className = classMatch[1];
    // Extract component name with fallback to path-based extraction
    const componentName = match.groups?.componentName || id.split('/')[id.split('/').indexOf('components') + 1];
    const prefix = componentName.substring(0, 6).toLowerCase() === 'salla-' ? '' : 'salla-';

    // Add component registration code
    const transformedCode = `${code}
if (typeof ${className} !== 'undefined') {${className}.registerSallaComponent('${prefix + componentName}');}`;
    return { code: transformedCode };
}

export function sallaTransformPlugin(): Plugin {
    const pattern = /^.*\/(?<componentDir>components)\/(?<componentName>[^/]+)\/index\.ts$/;

    return {
        name: 'salla-component-transform',
        enforce: 'pre' as const,
        transform(code: string, id: string) {
            return transformComponent(code, id, pattern);
        }
    };
}
