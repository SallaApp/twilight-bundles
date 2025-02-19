export function createDemoHTML(componentFiles: string[]) {
    const translations = {
        ar: {
            title: 'معرض مكونات سلة',
            subtitle: 'عرض تفاعلي للمكونات المخصصة',
            components: 'المكونات',
            toggleTheme: 'تبديل المظهر',
            toggleLang: 'English',
            dir: 'rtl',
            lang: 'ar'
        },
        en: {
            title: 'Salla Components Demo',
            subtitle: 'Interactive preview of your custom components',
            components: 'Components',
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
    <title>Salla Components Demo</title>

    <script type="importmap">
    {
      "imports": {
        "lit": "https://cdn.jsdelivr.net/npm/lit@3.1.0/index.js",
        "lit/": "https://cdn.jsdelivr.net/npm/lit@3.1.0/",
        "lit-html": "https://cdn.jsdelivr.net/npm/lit-html@3.1.0/lit-html.js",
        "lit-html/": "https://cdn.jsdelivr.net/npm/lit-html@3.1.0/",
        "lit-html/is-server.js": "https://cdn.jsdelivr.net/npm/lit-html@3.1.0/is-server.js",
        "lit-html/directives/": "https://cdn.jsdelivr.net/npm/lit-html@3.1.0/directives/",
        "lit-element": "https://cdn.jsdelivr.net/npm/lit-element@4.0.0/lit-element.js",
        "lit-element/": "https://cdn.jsdelivr.net/npm/lit-element@4.0.0/",
        "lit-element/lit-element.js": "https://cdn.jsdelivr.net/npm/lit-element@4.0.0/lit-element.js",
        "@lit/reactive-element": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@2.0.0/reactive-element.js",
        "@lit/reactive-element/": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@2.0.0/"
      }
    }
    </script>
    <script>window.customComponents = ${JSON.stringify(componentFiles)};</script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/lit@3.1.0/index.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/lit@3.1.0/decorators.js"></script>
    <script type="module" src="https://cdn.salla.network/js/twilight/2.14.65/twilight.esm.js"></script>
    <script type="module" src="http://localhost:5500/packages/core/dist/twilight-bundles.js" demo-mode></script>
    <link rel="stylesheet" href="https://cdn.salla.network/fonts/pingarlt.css">
    <style>
        :root {
            --font-main: "PingARLT";
            --font-base: 15px;

            --primary: 189 100% 18%;
            --primary-force: 189 100% 18%;
            --primary-100: 189 39% 75%;
            --primary-200: 188 38% 66%;
            --primary-300: 188 38% 54%;
            --primary-400: 189 50% 41%;
            --primary-500: 189 100% 18%;
            --primary-600: 189 100% 15%;
            --primary-700: 189 100% 14%;

            --secondary: 166 71% 69%;
            --secondary-100: 166 69% 94%;
            --secondary-200: 166 71% 91%;
            --secondary-300: 167 71% 89%;
            --secondary-400: 166 70% 84%;
            --secondary-500: 166 71% 76%;
            --secondary-600: 166 71% 68%;
            --secondary-700: 166 36% 45%;

            --success: 157 100% 34%;
            --success-100: 158 59% 87%;
            --success-200: 157 63% 75%;
            --success-300: 157 59% 69%;
            --success-400: 157 56% 57%;
            --success-500: 157 63% 46%;
            --success-600: 157 100% 27%;
            --success-700: 157 100% 21%;

            --info: 214 87% 64%;
            --info-100: 215 89% 93%;
            --info-200: 214 86% 89%;
            --info-300: 214 87% 85%;
            --info-400: 215 87% 78%;
            --info-500: 214 87% 71%;
            --info-600: 215 55% 52%;
            --info-700: 214 52% 40%;

            --warning: 34 100% 63%;
            --warning-100: 34 100% 93%;
            --warning-200: 34 100% 89%;
            --warning-300: 34 100% 85%;
            --warning-400: 34 100% 78%;
            --warning-500: 34 100% 71%;
            --warning-600: 34 63% 52%;
            --warning-700: 34 60% 40%;

            --danger: 358 89% 64%;
            --danger-100: 358 89% 93%;
            --danger-200: 358 89% 89%;
            --danger-300: 357 89% 85%;
            --danger-400: 358 89% 78%;
            --danger-500: 358 89% 71%;
            --danger-600: 358 56% 52%;
            --danger-700: 358 53% 41%;

            --gray: 0 0% 73%;
            --gray-100: 0 0% 99%;
            --gray-200: 0 0% 97%;
            --gray-250: 0 0% 96%;
            --gray-300: 0 0% 93%;
            --gray-400: 0 0% 87%;

            --dark: 0 0% 20%;
            --dark-100: 0 0% 60%;
            --dark-200: 0 0% 40%;
            --dark-300: 0 0% 27%;

            --white: 0 0% 100%;
            --black: 0 0% 0%;
        }
        
        body {
            font-family: var(--font-main), system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
            background-color: hsl(var(--gray-100));
            color: hsl(var(--dark));
            font-size: var(--font-base);
            transition: background-color 0.3s ease;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem;
            background: hsl(var(--white));
            border-radius: 1rem;
            box-shadow: 0 1px 3px hsla(var(--dark) / 0.1);
            position: relative;
        }
        
        .header h1 {
            color: hsl(var(--primary));
            margin: 0;
            font-size: 2.5rem;
            font-weight: 700;
            letter-spacing: -0.025em;
        }
        
        .header p {
            color: hsl(var(--dark-100));
            margin: 1rem 0 0;
            font-size: 1.125rem;
        }

        .theme-toggle {
            position: absolute;
            top: 1rem;
            background: hsl(var(--primary));
            border: none;
            padding: 0.5rem 1.25rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-family: var(--font-main);
            font-size: 0.875rem;
            color: hsl(var(--white));
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .theme-toggle:hover {
            background: hsl(var(--primary-600));
        }

        .theme-toggle:active {
            background: hsl(var(--primary-700));
        }

        .theme-toggle svg {
            width: 1rem;
            height: 1rem;
            fill: currentColor;
        }

        html.dark .theme-toggle {
            background: hsl(var(--primary-400));
            color: hsl(var(--primary-force));
        }

        .theme-toggle .light-icon {
            display: block;
        }

        .theme-toggle .dark-icon {
            display: none;
        }

        html.dark .theme-toggle .light-icon {
            display: none;
        }

        html.dark .theme-toggle .dark-icon {
            display: block;
        }

        html.dark .theme-toggle:hover {
            background: hsl(var(--primary-300));
        }

        html.dark .theme-toggle:active {
            background: hsl(var(--primary-200));
        }

        .lang-toggle {
            position: absolute;
            top: 1rem;
            background: hsl(var(--primary));
            border: none;
            padding: 0.5rem 1.25rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-family: var(--font-main);
            font-size: 0.875rem;
            color: hsl(var(--white));
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        html.dark .lang-toggle {
            background: hsl(var(--primary-400));
            color: hsl(var(--primary-force));
        }

        .lang-toggle:hover {
            background: hsl(var(--primary-600));
        }

        html.dark .lang-toggle:hover {
            background: hsl(var(--primary-300));
        }

        .lang-toggle:active {
            background: hsl(var(--primary-700));
        }

        html.dark .lang-toggle:active {
            background: hsl(var(--primary-200));
        }

        .components-section {
            margin-bottom: 3rem;
        }

        .section-title {
            font-size: 1.5rem;
            color: hsl(var(--dark));
            margin-bottom: 1.5rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .section-title::before {
            content: '';
            display: block;
            width: 4px;
            height: 1.5rem;
            background: hsl(var(--primary));
            border-radius: 2px;
        }
        
        .component-card {
            background: hsl(var(--white));
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 1px 3px hsla(var(--dark) / 0.1);
            border: 1px solid hsl(var(--gray-300));
            transition: all 0.2s ease;
            margin-bottom: 1.5rem;
        }

        .component-card:hover {
            box-shadow: 0 4px 6px hsla(var(--dark) / 0.1);
            transform: translateY(-2px);
        }
        
        .component-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid hsl(var(--gray-300));
        }

        .component-icon {
            width: 2.5rem;
            height: 2.5rem;
            background: hsl(var(--primary));
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: hsl(var(--white));
            font-weight: 600;
            font-size: 1.25rem;
        }

        html.dark .component-icon {
            background: hsl(var(--primary-400));
            color: hsl(var(--primary-force));
        }

        .component-title {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: hsl(var(--dark));
        }

        .component-subtitle {
            margin: 0.25rem 0 0;
            font-size: 0.875rem;
            color: hsl(var(--dark-100));
            direction: ltr;
        }

        .component-preview {
            padding: 1.5rem;
            background: hsl(var(--gray-100));
            border-radius: 0.75rem;
            border: 1px dashed hsl(var(--gray-300));
        }

        html.dark {
            --primary: 166 70% 84%;
            --primary-force: 189 100% 18%;
            --primary-100: 189 100% 18%;
            --primary-200: 189 100% 15%;
            --primary-300: 189 100% 14%;
            --primary-400: 189 50% 41%;
            --primary-500: 189 39% 75%;
            --primary-600: 188 38% 66%;
            --primary-700: 188 38% 54%;

            --gray: 0 0% 73%;
            --gray-100: 210 4% 22%;
            --gray-200: 225 4% 20%;
            --gray-250: 225 4% 20%;
            --gray-300: 228 3% 28%;
            --gray-400: 0 0% 87%;

            --dark: 0 0% 90%;
            --dark-100: 0 0% 60%;
            --dark-200: 0 0% 70%;
            --dark-300: 0 0% 80%;

            --white: 0 0% 100%;
            --white-100: 220 3% 17%;
            --white-200: 220 3% 17%;
            --white-300: 220 5% 12%;
            --black: 0 0% 90%;
        }

        html.dark body {
            background-color: hsl(var(--gray-100));
        }

        html.dark .component-card,
        html.dark .header {
            background: hsl(var(--white-100));
        }

        html.dark .component-preview {
            background: hsl(var(--gray-200));
            border-color: hsl(var(--gray-300));
        }

        html.dark .header h1 {
            color: hsl(var(--primary-400));
        }

        html.dark .section-title::before {
            background: hsl(var(--primary-400));
        }

        /* RTL Support */
        html[dir="ltr"] .theme-toggle {
            left: 1rem;
            right: auto;
        }

        html[dir="rtl"] .theme-toggle {
            right: 1rem;
            left: auto;
        }

        html[dir="ltr"] .lang-toggle {
            right: 1rem;
            left: auto;
        }

        html[dir="rtl"] .lang-toggle {
            left: 1rem;
            right: auto;
        }

        .component-subtitle {
            direction: ltr;
            text-align: start;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <button class="theme-toggle" onclick="toggleTheme()">
                <svg class="light-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"/>
                </svg>
                <svg class="dark-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.94174 4 12Z"/>
                </svg>
                <span class="theme-text">تبديل المظهر</span>
            </button>
            <button class="lang-toggle" onclick="toggleLang()">English</button>
            <h1 class="title">معرض مكونات سلة</h1>
            <p class="subtitle">عرض تفاعلي للمكونات المخصصة</p>
        </header>

        <section class="components-section">
            <h2 class="section-title">المكونات</h2>
            ${componentFiles.map(file => {
                const componentName = file.split('/').slice(-2)[0];
                const displayName = componentName
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                const initials = displayName
                    .split(' ')
                    .map(word => word.charAt(0))
                    .join('')
                    .slice(0, 2);
                
                return `
            <div class="component-card">
                <div class="component-header">
                    <div class="component-icon">${initials}</div>
                    <div>
                        <h3 class="component-title">${displayName}</h3>
                        <p class="component-subtitle">salla-${componentName}</p>
                    </div>
                </div>
                <div class="component-preview">
                    <salla-custom-component component-name="${componentName}"></salla-custom-component>
                </div>
            </div>`;
            }).join('')}
        </section>
    </div>
    <script>
        const translations = ${JSON.stringify(translations)};
        
        function updateContent(lang) {
            const t = translations[lang];
            document.documentElement.lang = t.lang;
            document.documentElement.dir = t.dir;
            document.querySelector('.title').textContent = t.title;
            document.querySelector('.subtitle').textContent = t.subtitle;
            document.querySelector('.section-title').textContent = t.components;
            document.querySelector('.theme-text').textContent = t.toggleTheme;
            document.querySelector('.lang-toggle').textContent = t.toggleLang;
        }

        function toggleLang() {
            const currentLang = document.documentElement.lang;
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            localStorage.setItem('lang', newLang);
            updateContent(newLang);
        }

        function toggleTheme() {
            const html = document.documentElement;
            const isDark = html.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            document.querySelector('.light-icon').style.display = isDark ? 'none' : 'block';
            document.querySelector('.dark-icon').style.display = isDark ? 'block' : 'none';
        }

        // Initialize theme and language from localStorage
        const savedTheme = localStorage.getItem('theme');
        const savedLang = localStorage.getItem('lang') || 'ar';

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.querySelector('.light-icon').style.display = 'none';
            document.querySelector('.dark-icon').style.display = 'block';
        } else {
            document.querySelector('.light-icon').style.display = 'block';
            document.querySelector('.dark-icon').style.display = 'none';
        }

        updateContent(savedLang);
    </script>
</body>
</html>`;
}
