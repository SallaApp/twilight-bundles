import { Plugin } from 'vite';

interface TransformPluginOptions {
    pattern?: RegExp;
}

function transformComponent(code: string, id: string, pattern: RegExp) {
    const match = pattern.exec(id);

    if (!match?.groups) {
        return null;
    }

    const { componentName } = match.groups;
    const className = componentName
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

    return {
        code: `${code}
            
            // Auto-register the component
            customElements.define('salla-${componentName}', ${className});`,
        map: null
    };
}

export function sallaTransformPlugin(options: TransformPluginOptions = {}): Plugin {
    const {
        pattern = /^.*\/(?<componentDir>components)\/(?<componentName>[^/]+)\/index\.ts$/
    } = options;

    return {
        name: 'salla-component-transform',
        enforce: 'pre' as const,
        transform(code: string, id: string) {
            return transformComponent(code, id, pattern);
        }
    };
}
