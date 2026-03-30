import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Zap, Info } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { products } from '../data/products';
import { formatCurrency } from '../utils/formatCurrency';
import type { Platform, AccountVariant } from '../types/product';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/product/ProductCard';

gsap.registerPlugin(useGSAP);

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const product = products.find(p => p.slug === slug);

  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    product?.platforms[0] ?? 'ps5'
  );
  const [selectedVariant, setSelectedVariant] = useState<AccountVariant>('primary');

  // Related products: same category first, then others, excluding current
  const relatedProducts = product
    ? [
        ...products.filter(p => p.id !== product.id && p.category === product.category),
        ...products.filter(p => p.id !== product.id && p.category !== product.category),
      ].slice(0, 6)
    : [];

  useGSAP(() => {
    if (!product) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.detail-image', { x: -60, opacity: 0, scale: 0.92, duration: 0.7 })
      .from('.detail-info', { x: 40, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.detail-platform-btn', { y: 15, opacity: 0, stagger: 0.1, duration: 0.3 }, '-=0.3')
      .from('.detail-variant-card', { y: 20, opacity: 0, stagger: 0.15, duration: 0.4 }, '-=0.2')
      .from('.detail-price-box', { scale: 0.9, opacity: 0, duration: 0.4, ease: 'back.out(2)' }, '-=0.1')
      .from('.detail-legend', { y: 15, opacity: 0, duration: 0.4 }, '-=0.2')
      .from('.related-section', { y: 30, opacity: 0, duration: 0.5 }, '-=0.1');
  }, { scope: containerRef, dependencies: [slug] });

  if (!product) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-title text-3xl font-bold text-slate-100 mb-4">Producto no encontrado</h2>
          <button onClick={() => navigate('/')} className="text-brand-blue hover:text-brand-blue-light transition-colors">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const currentPricing = product.pricing.find(
    p => p.platform === selectedPlatform && p.accountVariant === selectedVariant
  );
  const availablePlatforms = product.platforms;

  return (
    <div ref={containerRef} className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-dark-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Volver</span>
            </button>
            <div className="h-5 w-px bg-dark-500" />
            <span className="text-dark-300 text-sm truncate">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image */}
          <div className="detail-image">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="relative aspect-[3/4] sm:aspect-square lg:aspect-[3/4]">
                <img
                  src={product.coverImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.platforms.map(p => (
                    <Badge key={p} variant={p}>{p.toUpperCase()}</Badge>
                  ))}
                  {product.type === 'digital_key' && <Badge variant="key">KEY</Badge>}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="detail-info space-y-6">
            <div>
              <h1 className="font-title text-3xl sm:text-4xl font-black text-slate-100 uppercase tracking-tight mb-2">
                {product.title}
              </h1>
              <p className="text-dark-200 text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Platform selector */}
            <div>
              <h3 className="font-title text-sm font-bold text-dark-100 uppercase tracking-wider mb-3">
                Plataforma
              </h3>
              <div className="flex gap-3">
                {availablePlatforms.map(platform => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`detail-platform-btn px-5 py-2.5 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all cursor-pointer ${
                      selectedPlatform === platform
                        ? 'bg-gradient-to-r from-brand-pink to-brand-blue text-white shadow-lg shadow-brand-pink/20'
                        : 'glass text-dark-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {platform === 'ps4' ? 'PlayStation 4' : 'PlayStation 5'}
                  </button>
                ))}
              </div>
            </div>

            {/* Account variant selector */}
            {product.type === 'account' && (
              <div>
                <h3 className="font-title text-sm font-bold text-dark-100 uppercase tracking-wider mb-3">
                  Tipo de cuenta
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {(['primary', 'secondary'] as AccountVariant[]).map(variant => {
                    const variantPrice = product.pricing.find(
                      p => p.platform === selectedPlatform && p.accountVariant === variant
                    );
                    return (
                      <button
                        key={variant}
                        onClick={() => setSelectedVariant(variant)}
                        className={`detail-variant-card p-4 rounded-xl text-left transition-all cursor-pointer ${
                          selectedVariant === variant
                            ? variant === 'primary'
                              ? 'glass-card border-brand-pink/30 ring-1 ring-brand-pink/20'
                              : 'glass-card border-brand-blue/30 ring-1 ring-brand-blue/20'
                            : 'glass hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={variant}>
                            {variant === 'primary' ? 'Primaria' : 'Secundaria'}
                          </Badge>
                        </div>
                        <div className="font-title font-black text-xl text-slate-100">
                          {variantPrice ? formatCurrency(variantPrice.price) : '—'}
                        </div>
                        {variantPrice?.originalPrice && (
                          <div className="text-dark-400 text-xs line-through mt-0.5">
                            {formatCurrency(variantPrice.originalPrice)}
                          </div>
                        )}
                        <p className="text-dark-300 text-xs mt-2 leading-relaxed">
                          {variant === 'primary'
                            ? 'Acceso completo. Juegas desde tu cuenta propia.'
                            : 'Precio reducido. Juegas desde una cuenta compartida.'}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price box */}
            <div className="detail-price-box glass-card rounded-xl p-5">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <span className="text-xs text-dark-300 uppercase tracking-wider font-semibold">Total</span>
                  <div className="font-title font-black text-4xl text-slate-100">
                    {currentPricing ? formatCurrency(currentPricing.price) : '—'}
                    <span className="text-sm text-dark-400 font-medium ml-2">CLP</span>
                  </div>
                  {currentPricing?.originalPrice && (
                    <div className="text-dark-400 text-sm line-through">
                      {formatCurrency(currentPricing.originalPrice)}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Badge variant={selectedPlatform}>{selectedPlatform.toUpperCase()}</Badge>
                  {product.type === 'account' && (
                    <Badge variant={selectedVariant}>
                      {selectedVariant === 'primary' ? 'Primaria' : 'Secundaria'}
                    </Badge>
                  )}
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-brand-pink to-brand-blue hover:from-brand-pink-light hover:to-brand-blue-light text-white font-bold rounded-lg transition-all cursor-pointer shadow-lg shadow-brand-pink/15 text-base uppercase tracking-wider">
                Agregar al carrito
              </button>

              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-dark-300">
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-accent-green" /> Pago seguro</span>
                <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-brand-blue-light" /> Entrega inmediata</span>
              </div>
            </div>

            {/* Legend */}
            <div className="detail-legend glass rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-brand-blue-light mt-0.5 shrink-0" />
                <div className="space-y-2 text-xs text-dark-200 leading-relaxed">
                  <p>
                    <strong className="text-slate-200">Cuenta Primaria:</strong> Se configura tu PS como consola principal.
                    Puedes jugar con tu usuario, descargar el juego cuando quieras y jugar sin conexión.
                  </p>
                  <p>
                    <strong className="text-slate-200">Cuenta Secundaria:</strong> Se comparte una cuenta.
                    Necesitas conexión a internet para jugar. Precio más accesible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RELATED PRODUCTS ===== */}
        {relatedProducts.length > 0 && (
          <div className="related-section mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-title text-3xl sm:text-4xl font-bold uppercase text-slate-100 tracking-tight">
                También te puede{' '}
                <span className="bg-gradient-to-r from-brand-pink to-brand-blue bg-clip-text text-transparent">
                  interesar
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
