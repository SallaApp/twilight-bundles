import { Plugin } from 'vite';
import { resolve } from 'path';
import * as fs from 'fs';

interface BuildPluginOptions {
    componentsGlob?: string;
    outDir?: string;
}

function findComponentFiles(componentsGlob: string): string[] {
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
                    ...config.build,
                    lib: {
                        entry: findComponentFiles(componentsGlob),
                        formats: ['es'],
                        fileName: (format: string) => `[name].${format}.js`
                    },
                    rollupOptions: {
                        external: ['lit', 'lit-element', 'lit-html'],
                        output: {
                            dir: outDir,
                            preserveModules: true,
                            preserveModulesRoot: 'src'
                        }
                    }
                },
                optimizeDeps: {
                    ...config.optimizeDeps,
                    include: [...(config.optimizeDeps?.include || []), 'lit', 'lit-element', 'lit-html']
                }
            };
        }
    };
}
