import { products } from './products';
import { categories } from './categories';

// Export all data sources
export const dataSources: Record<string, any> = {
  products,
  categories
};

// Helper function to get data for a specific source
export function getSourceData(source: string) {
  return dataSources[source] || {
    status: 404,
    success: false,
    data: [],
    message: `Source '${source}' not found`
  };
}
