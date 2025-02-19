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
            
            /* Light theme (default) */
            --primary-100: 255 255 255;  /* #FFFFFF */
            --primary-200: 248 249 250;  /* #F8F9FA */
            --primary-300: 229 231 235;  /* #E5E7EB */
            --primary-900: 0 131 143;    /* #00838F */
            --text-primary: 30 30 30;    /* #1E1E1E */
            --text-secondary: 75 85 99;  /* #4B5563 */
            --bg-primary: 255 255 255;   /* #FFFFFF */
            --bg-secondary: 248 249 250; /* #F8F9FA */
            --border-color: 229 231 235; /* #E5E7EB */
        }

        /* Dark theme */
        [data-theme="dark"] {
            --primary-100: 30 30 30;     /* #1E1E1E */
            --primary-200: 42 42 42;     /* #2A2A2A */
            --primary-300: 51 51 51;     /* #333333 */
            --primary-900: 122 235 205;  /* #7AEBCD */
            --text-primary: 255 255 255; /* #FFFFFF */
            --text-secondary: 156 163 175; /* #9CA3AF */
            --bg-primary: 30 30 30;      /* #1E1E1E */
            --bg-secondary: 42 42 42;    /* #2A2A2A */
            --border-color: 51 51 51;    /* #333333 */
        }
        
        body {
            font-family: var(--font-main), system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
            background: rgb(var(--bg-primary));
            color: rgb(var(--text-primary));
            font-size: 15px;
        }

        .nav {
            background: rgb(var(--bg-primary));
            padding: 1rem 1.5rem;
            border-bottom: 1px solid rgb(var(--border-color));
            position: sticky;
            top: 0;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-brand {
            display: flex;
            align-items: center;
            gap: 1rem;
            text-decoration: none;
            color: rgb(var(--text-primary));
        }

        .nav-logo {
            height: 32px;
            width: auto;
        }

        .nav-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0;
        }

        .nav-actions {
            display: flex;
            gap: 0.5rem;
        }

        .nav-btn {
            background: rgb(var(--primary-900));
            color: rgb(var(--bg-primary));
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s ease;
        }

        .nav-btn:hover {
            opacity: 0.9;
        }

        .components {
            padding: 1.5rem;
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            background: rgb(var(--bg-secondary));
            min-height: calc(100vh - 64px);
        }

        .component-card {
            background: rgb(var(--bg-primary));
            border: 1px solid rgb(var(--border-color));
            border-radius: 0.5rem;
            padding: 1rem;
            transition: all 0.2s ease;
        }

        .component-card:hover {
            border-color: rgb(var(--primary-900));
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .component-name {
            margin: 0;
            font-size: 0.875rem;
            color: rgb(var(--text-secondary));
            font-weight: 500;
        }
    </style>
</head>
<body data-theme="light">
    <nav class="nav">
        <a class="nav-brand" href="https://salla.dev">
            <img class="nav-logo" src="https://cdn.prod.website-files.com/63fe4a8108c3c17052878ef9/640478698a898d54481ea309_Group%2059.svg" alt="Salla Logo">
            <span class="nav-title">Salla Twilight Bundles</span>
        </a>
        <div class="nav-actions">
            <button class="nav-btn" onclick="document.documentElement.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')">
                ${translations.ar.toggleTheme}
            </button>
            <button class="nav-btn" onclick="toggleLanguage()">
                ${translations.ar.toggleLang}
            </button>
        </div>
    </nav>

    <div class="components">
        ${Object.entries(componentFiles).map(([name]) => `
            <div class="component-card">
                <h3 class="component-name">${name}</h3>
                <salla-custom-component component-name="${name}"></salla-custom-component>
            </div>
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
