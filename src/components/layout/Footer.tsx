import { Gamepad2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-dark-600 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-6 h-6 text-ps-blue" />
              <span className="font-title text-xl font-bold text-slate-100 uppercase tracking-tight">
                Game<span className="text-ps-blue">Vault</span>
              </span>
            </div>
            <p className="text-dark-300 text-sm leading-relaxed">
              Tu tienda de confianza para cuentas digitales y keys de PlayStation.
              Entrega inmediata y soporte 24/7.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-title text-slate-100 font-bold mb-4 text-base uppercase tracking-wider">Navegación</h3>
            <ul className="space-y-2">
              <li><a href="#destacados" className="text-dark-300 hover:text-ps-light transition-colors text-sm">Destacados</a></li>
              <li><a href="#mas-vendidos" className="text-dark-300 hover:text-ps-light transition-colors text-sm">Más Vendidos</a></li>
              <li><a href="#estrenos" className="text-dark-300 hover:text-ps-light transition-colors text-sm">Estrenos</a></li>
              <li><a href="#ofertas" className="text-dark-300 hover:text-ps-light transition-colors text-sm">Ofertas de la Semana</a></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-title text-slate-100 font-bold mb-4 text-base uppercase tracking-wider">Información</h3>
            <ul className="space-y-2">
              <li><span className="text-dark-300 text-sm">Cuentas Primarias y Secundarias</span></li>
              <li><span className="text-dark-300 text-sm">Keys digitales con entrega automática</span></li>
              <li><span className="text-dark-300 text-sm">Compatible con PS4 y PS5</span></li>
              <li><span className="text-dark-300 text-sm">Soporte por WhatsApp</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-600 mt-8 pt-8 text-center">
          <p className="text-dark-400 text-xs">
            &copy; {new Date().getFullYear()} GameVault. Todos los derechos reservados. PlayStation es una marca registrada de Sony Interactive Entertainment.
          </p>
        </div>
      </div>
    </footer>
  );
}
