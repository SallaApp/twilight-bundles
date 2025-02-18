import { Connect } from 'vite';
import { IncomingMessage, ServerResponse } from 'http';
import { createDemoHTML } from './template';
import { resolve } from 'path';
import * as fs from 'fs';

interface DemoServerOptions {
    componentsGlob: string;
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

export function configureDemoServer(options: DemoServerOptions): Connect.HandleFunction {
    return async (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
        if (req.url === '/') {
            const componentFiles = findComponentFiles(options.componentsGlob);
            const html = createDemoHTML(componentFiles);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
            return;
        }

        next();
    };
}
