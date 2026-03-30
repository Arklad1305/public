import { Gamepad2, ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <Gamepad2 className="w-8 h-8 text-ps-blue group-hover:text-ps-light transition-colors" />
            <span className="text-xl font-bold text-white">
              Game<span className="text-ps-blue">Vault</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#destacados" className="text-dark-100 hover:text-white transition-colors text-sm font-medium">
              Destacados
            </a>
            <a href="#mas-vendidos" className="text-dark-100 hover:text-white transition-colors text-sm font-medium">
              Más Vendidos
            </a>
            <a href="#estrenos" className="text-dark-100 hover:text-white transition-colors text-sm font-medium">
              Estrenos
            </a>
            <a href="#ofertas" className="text-dark-100 hover:text-white transition-colors text-sm font-medium">
              Ofertas
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-dark-200 hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-purple text-white text-[10px] font-bold rounded-full flex items-center justify-center">
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
        <div className="md:hidden border-t border-dark-600 bg-dark-800">
          <nav className="flex flex-col px-4 py-3 gap-1">
            <a href="#destacados" className="px-3 py-2 rounded-lg text-dark-100 hover:text-white hover:bg-dark-600 transition-colors text-sm" onClick={() => setMobileMenuOpen(false)}>
              Destacados
            </a>
            <a href="#mas-vendidos" className="px-3 py-2 rounded-lg text-dark-100 hover:text-white hover:bg-dark-600 transition-colors text-sm" onClick={() => setMobileMenuOpen(false)}>
              Más Vendidos
            </a>
            <a href="#estrenos" className="px-3 py-2 rounded-lg text-dark-100 hover:text-white hover:bg-dark-600 transition-colors text-sm" onClick={() => setMobileMenuOpen(false)}>
              Estrenos
            </a>
            <a href="#ofertas" className="px-3 py-2 rounded-lg text-dark-100 hover:text-white hover:bg-dark-600 transition-colors text-sm" onClick={() => setMobileMenuOpen(false)}>
              Ofertas
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
