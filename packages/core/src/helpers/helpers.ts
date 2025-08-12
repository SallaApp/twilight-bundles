declare global {
    interface Window {
        Salla: any;
        salla: any;
        customComponents: string[];
        System: {
            import(moduleId: string): Promise<any>;
        };
    }
    const Salla: any;
    const salla: any;
}


export default class Helpers {
    static onBundlesReady() {
        return Helpers.makeSureSallaIsReady()
            .then(() => Salla.event.onlyWhen('twilight-bundles::initiated'));
    }

    static async initializeSalla() {
        if (Salla.status === 'ready') {
            salla.log('Salla is ready');
            return;
        }
        // Get the current script element
        const currentScript = document.currentScript || document.querySelector('script[src*="twilight-bundles.js"]');

        // Access the data attributes
        const demo = currentScript?.hasAttribute('demo-mode');
        let storeId = currentScript?.getAttribute('store-id');
        let config = JSON.parse(currentScript?.getAttribute('config') || 'false');
        // const components = currentScript?.getAttribute('components')?.split(',') || [];

        if (demo || config || storeId) {
            storeId = storeId || '1510890315';
            config = config || await Helpers.getStoreSettings(storeId);
            return Salla.init(config || {
                "debug": true,
                "store": { "id": storeId }
            });
        }
        return Salla.onReady();
    }

    static async getStoreSettings(storeId: string) {
        let settings = Salla.storage.session.get(`store-settings-${storeId}`);
        if (settings) {
            return settings;
        }
        settings = (await fetch('https://api.salla.dev/store/v1/store/settings', { 'headers': { 'store-identifier': storeId } }).then(res => res.json())).data;
        Salla.storage.session.set(`store-settings-${storeId}`, settings);
        return settings;
    }

    static makeSureSallaIsReady() {
        if (window.Salla) {
            return Promise.resolve(Helpers.initializeSalla());
        }

        return new Promise<void>((resolve, reject) => {
            let intervalId: number;
            const timeoutId = setTimeout(() => {
                window.clearInterval(intervalId);
                reject(new Error('Timeout: Salla object not found after 10 seconds'));
            }, 10000);

            intervalId = window.setInterval(() => {
                if (window.Salla) {
                    window.clearInterval(intervalId);
                    clearTimeout(timeoutId);
                    resolve(Helpers.initializeSalla());
                }
            }, 50);
        });
    }
}
