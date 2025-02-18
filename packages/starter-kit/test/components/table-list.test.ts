import { describe, it, expect, afterEach } from 'vitest';
import TableList from '../../src/components/table-list/index.ts';

// Register the component
customElements.define('salla-table-list', TableList);

describe('TableList Component', () => {
    afterEach(() => {
        // Clean up any elements added to the document
        document.body.innerHTML = '';
    });

    it('should render empty state when no items provided', async () => {
        const element = new TableList();
        document.body.appendChild(element);
        
        // Wait for component to update
        await element.updateComplete;
        
        const list = element.shadowRoot?.querySelector('.table-list');
        expect(list).toBeTruthy();
        expect(list?.children.length).toBe(0);
    });

    it('should render items with titles and descriptions', async () => {
        const element = new TableList();
        element.settings = {
            items: [
                {
                    id: 1,
                    title: 'Test Item 1',
                    description: 'Description 1'
                },
                {
                    id: 2,
                    title: 'Test Item 2'
                }
            ]
        };
        document.body.appendChild(element);
        
        // Wait for component to update
        await element.updateComplete;
        
        const items = element.shadowRoot?.querySelectorAll('.table-item');
        expect(items?.length).toBe(2);
        
        // Check first item
        const firstItem = items?.[0];
        expect(firstItem?.querySelector('.item-title')?.textContent).toBe('Test Item 1');
        expect(firstItem?.querySelector('.item-description')?.textContent).toBe('Description 1');
        
        // Check second item (no description)
        const secondItem = items?.[1];
        expect(secondItem?.querySelector('.item-title')?.textContent).toBe('Test Item 2');
        expect(secondItem?.querySelector('.item-description')).toBeNull();
    });

    it('should update when settings change', async () => {
        const element = new TableList();
        document.body.appendChild(element);
        
        // Initial state
        await element.updateComplete;
        expect(element.shadowRoot?.querySelectorAll('.table-item').length).toBe(0);
        
        // Update settings
        element.settings = {
            items: [
                {
                    id: 1,
                    title: 'New Item',
                    description: 'New Description'
                }
            ]
        };
        
        // Wait for update
        await element.updateComplete;
        
        const items = element.shadowRoot?.querySelectorAll('.table-item');
        expect(items?.length).toBe(1);
        expect(items?.[0].querySelector('.item-title')?.textContent).toBe('New Item');
    });
});
