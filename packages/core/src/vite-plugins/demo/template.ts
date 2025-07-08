const bundlesUrl = process.env.TWILIGHT_BUNDLES_URL || 'https://cdn.salla.network/js/twilight-bundles/latest/twilight-bundles.js';
const formBuilderMockUrl = process.env.TWILIGHT_FORM_BUILDER_MOCK_BASE_URL
? process.env.TWILIGHT_FORM_BUILDER_MOCK_BASE_URL + '/store/v1/form-builder-mock'
: 'https://api.salla.dev/store/v1/form-builder-mock';

export interface DemoTemplateOptions {
  grid: {
    columns: string;
    gap: string;
    minWidth: string;
  };
  css: string;
  js: string;
  formbuilder:{
    languages:string[],
    defaultLanguage:'ar' | 'en' | string,
  }
}

function htmlSafeString(str: string) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

export function createDemoHTML(
    components: Array<{name:string,path:string,url:string,schema:string}>,
    options: DemoTemplateOptions
) {
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

  const formbuilderAssets = [
    'https://cdn.assets.salla.network/prod/admin/cp/assets/css/icons/sallaicons/style.css?v0.21-languages2',
    'https://cdn.assets.salla.network/prod/admin/vendor/form-builder/form-builder.a58a1e74d158c6a9cd3aeffe2feb6674.css',
    'https://cdn.assets.salla.network/prod/admin/vendor/theme-dashboard/form-builder-theme.198b7a49c2f8cc9bae22de21569b1f42.css'
  ];

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${translations.ar.title}</title>
    <script>
    localStorage.setItem('FormBuilder::debugger', 1);
    window.customComponents = ${JSON.stringify(components.map(component => component.url))};
    window.customComponentsSchema = ${JSON.stringify(Object.fromEntries(components.map(component => [component.name, component.schema])))};
    function schemaForComponent(componentName){
    if(localStorage.getItem('form-builder::'+componentName)){
      return htmlSafeString(localStorage.getItem('form-builder::'+componentName));
    }
      
      return htmlSafeString(window.customComponentsSchema[componentName]);
    }
    function getComponentData(componentName){
      return htmlSafeString(localStorage.getItem('form-builder::data_' + componentName));
    }
    function htmlSafeString(str) {
        return str?.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')||'';
    }
    
    window.addEventListener('FormBuilder::form-builder-3::request-success',async ({detail:payload}) => {
      const ignoredKeys = ['static-', '$','twilight-bundles-component-name'];
      const data = Object.fromEntries(
        Object.entries(payload).filter(([key]) => !ignoredKeys.some(ignoredKey=>key.startsWith(ignoredKey)))
      );
      const componentName = payload['twilight-bundles-component-name'];
      Salla.storage.set('form-builder::data_' + componentName, data);
      if (componentName && window.customComponentsSchema && window.customComponentsSchema[componentName]) {
        // Inject the data into the schema
        const schema = window.customComponentsSchema[componentName];
        await fetch('${formBuilderMockUrl}/schema-injector', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ schema, data }),
        }).then(res=>res.json())
        .then(data=>Salla.storage.set('form-builder::'+componentName, data))
        .then(()=>window.location.reload())
        .catch(err=>console.error('Error injecting data into schema:', err));
      }
    });
    </script>
    <link rel="icon" type="image/png" media="(prefers-color-scheme: light)" href="https://cdn.salla.network/images/logo/logo-square.png" />
    <link rel="icon" type="image/png" media="(prefers-color-scheme: dark)" href="https://cdn.salla.network/images/logo/logo-light-square.png" />
    <script type="module" src="https://cdn.salla.network/js/twilight/latest/twilight.esm.js" async></script>
    <script type="module" src="${bundlesUrl}" demo-mode defer></script>
    <link rel="stylesheet" href="https://cdn.salla.network/fonts/pingarlt.css">
    <link rel="stylesheet" href="https://cdn.salla.network/fonts/sallaicons.css?v=2.0.5">
    
    <!-- Preload form builder resources for faster loading -->
    
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

      .component-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.75rem;
      }

      .component-card-header h2 {
        color: var(--component-title);
        font-size: 1.125rem;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .component-card-header h2 i {
        font-size: 1.25rem;
      }

      .component-settings-btn {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      }

      .component-settings-btn:hover {
        background-color: var(--bg-secondary);
        color: var(--text-primary);
      }

      /* Drawer styles */
      .drawer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }

      .drawer-overlay.active {
        opacity: 1;
        visibility: visible;
      }

      .drawer {
        position: fixed;
        top: 0;
        bottom: 0;
        background-color: var(--bg-primary);
        width: 400px;
        max-width: 90%;
        z-index: 1000;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        overflow-y: auto;
      }

      [dir="ltr"] .drawer {
        right: 0;
        transform: translateX(100%);
      }

      [dir="rtl"] .drawer {
        left: 0;
        transform: translateX(-100%);
      }

      .drawer.active {
        transform: translateX(0);
      }

      .drawer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
      }

      .drawer-header h3 {
        margin: 0;
        color: var(--text-primary);
      }

      .drawer-close {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .drawer-content {
        padding: 1rem;
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
          ${components.map(component => `
            <div class="component-card" data-component="${component.name}">
              <div class="component-card-header">
                <h2>
                  <i class="sicon-tag"></i>
                  ${component.name}
                </h2>
                <button class="component-settings-btn" aria-label="Open settings"
                data-component="${component.name}"
                data-schema="${htmlSafeString(component.schema)}">
                  <i class="sicon-settings"></i>
                </button>
              </div>
              <div demo-component="${component.name}"></div>
            </div>
          `)
            .join('')}
        </div>
      </div>
    </main>
    
    <!-- Drawer overlay -->
    <div class="drawer-overlay" id="drawerOverlay"></div>
    
    <!-- Component settings drawer -->
    <div class="drawer" id="componentDrawer">
      <div class="drawer-header">
        <h3 id="drawerTitle">Component Settings</h3>
        <button class="drawer-close" id="drawerClose">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
      </div>
      <div class="drawer-content" id="drawerContent">
        <!-- Content will be dynamically populated -->
      </div>
    </div>
    
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

      // Event listeners for theme and language toggles
      toggleTheme.addEventListener('click', () => {
        updateTheme(currentTheme === 'light' ? 'dark' : 'light');
      });

      toggleLang.addEventListener('click', () => {
        updateLanguage(currentLang === 'ar' ? 'en' : 'ar');
      });
      
      // Drawer functionality
      const drawer = document.getElementById('componentDrawer');
      const drawerOverlay = document.getElementById('drawerOverlay');
      const drawerClose = document.getElementById('drawerClose');
      const drawerTitle = document.getElementById('drawerTitle');
      const drawerContent = document.getElementById('drawerContent');
      const settingsButtons = document.querySelectorAll('.component-settings-btn');
      
      // Function to open drawer
      function openDrawer(componentName, schema) {
        // Inject form builder script if it's not loaded yet
        if (!document.getElementById('form-builder-3-script')) {
          const script = document.createElement('script');
          script.id = 'form-builder-3-script';
          script.src = 'https://cdn.assets.salla.network/themes/default/temporary/form-builder-3.js';
          script.async = true;
          document.head.appendChild(script);
        }
        
        drawerTitle.textContent = componentName + ' Demo Config';
        drawer.classList.add('active');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if(drawer.currentComponent === componentName){
            return;
        }
        drawer.currentComponent = componentName;
        
        // Populate drawer content based on the component
        // This is a placeholder that mimics the schema form rendering
        drawerContent.innerHTML = schema
        ? \`
            <form-builder-3
             form-key="form-builder-3"
             form-data='\${schemaForComponent(componentName)}'
             save-url="${formBuilderMockUrl}"
             sources-url="${formBuilderMockUrl}/sources"
             upload-url="${formBuilderMockUrl}/uploader"
             direction="v"
             button="start"
             css-url="${formbuilderAssets.join(',')}
             language-list="${options.formbuilder.languages.join(',')}"
             default-language="${options.formbuilder.defaultLanguage}"
             submit-label="حفظ التغييرات"
             modify-upload="true"></form-builder-3>
        \`
        : \`<div style="padding: 2rem; text-align: center; color: #666;">
            <div style="margin-bottom: 1rem;">
              <i class="sicon-info" style="font-size: 3rem; color: #2377CD;"></i>
            </div>
            <h3 style="margin-bottom: 1rem; font-weight: 500;">لا توجد إعدادات لهذا العنصر</h3>
            <p>يمكن إضافة إعدادات لهذا العنصر في ملف</p>
            <a href="/twilight-bundle.json" target="_blank">twilight-bundle.json</a>
          </div>\`;
      }
      
      // Function to close drawer
      function closeDrawer() {
        drawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      // Add click event listeners to settings buttons
      settingsButtons.forEach(button => {
        button.addEventListener('click', () => {
          openDrawer(button.getAttribute('data-component'), button.getAttribute('data-schema'));
        });
      });
      
      // Close drawer when clicking close button or overlay
      drawerClose.addEventListener('click', closeDrawer);
      drawerOverlay.addEventListener('click', closeDrawer);
      (async () => {
        async function waitForCondition(callback, timeout, interval) {
        const start = Date.now();

        while (Date.now() - start < timeout) {
            if (callback()) {
            return true;
            }
            console.log('waiting for window.Salla.onReady...'+(Date.now() - start));
            await new Promise((resolve) => setTimeout(resolve, interval));
        }

        return false;
        }
            await waitForCondition(()=>window.Salla && window.Salla.onReady, 10000, 50);
            window.Salla.onReady(()=>{
                Salla.lang.setLocale(currentLang);  
                document.querySelectorAll('[demo-component]').forEach(component => {
                    const componentName = component.getAttribute('demo-component');
                    const config = getComponentData(componentName);
                    component.outerHTML = \`<salla-custom-component \${config?'config="'+config+'"':''} component-name="\${componentName}"></salla-custom-component>\`;
                });
            });
            })();

    </script>
    <style>${options.css}</style>
    <script>${options.js}</script>
  </body>
</html>`
}
