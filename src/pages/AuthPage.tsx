import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Eye, EyeOff, ArrowLeft, Check, X } from 'lucide-react';

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  checks: { label: string; passed: boolean }[];
}

function getPasswordStrength(password: string): PasswordStrength {
  const checks = [
    { label: 'Mínimo 8 caracteres', passed: password.length >= 8 },
    { label: 'Una letra mayúscula', passed: /[A-Z]/.test(password) },
    { label: 'Una letra minúscula', passed: /[a-z]/.test(password) },
    { label: 'Un número', passed: /[0-9]/.test(password) },
    { label: 'Un carácter especial (!@#$...)', passed: /[^a-zA-Z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.passed).length;

  if (score <= 1) return { score, label: 'Muy débil', color: '#ef4444', checks };
  if (score === 2) return { score, label: 'Débil', color: '#f97316', checks };
  if (score === 3) return { score, label: 'Media', color: '#f59e0b', checks };
  if (score === 4) return { score, label: 'Fuerte', color: '#10b981', checks };
  return { score, label: 'Muy fuerte', color: '#22d3ee', checks };
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  // Accent color based on mode
  const accentCyan = 'cyan-400';
  const accentMagenta = 'fuchsia-500';

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden px-4">
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.07]"
          style={{ background: '#22d3ee', filter: 'blur(160px)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.07]"
          style={{ background: '#d946ef', filter: 'blur(140px)' }}
        />
        {/* Grid lines overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-white transition-colors z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Volver</span>
      </button>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-4xl h-[620px] rounded-2xl overflow-hidden border border-white/[0.06]"
        style={{
          background: 'rgba(15, 23, 42, 0.8)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* ===== BACKGROUND LAYER (static 2-column grid) ===== */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          {/* Left side — Login invitation (visible when user is on Register) */}
          <div className="hidden md:flex flex-col items-center justify-center p-10 text-center">
            <Gamepad2 className={`w-12 h-12 text-${accentCyan} mb-4 opacity-60`} />
            <h2 className="font-title text-2xl font-bold text-slate-200 uppercase tracking-tight mb-3">
              ¿Ya tienes cuenta?
            </h2>
            <p className="text-slate-500 text-sm mb-6 max-w-[240px] leading-relaxed">
              Inicia sesión para acceder a tu biblioteca de juegos y ofertas exclusivas.
            </p>
            <button
              onClick={() => { setIsLogin(true); setPassword(''); setConfirmPassword(''); }}
              className={`px-6 py-2.5 rounded-lg border border-${accentCyan}/30 text-${accentCyan} text-sm font-semibold uppercase tracking-wider hover:bg-cyan-400/10 transition-colors cursor-pointer`}
            >
              Entra aquí
            </button>
          </div>

          {/* Right side — Register invitation (visible when user is on Login) */}
          <div className="hidden md:flex flex-col items-center justify-center p-10 text-center">
            <Gamepad2 className={`w-12 h-12 text-${accentMagenta} mb-4 opacity-60`} />
            <h2 className="font-title text-2xl font-bold text-slate-200 uppercase tracking-tight mb-3">
              ¿Nuevo aquí?
            </h2>
            <p className="text-slate-500 text-sm mb-6 max-w-[240px] leading-relaxed">
              Crea tu cuenta y accede a los mejores precios en juegos digitales.
            </p>
            <button
              onClick={() => { setIsLogin(false); setPassword(''); setConfirmPassword(''); }}
              className={`px-6 py-2.5 rounded-lg border border-${accentMagenta}/30 text-${accentMagenta} text-sm font-semibold uppercase tracking-wider hover:bg-fuchsia-500/10 transition-colors cursor-pointer`}
            >
              Regístrate
            </button>
          </div>
        </div>

        {/* ===== SLIDING GLASS PANEL ===== */}
        <div
          className={`absolute top-0 h-full w-full md:w-1/2 transition-transform duration-700 ease-in-out z-10 ${
            isLogin ? 'translate-x-0' : 'md:translate-x-full'
          }`}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRight: isLogin ? '1px solid rgba(255,255,255,0.06)' : 'none',
            borderLeft: !isLogin ? '1px solid rgba(255,255,255,0.06)' : 'none',
            boxShadow: '0 0 60px rgba(0,0,0,0.3)',
          }}
        >
          <div className="h-full flex flex-col justify-center px-8 sm:px-12">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gamepad2 className={`w-8 h-8 ${isLogin ? `text-${accentCyan}` : `text-${accentMagenta}`} transition-colors duration-500`} />
                <span className="font-title text-2xl font-bold text-slate-100 uppercase tracking-tight">
                  Tecno<span className={`${isLogin ? `text-${accentCyan}` : `text-${accentMagenta}`} transition-colors duration-500`}>ber</span>
                </span>
              </div>
              <h2 className="font-title text-xl font-bold text-slate-200 uppercase tracking-tight">
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={e => e.preventDefault()} className="space-y-4">
              {/* Name (register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1.5">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className={`w-full px-4 py-3 rounded-lg text-slate-100 text-sm placeholder:text-slate-600 outline-none transition-all bg-slate-800/50 border border-transparent focus:border-${accentMagenta}/40 focus:ring-1 focus:ring-${accentMagenta}/30`}
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className={`w-full px-4 py-3 rounded-lg text-slate-100 text-sm placeholder:text-slate-600 outline-none transition-all bg-slate-800/50 border border-transparent ${
                    isLogin
                      ? `focus:border-${accentCyan}/40 focus:ring-1 focus:ring-${accentCyan}/30`
                      : `focus:border-${accentMagenta}/40 focus:ring-1 focus:ring-${accentMagenta}/30`
                  }`}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 pr-11 rounded-lg text-slate-100 text-sm placeholder:text-slate-600 outline-none transition-all bg-slate-800/50 border border-transparent ${
                      isLogin
                        ? `focus:border-${accentCyan}/40 focus:ring-1 focus:ring-${accentCyan}/30`
                        : `focus:border-${accentMagenta}/40 focus:ring-1 focus:ring-${accentMagenta}/30`
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password strength (register only) */}
                {!isLogin && password.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(level => (
                        <div
                          key={level}
                          className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: level <= strength.score ? strength.color : '#1e293b',
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold" style={{ color: strength.color }}>
                        {strength.label}
                      </span>
                      <span className="text-xs text-slate-600">{strength.score}/5</span>
                    </div>
                    <div className="space-y-1">
                      {strength.checks.map(check => (
                        <div key={check.label} className="flex items-center gap-2 text-xs">
                          {check.passed ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-slate-600" />
                          )}
                          <span className={check.passed ? 'text-slate-300' : 'text-slate-600'}>
                            {check.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm password (register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1.5">
                    Confirmar contraseña
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-lg text-slate-100 text-sm placeholder:text-slate-600 outline-none transition-all bg-slate-800/50 border border-transparent focus:border-${accentMagenta}/40 focus:ring-1 focus:ring-${accentMagenta}/30`}
                  />
                  {confirmPassword.length > 0 && confirmPassword !== password && (
                    <p className="text-xs text-red-400 mt-1.5">Las contraseñas no coinciden</p>
                  )}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className={`w-full py-3 text-white font-bold rounded-lg transition-all cursor-pointer shadow-lg text-sm uppercase tracking-wider mt-2 ${
                  isLogin
                    ? 'bg-cyan-400 hover:bg-cyan-300 shadow-cyan-400/20'
                    : 'bg-fuchsia-500 hover:bg-fuchsia-400 shadow-fuchsia-500/20'
                }`}
              >
                {isLogin ? 'Acceder' : 'Registrar'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-xs text-slate-600">o continúa con</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full py-2.5 rounded-lg text-slate-400 hover:text-white text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-white/[0.04]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>

            {/* Mobile toggle */}
            <div className="md:hidden mt-5 text-center">
              <button
                onClick={() => { setIsLogin(!isLogin); setPassword(''); setConfirmPassword(''); }}
                className={`text-sm font-medium cursor-pointer transition-colors ${
                  isLogin ? 'text-fuchsia-400 hover:text-fuchsia-300' : 'text-cyan-400 hover:text-cyan-300'
                }`}
              >
                {isLogin ? '¿Nuevo aquí? Regístrate' : '¿Ya tienes cuenta? Entra aquí'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
