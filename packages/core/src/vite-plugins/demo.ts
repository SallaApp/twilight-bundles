import { Plugin } from 'vite';
import { configureDemoServer } from './demo/server';

interface DemoPluginOptions {
    componentsGlob?: string;
    port?: number;
    host?: string;
}

export function sallaDemoPlugin(options: DemoPluginOptions = {}): Plugin {
    const {
        componentsGlob = 'src/components/*/index.ts',
        port = 5173,
        host = 'localhost'
    } = options;

    return {
        name: 'salla-component-demo',
        enforce: 'pre' as const,
        configureServer(server) {
            server.middlewares.use(configureDemoServer({ componentsGlob }));
        },
        config(config) {
            return {
                ...config,
                server: {
                    ...config.server,
                    port,
                    host
                }
            };
        }
    };
}
