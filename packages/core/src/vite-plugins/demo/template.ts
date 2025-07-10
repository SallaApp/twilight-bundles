const bundlesUrl = process.env.TWILIGHT_BUNDLES_URL || 'https://cdn.salla.network/js/twilight-bundles/latest/twilight-bundles.js';
let formBuilderMockUrl = process.env.TWILIGHT_FORM_BUILDER_MOCK_BASE_URL ||  'https://salla.design';
formBuilderMockUrl = formBuilderMockUrl.replace(/\/$/, '') + '/api/v1/form-builder-mock';

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
      title: 'حزم العناصر',
      noSettings: 'لا توجد إعدادات لهذا العنصر',
      addSettings: 'إضافة إعدادات لهذا العنصر',
      saveSettings: 'حفظ التغييرات',
    },
    en: {
      toggleTheme: 'Toggle Theme',
      toggleLang: 'Arabic',
      dir: 'ltr',
      lang: 'en',
      title: 'Twilight Bundles',
      noSettings: 'No settings for this component',
      addSettings: 'Add settings for this component',
      saveSettings: 'Save changes',
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
    
    function renderComponent(componentName, existingComponent){
        if(Salla.storage.get('hidden-salla-components', []).includes(componentName)){
            return;
        }
        const tempDom = document.createElement('div');
        const config = getComponentData(componentName);
        tempDom.innerHTML=\`<div class="component-card" data-component="\${componentName}">
            <div class="component-card-header">
                <h2>
                    <i class="sicon-tag"></i>
                    \${componentName}
                </h2>
                <div class="component-card-actions">
                    <button class="component-visibility-btn" aria-label="Toggle visibility" 
                        onclick="hideComponent('\${componentName}')" 
                        title="Hide component">
                            <i class="sicon-eye"></i>
                        </button>
                        <button class="component-settings-btn" aria-label="Open settings"
                        data-component="\${componentName}"
                        data-schema="\${config}">
                            <i class="sicon-settings"></i>
                        </button>
                    </div>
                </div>
                <salla-custom-component \${config?'config="'+config+'"':''} component-name="\${componentName}"></salla-custom-component>
            </div>
        </div>\`;
        tempDom.querySelector('.component-settings-btn').addEventListener('click', () => openDrawer(componentName));
        const componentsGrid = document.getElementById('componentsGrid');
        existingComponent
          ? componentsGrid.insertBefore(tempDom.firstElementChild, existingComponent.nextSibling)
          : componentsGrid.appendChild(tempDom.firstElementChild);
        tempDom.remove();
    }
        function reRenderComponent(componentName){
          const existingComponent = document.querySelector('.component-card[data-component="' + componentName + '"]');
          renderComponent(componentName, existingComponent);
          existingComponent.remove();
        }

    
    // Save component visibility to localStorage
    function hideComponent(componentName) {
      const hiddenComponents = Salla.storage.get('hidden-salla-components', []);
      if(!hiddenComponents?.includes(componentName)){
        hiddenComponents.push(componentName);
      }
      Salla.storage.set('hidden-salla-components', hiddenComponents);
      document.querySelector('.component-card[data-component="' + componentName + '"]')?.remove();
    }

    function showComponent(componentName) {
      let hiddenComponents = Salla.storage.get('hidden-salla-components', []);
      if(hiddenComponents.includes(componentName)){
        hiddenComponents = hiddenComponents.filter(component => component !== componentName);
      }
      Salla.storage.set('hidden-salla-components', hiddenComponents);
      renderComponent(componentName);
    }
    
    function toggleComponentVisibility(element) {
      const componentName = element.value;
      element.checked = Salla.storage.get('hidden-salla-components', []).includes(componentName);
      element.checked ?showComponent(componentName) : hideComponent(componentName);
    }

    function openFilterDrawer(){
      const componentsFilterDrawer = document.getElementById('componentsFilterDrawer');
      componentsFilterDrawer?.classList.add('active');
      componentsFilterDrawer?.querySelectorAll('.visibility-checkbox')
      .forEach(checkbox => checkbox.checked = !Salla.storage.get('hidden-salla-components', []).includes(checkbox.value));
      drawerOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
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
        .then(()=>reRenderComponent(componentName))
        .then(()=>closeDrawer())
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
        --color-primary-50: rgb(186, 243, 230);  /* #BAF3E6 */
        --color-primary-100: rgb(120, 232, 206); /* #78E8CE */
        --color-primary-900: rgb(0, 73, 86);     /* #004956 */
        --color-primary: rgb(0, 78, 92);
      }

      :root[data-theme="dark"] {
        --bg-primary: #1E1E1E;
        --bg-secondary: #2A2A2A;
        --text-primary: #FFFFFF;
        --text-secondary: #9CA3AF;
        --border-color: #333333;
        --color-primary: #1d1e20;
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
        background-color: var(--color-primary);
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
        color: rgb(var(--color-primary-100));
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

      .component-card-actions {
        display: flex;
        gap: 0.5rem;
      }
      
      .component-visibility-btn,
      .component-settings-btn {
        background: transparent;
        border: 1px solid var(--border-color);
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

      .component-visibility-btn:hover,
      .component-settings-btn:hover {
        background-color: var(--bg-secondary);
        color: var(--text-primary);
      }
      
      .component-card.hidden {
        opacity: 0.5;
        position: relative;
      }
      
      .component-card.hidden::after {
        content: "Hidden";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.1);
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--text-secondary);
        z-index: 10;
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
        opacity: 0;
        visibility: hidden;
      }
      .drawer.active {
        opacity: 1;
        visibility: visible;
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
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid var(--border-color);
        background-color: var(--bg-secondary);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      .drawer-header h3 {
        margin: 0;
        color: var(--text-primary);
        flex: 1;
        font-size: 1.25rem;
        font-weight: 600;
        letter-spacing: 0.01em;
      }
      
      .drawer-actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .drawer-close,
      .drawer-reset {
        background-color: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        cursor: pointer;
        font-size: 1.25rem;
        color: var(--text-secondary);
        padding: 0.5rem;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
      
      .drawer-close:hover,
      .drawer-reset:hover {
        background-color: var(--bg-secondary);
        color: var(--text-primary);
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .drawer-close:active,
      .drawer-reset:active {
        transform: translateY(0);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
      
      .drawer-reset {
        color: var(--color-primary);
      }
      
      .drawer-close {
        color: var(--color-danger, var(--text-secondary));
      }

      .drawer-content {
        padding: 1rem;
      }
      
      /* Filter drawer styles */
      .filter-actions {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      
      .btn {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;
      }
      
      .btn-primary {
        background-color: var(--color-primary-100);
        color: var(--color-primary-900);
      }
      
      .btn-primary:hover {
        background-color: var(--color-primary-50);
      }
      
      .btn-secondary {
        background-color: var(--bg-secondary);
        color: var(--text-primary);
        border: 1px solid var(--border-color);
      }
      
      .btn-secondary:hover {
        background-color: var(--bg-primary);
      }
      
      .component-visibility-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        overflow-y: auto;
      }
      
      .visibility-item {
        padding: 0.5rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
      }
      
      .visibility-item:hover {
        background-color: var(--bg-secondary);
      }
      
      .visibility-item label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        color: var(--text-primary);
      }
      
      .visibility-checkbox {
        width: 1.25rem;
        height: 1.25rem;
        cursor: pointer;
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
            <button id="toggleComponentsFilter" title="Filter components" onclick="openFilterDrawer()" class="sicon-filter"></button>
            <button id="toggleTheme" title="Toggle theme">
              <i class="theme-icon moon sicon-moon"></i>
              <i class="theme-icon sun sicon-lightbulb"></i>
            </button>
            <button id="toggleLang" title="Toggle language">
              <i class="lang-icon sicon-world"></i>
              <span class="lang-code">EN</span>
            </button>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="components-grid" id="componentsGrid"></div>
      </div>
    </main>
    
    <!-- Drawer overlay -->
    <div class="drawer-overlay" id="drawerOverlay"></div>
    
    <!-- Component settings drawer -->
    <div id="componentDrawer" class="drawer">
      <div class="drawer-header">
        <h3 class="drawer-title">Component Settings</h3>
        <div class="drawer-actions">
          <button id="resetForm" class="drawer-reset" title="Reset to default">
            <i class="sicon-rotate"></i>
          </button>
          <button id="closeDrawer" class="drawer-close">
            <i class="sicon-cancel"></i>
          </button>
        </div>
      </div>
      <div class="drawer-content">
        <div id="formContainer"></div>
      </div>
    </div>
    
    <!-- Components filter drawer -->
    <div id="componentsFilterDrawer" class="drawer">
      <div class="drawer-header">
        <h3>Component Visibility</h3>
        <div class="drawer-actions">
          <button class="drawer-close" onclick="document.getElementById('componentsFilterDrawer').classList.remove('active')">
            <i class="sicon-cancel"></i>
          </button>
        </div>
      </div>
      <div class="drawer-content">
        <div class="component-visibility-list">
          ${components.map(component => `
            <div class="visibility-item">
              <label>
                <input type="checkbox"
                name="component-visibility"
                class="visibility-checkbox" 
                value="${component.name}"
                onchange="toggleComponentVisibility(this)">
                <span>${component.name}</span>
              </label>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    
    <script>
      const translations = ${JSON.stringify(translations)};
      const toggleTheme = document.getElementById('toggleTheme');
      const toggleLang = document.getElementById('toggleLang');
      
      // Get stored preferences or use defaults
      let currentLang = localStorage.getItem('salla_demo_lang') || 'ar';
      let currentTheme = localStorage.getItem('salla_demo_theme') || 'light';

      function __demoTrans(key){
        return translations[currentLang][key];
      }
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
        pageTitle.textContent = __demoTrans('title');
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
      const drawerClose = drawer?.querySelector('.drawer-close');
      const drawerReset = drawer?.querySelector('.drawer-reset');
      const drawerTitle = drawer?.querySelector('.drawer-title');
      const drawerContent = drawer?.querySelector('.drawer-content');
      
      // Function to open drawer
      function openDrawer(componentName) {
        // Inject form builder script if it's not loaded yet
        if (!document.getElementById('form-builder-3-script')) {
          const script = document.createElement('script');
          script.id = 'form-builder-3-script';
          script.src = 'https://cdn.assets.salla.network/themes/default/temporary/form-builder-3.js';
          script.async = true;
          document.head.appendChild(script);
        }
        
        drawerTitle.textContent = componentName;
        drawer.classList.add('active');
        drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if(drawer.currentComponent === componentName){
            return;
        }
        drawer.currentComponent = componentName;
        const schema = schemaForComponent(componentName);

        if(!schema){
            return drawerContent.innerHTML = \`
            <div style="padding: 2rem; text-align: center; color: #666;">
                <div style="margin-bottom: 1rem;">
                  <i class="sicon-info" style="font-size: 3rem; color: #2377CD;"></i>
                </div>
                <h3 style="margin-bottom: 1rem; font-weight: 500;">\${__demoTrans('noSettings')}</h3>
                <p>\${__demoTrans('addSettings')}</p>
                <a href="/twilight-bundle.json" target="_blank">twilight-bundle.json</a>
              </div>
            \`;
        }
        
        drawerContent.innerHTML = \`
            <form-builder-3
             form-key="form-builder-3"
             form-data='\${schema}'
             save-url="${formBuilderMockUrl}"
             sources-url="${formBuilderMockUrl}/sources"
             upload-url="${formBuilderMockUrl}/uploader"
             direction="v"
             button="start"
             css-url="${formbuilderAssets.join(',')}"
             language-list="${options.formbuilder.languages.join(',')}"
             default-language="${options.formbuilder.defaultLanguage}"
             submit-label="\${__demoTrans('saveSettings')}"></form-builder-3>
        \`;
      }
      
      // Function to close drawer
      function closeDrawer() {
        document.querySelectorAll('.active').forEach(element => element.classList.remove('active'));
        drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      // Function to reset settings and reload page
      function resetSettings() {
        localStorage.removeItem('form-builder::' + drawer.currentComponent);
        localStorage.removeItem('form-builder::data_' + drawer.currentComponent);
        reRenderComponent(drawer.currentComponent);
      }
    
      
      // Add event listeners for drawer close and reset
      drawerClose.addEventListener('click', closeDrawer);
      drawerOverlay.addEventListener('click', closeDrawer);
      drawerReset.addEventListener('click', resetSettings);
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
        window.Salla.onReady(() => {
            Salla.lang.setLocale(currentLang);  
            const hiddenComponents = Salla.storage.get('hidden-salla-components', []);
            Object.keys(customComponentsSchema).forEach(name => renderComponent(name));
        });
        })();

    </script>
    <style>${options.css}</style>
    <script>${options.js}</script>
  </body>
</html>`
}
