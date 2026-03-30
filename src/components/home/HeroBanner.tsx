import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, Clock } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FeaturedProductCard from '../product/FeaturedProductCard';
import { featuredProducts } from '../../data/products';

gsap.registerPlugin(useGSAP);

export default function HeroBanner() {
  const featuredProduct = featuredProducts[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge', { y: -30, opacity: 0, duration: 0.6 })
      .from('.hero-title', { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
      .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.hero-buttons a', { y: 20, opacity: 0, stagger: 0.15, duration: 0.5 }, '-=0.3')
      .from('.hero-feature', { y: 20, opacity: 0, stagger: 0.1, duration: 0.4 }, '-=0.2')
      .from('.hero-card', { x: 60, opacity: 0, scale: 0.9, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.6');

    // Floating animation on the card — transform only, GPU-accelerated
    gsap.to('.hero-card', {
      y: -8,
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Glow pulse — only animate opacity, NOT scale (avoids re-compositing large blurred layers)
    gsap.to('.hero-glow-pink', {
      opacity: 0.08,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
    gsap.to('.hero-glow-blue', {
      opacity: 0.06,
      duration: 5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-gradient-to-br from-dark-800 via-dark-900 to-brand-blue-dark/10 min-h-[90vh] flex items-center">
      {/* Background glows — static size, only opacity animates */}
      <div className="absolute inset-0 pointer-events-none" style={{ willChange: 'auto' }}>
        <div className="hero-glow-pink absolute top-20 left-10 w-80 h-80 rounded-full opacity-[0.04]" style={{ background: 'var(--color-brand-pink)', filter: 'blur(140px)', willChange: 'opacity' }} />
        <div className="hero-glow-blue absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-[0.03]" style={{ background: 'var(--color-brand-blue)', filter: 'blur(160px)', willChange: 'opacity' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-brand-blue-light text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Entrega instantánea tras confirmar pago
            </div>

            <h1 className="hero-title font-title text-5xl sm:text-6xl lg:text-7xl font-black text-slate-100 mb-6 leading-none uppercase tracking-tight">
              Jugá más.{' '}
              <span className="bg-gradient-to-r from-brand-pink to-brand-blue bg-clip-text text-transparent">
                Pagá menos.
              </span>
            </h1>

            <p className="hero-subtitle text-slate-400 text-base sm:text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Cuentas primarias y secundarias para PS4 y PS5. Keys digitales con entrega automática.
              Los mejores precios del mercado.
            </p>

            <div className="hero-buttons flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#destacados"
                className="px-6 py-3 bg-gradient-to-r from-brand-pink to-brand-blue hover:from-brand-pink-light hover:to-brand-blue-light text-white font-semibold rounded-lg transition-all shadow-lg shadow-brand-pink/15"
              >
                Ver Catálogo
              </a>
              <a
                href="#ofertas"
                className="px-6 py-3 glass text-white font-semibold rounded-lg transition-colors hover:bg-white/10"
              >
                Ofertas de la Semana
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="hero-feature flex items-center gap-3 justify-center lg:justify-start">
                <div className="p-2 glass rounded-lg">
                  <Shield className="w-5 h-5 text-accent-green" />
                </div>
                <div className="text-left">
                  <p className="text-slate-200 text-sm font-semibold">100% Seguro</p>
                  <p className="text-dark-300 text-xs">Pago verificado</p>
                </div>
              </div>
              <div className="hero-feature flex items-center gap-3 justify-center lg:justify-start">
                <div className="p-2 glass rounded-lg">
                  <Zap className="w-5 h-5 text-brand-blue-light" />
                </div>
                <div className="text-left">
                  <p className="text-slate-200 text-sm font-semibold">Entrega Inmediata</p>
                  <p className="text-dark-300 text-xs">Automática post-pago</p>
                </div>
              </div>
              <div className="hero-feature flex items-center gap-3 justify-center lg:justify-start">
                <div className="p-2 glass rounded-lg">
                  <Clock className="w-5 h-5 text-brand-pink-light" />
                </div>
                <div className="text-left">
                  <p className="text-slate-200 text-sm font-semibold">Soporte 24/7</p>
                  <p className="text-dark-300 text-xs">Siempre disponible</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Featured card */}
          {featuredProduct && (
            <div className="hero-card flex justify-center lg:justify-end" style={{ willChange: 'transform' }}>
              <div className="w-full max-w-xs sm:max-w-sm">
                <FeaturedProductCard
                  product={featuredProduct}
                  onViewOptions={() => navigate(`/producto/${featuredProduct.slug}`)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
