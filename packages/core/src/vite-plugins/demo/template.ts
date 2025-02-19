
export function createDemoHTML(componentFiles: Record<string, string>) {
    const translations = {
        ar: {
            toggleTheme: 'تبديل المظهر',
            toggleLang: 'English',
            dir: 'rtl',
            lang: 'ar'
        },
        en: {
            toggleTheme: 'Toggle Theme',
            toggleLang: 'العربية',
            dir: 'ltr',
            lang: 'en'
        }
    };

    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Twilight Components</title>
    <script>window.customComponents = ${JSON.stringify(Object.values(componentFiles))};</script>
    <script type="module" src="https://cdn.salla.network/js/twilight/2.14.65/twilight.esm.js"></script>
    <script type="module" src="http://localhost:5500/packages/core/dist/twilight-bundles.js" demo-mode></script>
    <link rel="stylesheet" href="https://cdn.salla.network/fonts/pingarlt.css">
    <style>
        :root {
            --font-main: "PingARLT";
            --primary-400: 220 38% 47%;
            --primary-force: 0 0% 100%;
        }
        
        body {
            font-family: var(--font-main), system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
            background: #f8f9fa;
            color: #2c3e50;
            font-size: 15px;
        }

        .nav {
            background: white;
            padding: 0.75rem 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 10;
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
        }

        .nav-btn {
            background: hsl(var(--primary-400));
            color: hsl(var(--primary-force));
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-family: var(--font-main);
            font-size: 0.875rem;
            transition: opacity 0.2s;
        }

        .nav-btn:hover {
            opacity: 0.9;
        }

        .components-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .component-section {
            margin-bottom: 2rem;
        }
        
        .component-header {
            background: white;
            padding: 0.75rem 1rem;
            border-radius: 6px 6px 0 0;
            border: 1px solid #edf2f7;
            border-bottom: none;
        }
        
        .component-name {
            margin: 0;
            font-size: 0.875rem;
            color: #64748b;
            font-weight: 500;
        }
        
        .component-preview {
            background: white;
            padding: 2rem;
            border-radius: 0 0 6px 6px;
            border: 1px solid #edf2f7;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100px;
        }

        html.dark {
            color-scheme: dark;
        }

        html.dark body {
            background: #1a1a1a;
            color: #e5e5e5;
        }

        html.dark .nav,
        html.dark .component-header,
        html.dark .component-preview {
            background: #242424;
            border-color: #333;
        }

        html.dark .component-name {
            color: #94a3b8;
        }
    </style>
</head>
<body>
    <nav class="nav">
        <button class="nav-btn" onclick="document.documentElement.classList.toggle('dark')">
            ${translations.ar.toggleTheme}
        </button>
        <button class="nav-btn" onclick="toggleLanguage()">
            ${translations.ar.toggleLang}
        </button>
    </nav>

    <div class="components-container">
        ${Object.entries(componentFiles).map(([name]) => `
            <section class="component-section">
                <div class="component-header">
                    <h3 class="component-name">${name}</h3>
                </div>
                <div class="component-preview">
                    <salla-custom-component component-name="${name}"></salla-custom-component>
                </div>
            </section>
        `).join('')}
    </div>

    <script>
        function toggleLanguage() {
            const html = document.documentElement;
            const isArabic = html.lang === 'ar';
            const newLang = isArabic ? 'en' : 'ar';
            const newDir = isArabic ? 'ltr' : 'rtl';
            
            html.lang = newLang;
            html.dir = newDir;
            
            const btn = document.querySelector('.nav-btn:last-child');
            btn.textContent = isArabic ? '${translations.en.toggleLang}' : '${translations.ar.toggleLang}';
        }
    </script>

    <script type="module">
        ${Object.entries(componentFiles).map(([, path]) => `import '${path}';`).join('\n        ')}
    </script>
</body>
</html>`;
}
