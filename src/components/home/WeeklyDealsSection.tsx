import { Tag } from 'lucide-react';
import { weeklyDeals } from '../../data/products';
import ProductGrid from '../product/ProductGrid';

export default function WeeklyDealsSection() {
  return (
    <section id="ofertas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Tag className="w-6 h-6 text-accent-red" />
        <h2 className="font-title text-3xl sm:text-4xl font-bold text-slate-100 uppercase tracking-tight">Ofertas de la Semana</h2>
        <span className="px-3 py-1 bg-accent-red/20 text-accent-red text-xs font-bold rounded-full border border-accent-red/30">
          AHORRA HASTA 30%
        </span>
      </div>
      <ProductGrid products={weeklyDeals} showDiscount />
    </section>
  );
}
