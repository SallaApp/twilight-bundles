import { Plugin } from 'vite';
import { createDemoHTML } from './demo/template';
import { configureDemoServer } from './demo/server';
import { findComponentFiles } from './build';
import * as fs from 'fs';
import * as path from 'path';

interface DemoPluginOptions {
    componentsGlob?: string;
    port?: number;
    host?: string;
}

function cleanupDemoFile(filePath: string) {
    if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('Removed auto-generated demo file:', filePath);
    }
}

export function sallaDemoPlugin(options: DemoPluginOptions = {}): Plugin {
    const { componentsGlob = 'src/components/*/index.ts' } = options;
    let demoPath: string | undefined;

    return {
        name: 'salla-component-demo',
        enforce: 'pre' as const,

        configResolved(config) {
            // If open option is provided, ignore creating a demo page
            if (config.server?.open) {
                return;
            }

            const componentFiles = findComponentFiles(componentsGlob);
            const demoBasePath = '.salla-temp'
            const tempDir = path.resolve(process.cwd(), 'node_modules', demoBasePath);

            // Create temp directory if it doesn't exist
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }

            demoPath = path.resolve(tempDir, 'index.html');

            // Create demo.html in temp directory
            fs.writeFileSync(demoPath, createDemoHTML(componentFiles));

            // Setup cleanup handlers
            const cleanup = () => {
                cleanupDemoFile(demoPath!);
                // Try to remove the temp directory
                try {
                    fs.rmdirSync(tempDir);
                } catch (e) {
                    // Ignore errors if directory is not empty
                }
            };

            process.on('SIGINT', cleanup);  // Ctrl+C
            process.on('SIGTERM', cleanup); // Kill
            process.on('exit', cleanup);    // Normal exit

            // Update server config to open our demo page
            config.server.open = `/node_modules/${demoBasePath}/index.html`;
        },

        configureServer(server) {
            // Only use demo server middleware if we created the demo page
            // if (demoPath) {
            //     server.middlewares.use(configureDemoServer({ componentsGlob }));
            // }
        },

        config(config) {
            return {
                ...config,
                server: {
                    ...config.server,
                    port: options.port,
                    host: options.host
                }
            };
        },

        closeBundle() {
            // Clean up the auto-generated demo file after build
            cleanupDemoFile(demoPath!);

            // Try to remove the temp directory
            const tempDir = path.resolve(process.cwd(), 'node_modules/.salla-temp');
            try {
                fs.rmdirSync(tempDir);
            } catch (e) {
                // Ignore errors if directory is not empty
            }
        }
    };
}
