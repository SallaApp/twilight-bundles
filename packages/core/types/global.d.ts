declare global {
    const Salla: {
        bundles: any;
        log: (...args: any[]) => void;
        event: {
            emit: (event: string, ...args: any[]) => void;
            on: (event: string, callback: (...args: any[]) => void) => void;
        };
        onReady: () => Promise<void>;
    };
    
    interface Window {
        customComponents?: string[];
    }
}
