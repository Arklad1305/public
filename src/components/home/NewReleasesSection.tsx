import { Sparkles } from 'lucide-react';
import { newReleases } from '../../data/products';
import ProductGrid from '../product/ProductGrid';

export default function NewReleasesSection() {
  return (
    <section id="estrenos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-6 h-6 text-ps-light" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Estrenos</h2>
      </div>
      <ProductGrid products={newReleases} />
    </section>
  );
}
