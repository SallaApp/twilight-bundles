import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

declare global {
    const Salla: any;
}

export default class ProductCard extends LitElement {
    @property({ type: Object })
    settings: {
        title: string,
        price: string,
        image: string,
        discount?: string
    } = {
        title: 'Product Name',
        price: '$99.99',
        image: 'https://placehold.co/200x200',
        discount: '-20%'
    };

    static styles = css`
        .product-card {
            width: 250px;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s;
            background: white;
            margin: 1rem;
        }
        .product-card:hover {
            transform: translateY(-5px);
        }
        .product-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 4px;
        }
        .product-title {
            margin: 0.5rem 0;
            color: #333;
            font-size: 1.1rem;
        }
        .price-tag {
            font-size: 1.2rem;
            color: #2196f3;
            font-weight: bold;
        }
        .discount {
            background: #ff4444;
            color: white;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-size: 0.9rem;
            margin-left: 0.5rem;
        }
        .add-to-cart {
            width: 100%;
            padding: 0.8rem;
            margin-top: 1rem;
            border: none;
            border-radius: 4px;
            background: #4CAF50;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s;
        }
        .add-to-cart:hover {
            background: #45a049;
        }
    `;

    private handleAddToCart() {
        Salla.log('Adding to cart:', {
            product: this.settings.title,
            price: this.settings.price
        });
        
        // Show a simple notification
        Salla.success(`Added ${this.settings.title} to cart!`);
    }

    render() {
        return html`
            <div class="product-card">
                <img class="product-image" src="${this.settings.image}" alt="${this.settings.title}">
                <h3 class="product-title">${this.settings.title}</h3>
                <div>
                    <span class="price-tag">${this.settings.price}</span>
                    ${this.settings.discount ? html`<span class="discount">${this.settings.discount}</span>` : ''}
                </div>
                <button class="add-to-cart" @click="${this.handleAddToCart}">
                    Add to Cart
                </button>
            </div>
        `;
    }
}
