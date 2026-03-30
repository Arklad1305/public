import { Gamepad2, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Gamepad2 className="w-8 h-8 text-brand-pink group-hover:text-brand-pink-light transition-colors" />
            <span className="font-title text-2xl font-bold text-slate-100 uppercase tracking-tight">
              Tecno<span className="text-brand-blue">ber</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#destacados" className="text-dark-200 hover:text-slate-100 transition-colors text-sm font-medium uppercase tracking-wider">
              Destacados
            </a>
            <a href="#mas-vendidos" className="text-dark-200 hover:text-slate-100 transition-colors text-sm font-medium uppercase tracking-wider">
              Más Vendidos
            </a>
            <a href="#estrenos" className="text-dark-200 hover:text-slate-100 transition-colors text-sm font-medium uppercase tracking-wider">
              Estrenos
            </a>
            <a href="#ofertas" className="text-dark-200 hover:text-slate-100 transition-colors text-sm font-medium uppercase tracking-wider">
              Ofertas
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/auth"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg text-dark-200 hover:text-white text-sm font-medium transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Ingresar</span>
            </Link>
            <button className="relative p-2 text-dark-200 hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-brand-pink to-brand-blue text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button
              className="md:hidden p-2 text-dark-200 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-dark-800/95 backdrop-blur-lg">
          <nav className="flex flex-col px-4 py-3 gap-1">
            <a href="#destacados" className="px-3 py-2 rounded-lg text-dark-100 hover:text-white hover:bg-white/5 transition-colors text-sm" onClick={() => setMobileMenuOpen(false)}>
              Destacados
            </a>
            <a href="#mas-vendidos" className="px-3 py-2 rounded-lg text-dark-100 hover:text-white hover:bg-white/5 transition-colors text-sm" onClick={() => setMobileMenuOpen(false)}>
              Más Vendidos
            </a>
            <a href="#estrenos" className="px-3 py-2 rounded-lg text-dark-100 hover:text-white hover:bg-white/5 transition-colors text-sm" onClick={() => setMobileMenuOpen(false)}>
              Estrenos
            </a>
            <a href="#ofertas" className="px-3 py-2 rounded-lg text-dark-100 hover:text-white hover:bg-white/5 transition-colors text-sm" onClick={() => setMobileMenuOpen(false)}>
              Ofertas
            </a>
            <Link to="/auth" className="px-3 py-2 rounded-lg text-dark-100 hover:text-white hover:bg-white/5 transition-colors text-sm flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <User className="w-4 h-4" /> Ingresar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
