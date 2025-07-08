/**
 * Product type definitions for the product-card component
 */

/**
 * Product image type
 */
export interface ProductImage {
  url: string;
  alt: string | null;
}

/**
 * Currency price type
 */
export interface CurrencyPrice {
  currency: string;
  amount: number;
}

/**
 * Product type definition based on Salla API response
 */
export interface Product {
  id: number;
  sku: string | null;
  name: string;
  description: string;
  url: string;
  promotion_title: string | null;
  subtitle: string | null;
  type: string;
  status: string;
  price: number;
  base_currency_price: CurrencyPrice;
  sale_price: number;
  regular_price: number;
  starting_price: number;
  quantity: number;
  max_quantity: number;
  discount_ends: string | null;
  is_taxable: boolean;
  has_read_more: boolean;
  can_add_note: boolean;
  can_show_remained_quantity: boolean;
  can_upload_file: boolean;
  has_custom_form: boolean;
  has_metadata: boolean;
  is_on_sale: boolean;
  is_hidden_quantity: boolean;
  is_available: boolean;
  is_out_of_stock: boolean;
  is_require_shipping: boolean;
  weight: string;
  calories: string | null;
  image: ProductImage;
  currency: string;
  has_size_guide: boolean;
  
  // Computed properties that might be used in the component
  discount?: string; // For displaying discount percentage/amount
}

/**
 * Form builder product selection type
 */
export interface ProductSelection {
  value: string | number;
  label: string;
}

/**
 * Component configuration type
 */
export interface ProductCardConfig {
  product: ProductSelection[];
}
