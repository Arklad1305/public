import type { Product } from '../../types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  showDiscount?: boolean;
}

export default function ProductGrid({ products, showDiscount = false }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} showDiscount={showDiscount} />
      ))}
    </div>
  );
}
