import { describe, it, expect, vi, afterEach } from 'vitest';
import ProductCard from '../../src/components/product-card/index.ts';

// Register the component
customElements.define('salla-product-card', ProductCard);

describe('ProductCard Component', () => {
    afterEach(() => {
        // Clean up any elements added to the document
        document.body.innerHTML = '';
        // Reset all mocks
        vi.clearAllMocks();
    });

    it('should render with default settings', async () => {
        const element = new ProductCard();
        document.body.appendChild(element);
        
        // Wait for component to update
        await element.updateComplete;
        
        const card = element.shadowRoot?.querySelector('.product-card');
        expect(card).toBeTruthy();
        
        const title = element.shadowRoot?.querySelector('.product-title');
        expect(title?.textContent).toBe('Product Name');
        
        const price = element.shadowRoot?.querySelector('.price-tag');
        expect(price?.textContent).toBe('$99.99');
    });

    it('should render with custom settings', async () => {
        const element = new ProductCard();
        element.settings = {
            title: 'Custom Product',
            price: '$149.99',
            image: 'custom-image.jpg',
            discount: '-30%'
        };
        document.body.appendChild(element);
        
        // Wait for component to update
        await element.updateComplete;
        
        const title = element.shadowRoot?.querySelector('.product-title');
        expect(title?.textContent).toBe('Custom Product');
        
        const price = element.shadowRoot?.querySelector('.price-tag');
        expect(price?.textContent).toBe('$149.99');
        
        const discount = element.shadowRoot?.querySelector('.discount');
        expect(discount?.textContent).toBe('-30%');
        
        const image = element.shadowRoot?.querySelector('.product-image') as HTMLImageElement;
        expect(image?.src).toContain('custom-image.jpg');
    });

    it('should handle add to cart click', async () => {
        const element = new ProductCard();
        document.body.appendChild(element);
        
        // Wait for component to update
        await element.updateComplete;
        
        const addToCartButton = element.shadowRoot?.querySelector('.add-to-cart');
        expect(addToCartButton).toBeTruthy();
        
        // Click the button
        addToCartButton?.dispatchEvent(new MouseEvent('click'));
        
        // Verify Salla.log was called
        expect(Salla.log).toHaveBeenCalledWith('Adding to cart:', {
            product: 'Product Name',
            price: '$99.99'
        });
        
        // Verify success message
        expect(Salla.success).toHaveBeenCalledWith('Added Product Name to cart!');
    });

    it('should not show discount badge when no discount provided', async () => {
        const element = new ProductCard();
        element.settings = {
            title: 'No Discount Product',
            price: '$199.99',
            image: 'image.jpg'
        };
        document.body.appendChild(element);
        
        // Wait for component to update
        await element.updateComplete;
        
        const discount = element.shadowRoot?.querySelector('.discount');
        expect(discount).toBeNull();
    });
});
