import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import Badge from '../ui/Badge';

interface FeaturedProductCardProps {
  product: Product;
}

export default function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const minPrice = Math.min(...product.pricing.map(p => p.price));

  return (
    <div className="group relative bg-dark-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-accent-gold/20 hover:border-accent-gold/40 transition-all duration-500 shadow-xl shadow-dark-900/50">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-dark-700">
        <img
          src={product.coverImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-dark-900/20 to-transparent" />

        {/* Platform badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {product.platforms.map(p => (
            <Badge key={p} variant={p}>
              {p.toUpperCase()}
            </Badge>
          ))}
        </div>
      </div>

      {/* Glassmorphic info overlay */}
      <div className="p-5 bg-dark-800/40 backdrop-blur-lg border-t border-white/10">
        <h3 className="font-title font-bold text-xl sm:text-2xl text-slate-100 mb-2 leading-tight">
          {product.title}
        </h3>

        <p className="text-dark-200 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="text-[11px] text-dark-300 uppercase tracking-wider font-semibold block mb-0.5">desde</span>
            <span className="font-title font-black text-3xl text-accent-gold">
              {formatCurrency(minPrice)}
            </span>
            <span className="text-xs text-dark-400 ml-1.5 font-medium">CLP</span>
          </div>

          <button className="px-5 py-2.5 bg-ps-blue hover:bg-ps-light text-white font-semibold text-sm rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-lg shadow-ps-blue/10">
            Ver opciones
          </button>
        </div>

        {/* Account type indicators */}
        {product.type === 'account' && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
            <Badge variant="primary">Primaria</Badge>
            <Badge variant="secondary">Secundaria</Badge>
            {product.type === 'account' && product.platforms.length > 1 && (
              <span className="text-[11px] text-dark-300 self-center ml-auto uppercase tracking-wider font-semibold">
                Multiplataforma
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
