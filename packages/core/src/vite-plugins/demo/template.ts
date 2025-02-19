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
      }

      :root[data-theme="light"] {
        --bg-primary: #FFFFFF;
        --bg-secondary: #F8F9FA;
        --text-primary: #1E1E1E;
        --text-secondary: #4B5563;
        --border-color: #E5E7EB;
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
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .logo {
        height: 40px;
      }

      .logo img {
        height: 100%;
        width: auto;
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
        justify-content: center;
      }

      .actions button:hover {
        color: rgb(var(--primary-100));
      }

      main {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .components-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }

      .component-card {
        background: var(--bg-primary);
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        color: var(--text-primary);
      }

      .component-card h2 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 1.1rem;
      }
    </style>
  </head>
  <body>
    <header>
      <div class="logo">
        <img src="https://cdn.salla.network/images/logo/logo-light-wide.png" alt="Salla">
      </div>
      <div class="actions">
        <button id="toggleTheme" title="Toggle theme">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        </button>
        <button id="toggleLang" title="Toggle language">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m5 8 6 6"/>
            <path d="m4 14 6-6 2-3"/>
            <path d="M2 5h12"/>
            <path d="M7 2h1"/>
            <path d="m22 22-5-10-5 10"/>
            <path d="M14 18h6"/>
          </svg>
        </button>
      </div>
    </header>
    <main>
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
    </main>
    <script>
      const toggleTheme = document.getElementById('toggleTheme');
      const toggleLang = document.getElementById('toggleLang');
      let currentLang = 'ar';
      let currentTheme = 'light';

      // Initialize theme
      document.documentElement.setAttribute('data-theme', currentTheme);

      toggleTheme.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
      });

      toggleLang.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('lang', currentLang);
        document.documentElement.setAttribute('dir', dir);
      });
    </script>
    <script type="module">
      ${Object.entries(componentFiles).map(([, path]) => `import '${path}';`).join('\n        ')}
    </script>
  </body>
</html>`
}
