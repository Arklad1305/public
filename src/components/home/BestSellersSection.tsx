import { TrendingUp } from 'lucide-react';
import { bestSellers } from '../../data/products';
import ProductGrid from '../product/ProductGrid';

export default function BestSellersSection() {
  return (
    <section id="mas-vendidos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="w-6 h-6 text-accent-green" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Más Vendidos</h2>
      </div>
      <ProductGrid products={bestSellers} />
    </section>
  );
}
