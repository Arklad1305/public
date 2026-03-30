import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import Badge from '../ui/Badge';

interface ProductCardProps {
  product: Product;
  showDiscount?: boolean;
}

export default function ProductCard({ product, showDiscount = false }: ProductCardProps) {
  const minPrice = Math.min(...product.pricing.map(p => p.price));
  const maxPrice = Math.max(...product.pricing.map(p => p.price));
  const hasOriginalPrice = product.pricing.some(p => p.originalPrice);
  const maxOriginalPrice = hasOriginalPrice
    ? Math.max(...product.pricing.filter(p => p.originalPrice).map(p => p.originalPrice!))
    : undefined;

  return (
    <div className="group relative bg-dark-800 rounded-xl overflow-hidden border border-dark-600 hover:border-ps-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-ps-blue/10 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-dark-700">
        <img
          src={product.coverImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent" />

        {/* Badges top */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.platforms.map(p => (
            <Badge key={p} variant={p}>
              {p.toUpperCase()}
            </Badge>
          ))}
          {product.type === 'digital_key' && <Badge variant="key">KEY</Badge>}
        </div>

        {/* Discount badge */}
        {showDiscount && product.weeklyDealDiscount && (
          <div className="absolute top-3 right-3">
            <Badge variant="discount">-{product.weeklyDealDiscount}%</Badge>
          </div>
        )}

        {product.isNewRelease && (
          <div className="absolute top-3 right-3">
            <Badge variant="new">NUEVO</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-ps-light transition-colors">
          {product.title}
        </h3>

        <p className="text-dark-300 text-xs mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="space-y-1.5">
          {product.type === 'account' && (
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <Badge variant="primary">Primaria</Badge>
                <span className="text-accent-purple font-bold">
                  {minPrice !== maxPrice
                    ? `${formatCurrency(product.pricing.filter(p => p.accountVariant === 'primary').reduce((min, p) => Math.min(min, p.price), Infinity))}`
                    : formatCurrency(minPrice)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Badge variant="secondary">Secundaria</Badge>
                <span className="text-accent-pink font-bold">
                  {formatCurrency(product.pricing.filter(p => p.accountVariant === 'secondary').reduce((min, p) => Math.min(min, p.price), Infinity))}
                </span>
              </div>
            </div>
          )}

          {product.type === 'digital_key' && (
            <div className="flex items-center gap-2">
              <span className="text-accent-green font-bold text-sm">
                {formatCurrency(minPrice)}
              </span>
            </div>
          )}

          {maxOriginalPrice && (
            <div className="text-dark-400 text-xs line-through">
              Antes: {formatCurrency(maxOriginalPrice)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
