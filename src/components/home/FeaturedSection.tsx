import { Star } from 'lucide-react';
import { featuredProducts } from '../../data/products';
import ProductGrid from '../product/ProductGrid';

export default function FeaturedSection() {
  return (
    <section id="destacados" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Star className="w-6 h-6 text-accent-orange" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Destacados</h2>
      </div>
      <ProductGrid products={featuredProducts} />
    </section>
  );
}
