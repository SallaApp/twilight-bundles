import { glob } from 'glob';
import { resolve } from 'path';
import type { Plugin } from 'vite';

export type { Plugin };

interface SallaComponentPluginOptions {
    pattern?: RegExp;
    componentsGlob?: string;
    outDir?: string;
}

export default function sallaComponentPlugin(options: SallaComponentPluginOptions = {}): Plugin | any {
    // Workaround for ESM/CJS interop
    if ((sallaComponentPlugin as any).default) {
        return (sallaComponentPlugin as any).default(options);
    }

    const {
        pattern = /^.*\/(?<componentDir>components)\/(?<componentName>[^/]+)\/index\.ts$/,
        componentsGlob = 'src/components/*/index.ts',
        outDir = 'dist'
    } = options;

    const wantedObject: Plugin = {
        name: 'salla-component-plugin',
        enforce: 'pre' as const,
        
        config(config) {
            // Find all component entry points
            const entries = {};
            const componentFiles = glob.sync(componentsGlob, {
                cwd: process.cwd()
            });

            componentFiles.forEach(file => {
                const componentName = file.split('/')[2];
                entries[componentName] = resolve(process.cwd(), file);
            });

            // Configure build options
            return {
                build: {
                    lib: {
                        formats: ['es'],
                        entry: entries,
                        fileName: (format, entryName) => `${entryName}.js`
                    },
                    outDir,
                    emptyOutDir: false,
                    rollupOptions: {
                        external: [/^lit/, 'lit', 'lit-element', 'lit-html'],
                        output: {
                            globals: {
                                lit: 'lit',
                                'lit-element': 'litElement',
                                'lit-html': 'litHtml'
                            }
                        }
                    }
                }
            };
        },

        transform(code, id) {
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
    };

    return wantedObject;
};