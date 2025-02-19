import { Plugin } from 'vite';
import { resolve } from 'path';
import * as fs from 'fs';

interface BuildPluginOptions {
    componentsGlob?: string;
    outDir?: string;
}

export function findComponentFiles(componentsGlob: string): string[] {
    const baseDir = process.cwd();
    const componentDir = resolve(baseDir, 'src/components');

    if (!fs.existsSync(componentDir)) {
        return [];
    }

    return fs.readdirSync(componentDir)
        .filter(file => fs.statSync(resolve(componentDir, file)).isDirectory())
        .map(dir => resolve(componentDir, dir, 'index.ts'))
        .filter(file => fs.existsSync(file));
}

export function sallaBuildPlugin(options: BuildPluginOptions = {}): Plugin {
    const {
        componentsGlob = 'src/components/*/index.ts',
        outDir = 'dist'
    } = options;

    return {
        name: 'salla-component-build',
        enforce: 'pre' as const,
        config(config) {
            return {
                ...config,
                build: {
                    //todo:: make sure to output using component names
                    lib: {
                        entry: findComponentFiles(componentsGlob),
                        formats: ['es'],
                        fileName: (_format, entryName) => `${entryName}.js`
                    },
                    outDir,
                    // emptyOutDir: false,
                    rollupOptions: {
                        external: [/^lit/],
                        output: {
                            globals: {
                                lit: 'lit',
                                'lit-element': 'litElement',
                                'lit-html': 'litHtml'
                            },
                        }
                    },
                    ...config.build,
                },
                optimizeDeps: {
                    include: [...(config.optimizeDeps?.include || []), 'lit', 'lit-element', 'lit-html'],
                    ...config.optimizeDeps,
                }
            };
        }
    };
}
