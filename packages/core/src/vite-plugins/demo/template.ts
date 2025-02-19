export interface DemoTemplateOptions {
  grid: {
    columns: string;
    gap: string;
    minWidth: string;
  };
  css: string;
  js: string;
}

export function createDemoHTML(componentFiles: Record<string, string>, options: DemoTemplateOptions) {
  const translations = {
    ar: {
      toggleTheme: 'تغيير المظهر',
      toggleLang: 'English',
      dir: 'rtl',
      lang: 'ar',
      title: 'حزم العناصر'
    },
    en: {
      toggleTheme: 'Toggle Theme',
      toggleLang: 'Arabic',
      dir: 'ltr',
      lang: 'en',
      title: 'Twilight Bundles'
    }
  };

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${translations.ar.title}</title>
    <script>window.customComponents = ${JSON.stringify(Object.values(componentFiles))};</script>
    <link rel="icon" type="image/png" media="(prefers-color-scheme: light)" href="https://cdn.salla.network/images/logo/logo-square.png" />
    <link rel="icon" type="image/png" media="(prefers-color-scheme: dark)" href="https://cdn.salla.network/images/logo/logo-light-square.png" />
    <script type="module" src="https://cdn.salla.network/js/twilight/2.14.65/twilight.esm.js"></script>
    <script type="module" src="http://localhost:5500/packages/core/dist/twilight-bundles.js" demo-mode></script>
    <link rel="stylesheet" href="https://cdn.salla.network/fonts/pingarlt.css">
    <style>
      :root {
        --font-main: "PingARLT";
        --primary-50: 186 243 230;  /* #BAF3E6 */
        --primary-100: 120 232 206; /* #78E8CE */
        --primary-900: 0 73 86;     /* #004956 */
        --header-bg: #004e5c;
      }

      :root[data-theme="dark"] {
        --bg-primary: #1E1E1E;
        --bg-secondary: #2A2A2A;
        --text-primary: #FFFFFF;
        --text-secondary: #9CA3AF;
        --border-color: #333333;
        --header-bg: #1d1e20;
        --component-title: #baf3e5;
      }

      :root[data-theme="light"] {
        --bg-primary: #FFFFFF;
        --bg-secondary: #F8F9FA;
        --text-primary: #1E1E1E;
        --text-secondary: #4B5563;
        --border-color: #E5E7EB;
        --component-title: #004e5c;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: var(--font-main);
      }

      body {
        min-height: 100vh;
        background-color: var(--bg-secondary);
      }

      header {
        background-color: var(--header-bg);
        padding: 0.75rem 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 0.75rem;
      }

      .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .logo-container {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .logo {
        height: 40px;
      }

      .logo img {
        height: 100%;
        width: auto;
      }

      .title {
        color: white;
        font-size: 1.25rem;
        font-weight: 500;
        margin: 0;
      }

      .actions {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .actions button {
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: color 0.2s ease;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .actions button:hover {
        color: rgb(var(--primary-100));
      }

      .theme-icon {
        transition: transform 0.3s ease;
      }

      [data-theme="dark"] .theme-icon.moon {
        display: none;
      }

      [data-theme="light"] .theme-icon.sun {
        display: none;
      }

      .lang-icon {
        transition: transform 0.3s ease;
      }

      [dir="rtl"] .lang-icon {
        transform: scaleX(-1);
      }

      .lang-code {
        font-size: 0.875rem;
        font-weight: 500;
        text-transform: uppercase;
      }

      main {
        padding: 1.5rem 0;
      }

      .components-grid {
        display: grid;
        grid-template-columns: ${options.grid.columns};
        gap: ${options.grid.gap};
        margin-top: 0;
      }

      @media (max-width: ${options.grid.minWidth}) {
        .components-grid {
          grid-template-columns: 1fr;
        }
      }

      .component-card {
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 0.75rem;
      }

      .component-card > h2 {
        color: var(--component-title);
        font-size: 1.125rem;
        margin: 0 0 0.75rem;
      }
    </style>
  </head>
  <body>
    <header>
      <div class="container">
        <div class="header-content">
          <div class="logo-container">
            <div class="logo">
              <img src="https://cdn.salla.network/images/logo/logo-light-wide.png" alt="Salla">
            </div>
            <h1 class="title" id="pageTitle">${translations.ar.title}</h1>
          </div>
          <div class="actions">
            <button id="toggleTheme" title="Toggle theme">
              <svg class="theme-icon moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
              <svg class="theme-icon sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2"/>
                <path d="M12 20v2"/>
                <path d="m4.93 4.93 1.41 1.41"/>
                <path d="m17.66 17.66 1.41 1.41"/>
                <path d="M2 12h2"/>
                <path d="M20 12h2"/>
                <path d="m6.34 17.66-1.41 1.41"/>
                <path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            </button>
            <button id="toggleLang" title="Toggle language">
              <svg class="lang-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                <path d="M2 12h20"/>
              </svg>
              <span class="lang-code">EN</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="components-grid">
          ${Object.entries(componentFiles)
            .map(([name]) => `
            <div class="component-card">
              <h2>${name}</h2>
              <salla-custom-component component-name="${name}"></salla-custom-component>
            </div>
          `)
            .join('')}
        </div>
      </div>
    </main>
    <script>
      const translations = ${JSON.stringify(translations)};
      const toggleTheme = document.getElementById('toggleTheme');
      const toggleLang = document.getElementById('toggleLang');
      
      // Get stored preferences or use defaults
      let currentLang = localStorage.getItem('salla_demo_lang') || 'ar';
      let currentTheme = localStorage.getItem('salla_demo_theme') || 'light';

      // Function to update language
      function updateLanguage(lang) {
        currentLang = lang;
        const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('lang', currentLang);
        document.documentElement.setAttribute('dir', dir);
        localStorage.setItem('salla_demo_lang', currentLang);
        
        // Update language code and title
        const langCode = toggleLang.querySelector('.lang-code');
        const pageTitle = document.getElementById('pageTitle');
        langCode.textContent = currentLang === 'ar' ? 'EN' : 'AR';
        pageTitle.textContent = translations[currentLang].title;
      }

      // Function to update theme
      function updateTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('salla_demo_theme', currentTheme);
      }

      // Initialize with stored or default values
      updateLanguage(currentLang);
      updateTheme(currentTheme);

      // Event listeners
      toggleTheme.addEventListener('click', () => {
        updateTheme(currentTheme === 'light' ? 'dark' : 'light');
      });

      toggleLang.addEventListener('click', () => {
        updateLanguage(currentLang === 'ar' ? 'en' : 'ar');
      });
    </script>
    <style>${options.css}</style>
    <script>${options.js}</script>
  </body>
</html>`
}
