export default function sallaComponentPlugin(options = {}) {
    const {
        componentsPath = 'components',
        pattern = /^.*\/(?<componentDir>components)\/(?<componentName>[^/]+)\/index\.ts$/
    } = options;
    return {
        name: 'salla-component-plugin',
        enforce: 'pre',
        transform(code, id) {
            // serve only component files that end with component.ts in src folder
            const match = id.match(pattern);
            if (!match) {
                return null;
            }

            // Extract component name from the class definition
            const classMatch = code.match(/class\s+(\w+)/i);
            if (!classMatch) {
                return null;
            }

            const className = classMatch[1];

            // Get component name from folder name using named group
            const componentName = match.groups.componentName;
            const prefix = componentName.substring(0, 6).toLowerCase() === 'salla-' ? '' : 'salla-';

            // Add component registration code
            const transformedCode = `${code}
if (typeof ${className} !== 'undefined') {${className}.registerSallaComponent('${prefix + componentName}');}`;
            return { code: transformedCode };
        }
    };
};