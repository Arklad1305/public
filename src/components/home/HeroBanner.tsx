import { Zap, Shield, Clock } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark-800 via-dark-900 to-ps-dark/20">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-ps-blue rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-purple rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-ps-blue/10 border border-ps-blue/30 rounded-full text-ps-light text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Entrega instantánea tras confirmar pago
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Tu tienda de
            <span className="bg-gradient-to-r from-ps-blue to-accent-purple bg-clip-text text-transparent"> cuentas digitales </span>
            PlayStation
          </h1>

          <p className="text-dark-200 text-lg sm:text-xl mb-8 leading-relaxed">
            Cuentas primarias y secundarias para PS4 y PS5. Keys digitales con entrega automática.
            Los mejores precios del mercado.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="#destacados"
              className="px-6 py-3 bg-ps-blue hover:bg-ps-light text-white font-semibold rounded-lg transition-colors shadow-lg shadow-ps-blue/25"
            >
              Ver Catálogo
            </a>
            <a
              href="#ofertas"
              className="px-6 py-3 bg-dark-600 hover:bg-dark-500 text-white font-semibold rounded-lg transition-colors border border-dark-400"
            >
              Ofertas de la Semana
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="p-2 bg-accent-green/10 rounded-lg">
                <Shield className="w-5 h-5 text-accent-green" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">100% Seguro</p>
                <p className="text-dark-300 text-xs">Pago verificado</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="p-2 bg-ps-blue/10 rounded-lg">
                <Zap className="w-5 h-5 text-ps-light" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">Entrega Inmediata</p>
                <p className="text-dark-300 text-xs">Automática post-pago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="p-2 bg-accent-purple/10 rounded-lg">
                <Clock className="w-5 h-5 text-accent-purple" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">Soporte 24/7</p>
                <p className="text-dark-300 text-xs">Siempre disponible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
