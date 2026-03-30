import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import Badge from '../ui/Badge';

interface ProductCardProps {
  product: Product;
  showDiscount?: boolean;
}

export default function ProductCard({ product, showDiscount = false }: ProductCardProps) {
  const minPrice = Math.min(...product.pricing.map(p => p.price));
  const hasOriginalPrice = product.pricing.some(p => p.originalPrice);
  const maxOriginalPrice = hasOriginalPrice
    ? Math.max(...product.pricing.filter(p => p.originalPrice).map(p => p.originalPrice!))
    : undefined;
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleViewOptions = () => {
    const card = cardRef.current;
    if (!card) {
      navigate(`/producto/${product.slug}`);
      return;
    }
    gsap.to(card, {
      scale: 0.95,
      opacity: 0.8,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        navigate(`/producto/${product.slug}`);
      },
    });
  };

  return (
    <div
      ref={cardRef}
      className="group relative glass-card rounded-xl overflow-hidden hover:border-brand-pink/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-pink/5 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-dark-700">
        <img
          src={product.coverImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent" />

        {/* Platform badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.platforms.map(p => (
            <Badge key={p} variant={p}>
              {p.toUpperCase()}
            </Badge>
          ))}
          {product.type === 'digital_key' && <Badge variant="key">KEY</Badge>}
        </div>

        {showDiscount && product.weeklyDealDiscount && (
          <div className="absolute top-3 right-3">
            <Badge variant="discount">-{product.weeklyDealDiscount}%</Badge>
          </div>
        )}
        {!showDiscount && product.isNewRelease && (
          <div className="absolute top-3 right-3">
            <Badge variant="new">NUEVO</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 border-t border-white/5">
        <h3 className="font-title font-bold text-base sm:text-lg text-slate-100 mb-1 line-clamp-2 group-hover:text-brand-pink-light transition-colors leading-tight">
          {product.title}
        </h3>

        <p className="text-dark-300 text-xs mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="space-y-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] text-dark-300 uppercase tracking-wider font-semibold">desde</span>
            <span className="font-title font-black text-xl text-slate-100">
              {formatCurrency(minPrice)}
            </span>
            <span className="text-[10px] text-dark-400 font-medium">CLP</span>
          </div>

          {maxOriginalPrice && (
            <div className="text-dark-400 text-xs line-through">
              {formatCurrency(maxOriginalPrice)}
            </div>
          )}

          {product.type === 'account' && (
            <div className="flex gap-1.5">
              <Badge variant="primary">Primaria</Badge>
              <Badge variant="secondary">Secundaria</Badge>
            </div>
          )}

          <button
            onClick={handleViewOptions}
            className="w-full py-2 px-3 bg-gradient-to-r from-brand-pink/80 to-brand-blue/80 hover:from-brand-pink hover:to-brand-blue text-white font-semibold text-sm rounded-lg transition-all cursor-pointer"
          >
            Ver opciones
          </button>
        </div>
      </div>
    </div>
  );
}
