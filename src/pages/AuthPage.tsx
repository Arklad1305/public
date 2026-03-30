import { useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Eye, EyeOff, ArrowLeft, Check, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type AuthMode = 'login' | 'register';

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
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.auth-glass-panel', { y: 40, opacity: 0, scale: 0.95, duration: 0.6 })
      .from('.auth-logo', { y: -20, opacity: 0, duration: 0.4 }, '-=0.3')
      .from('.auth-orb-pink', { scale: 0, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }, '-=0.4')
      .from('.auth-orb-blue', { scale: 0, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }, '-=0.7');
  }, { scope: containerRef });

  const switchMode = (newMode: AuthMode) => {
    if (newMode === mode) return;

    // Animate the panel transition
    const panel = panelRef.current;
    if (!panel) return;

    gsap.to(panel, {
      rotateY: newMode === 'register' ? 3 : -3,
      scale: 0.97,
      opacity: 0.7,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setMode(newMode);
        setPassword('');
        gsap.to(panel, {
          rotateY: 0,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.5)',
        });
      },
    });

    // Animate background orbs color swap
    if (newMode === 'register') {
      gsap.to('.auth-orb-pink', { x: 80, y: -40, scale: 1.2, duration: 0.6, ease: 'power2.inOut' });
      gsap.to('.auth-orb-blue', { x: -80, y: 40, scale: 0.9, duration: 0.6, ease: 'power2.inOut' });
    } else {
      gsap.to('.auth-orb-pink', { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'power2.inOut' });
      gsap.to('.auth-orb-blue', { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'power2.inOut' });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-dark-900 flex items-center justify-center relative overflow-hidden px-4">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="auth-orb-pink absolute top-1/4 left-1/4 w-80 h-80 bg-brand-pink rounded-full blur-[160px] opacity-8" />
        <div className="auth-orb-blue absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue rounded-full blur-[180px] opacity-6" />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-dark-300 hover:text-white transition-colors z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Volver</span>
      </button>

      {/* Glass panel */}
      <div
        ref={panelRef}
        className="auth-glass-panel glass-card rounded-2xl w-full max-w-md relative z-10"
        style={{ perspective: '1000px' }}
      >
        {/* Logo */}
        <div className="auth-logo text-center pt-8 pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gamepad2 className="w-8 h-8 text-brand-pink" />
            <span className="font-title text-2xl font-bold text-slate-100 uppercase tracking-tight">
              Tecno<span className="text-brand-blue">ber</span>
            </span>
          </div>
        </div>

        {/* Mode toggle tabs */}
        <div className="mx-6 mb-6">
          <div className="flex glass rounded-lg p-1">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all cursor-pointer uppercase tracking-wider ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-brand-pink to-brand-blue text-white shadow-lg'
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all cursor-pointer uppercase tracking-wider ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-brand-blue to-brand-pink text-white shadow-lg'
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              Registro
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={e => e.preventDefault()} className="px-6 pb-8 space-y-4">
          {/* Name field (register only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs text-dark-200 uppercase tracking-wider font-semibold mb-1.5">
                Nombre completo
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full px-4 py-3 glass rounded-lg text-slate-100 text-sm placeholder:text-dark-400 outline-none focus:ring-1 focus:ring-brand-blue/50 transition-all bg-transparent"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs text-dark-200 uppercase tracking-wider font-semibold mb-1.5">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full px-4 py-3 glass rounded-lg text-slate-100 text-sm placeholder:text-dark-400 outline-none focus:ring-1 focus:ring-brand-blue/50 transition-all bg-transparent"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-dark-200 uppercase tracking-wider font-semibold mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 glass rounded-lg text-slate-100 text-sm placeholder:text-dark-400 outline-none focus:ring-1 focus:ring-brand-blue/50 transition-all bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password strength (register mode only) */}
            {mode === 'register' && password.length > 0 && (
              <div className="mt-3 space-y-2">
                {/* Strength bar */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(level => (
                    <div
                      key={level}
                      className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: level <= strength.score ? strength.color : '#2d2d3d',
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                  <span className="text-xs text-dark-400">{strength.score}/5</span>
                </div>

                {/* Checks */}
                <div className="space-y-1">
                  {strength.checks.map(check => (
                    <div key={check.label} className="flex items-center gap-2 text-xs">
                      {check.passed ? (
                        <Check className="w-3.5 h-3.5 text-accent-green" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-dark-400" />
                      )}
                      <span className={check.passed ? 'text-dark-100' : 'text-dark-400'}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={`w-full py-3 text-white font-bold rounded-lg transition-all cursor-pointer shadow-lg text-sm uppercase tracking-wider ${
              mode === 'login'
                ? 'bg-gradient-to-r from-brand-pink to-brand-blue hover:from-brand-pink-light hover:to-brand-blue-light shadow-brand-pink/15'
                : 'bg-gradient-to-r from-brand-blue to-brand-pink hover:from-brand-blue-light hover:to-brand-pink-light shadow-brand-blue/15'
            }`}
          >
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-dark-500" />
            <span className="text-xs text-dark-400">o continúa con</span>
            <div className="flex-1 h-px bg-dark-500" />
          </div>

          {/* Social login placeholder */}
          <button
            type="button"
            className="w-full py-2.5 glass rounded-lg text-dark-200 hover:text-white text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
        </form>
      </div>
    </div>
  );
}
