import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
import {
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigate, login, fourTeam } = useApp();

  const [email, setEmail] = useState('sai.venkata@example.com');
  const [password, setPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sampleTeammate = fourTeam.members[0]; // Ananya Reddy (Design)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide both your registered email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(email);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F3EDE3] text-[#29251F] flex flex-col justify-between font-body selection:bg-[#805536]/15 selection:text-[#29251F]">
      {/* Top Simple Nav */}
      <header className="h-16 px-6 border-b border-[#DCD1C0] bg-[#F3EDE3] flex items-center justify-between">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#805536] border border-[#805536] flex items-center justify-center text-white font-bold shadow-sm">
            N
          </div>
          <span className="font-heading font-bold text-base tracking-wider text-[#29251F]">
            NIGHTCLUB
          </span>
        </div>

        <button
          onClick={() => navigate('/signup')}
          className="text-xs text-[#665E54] hover:text-[#29251F] font-medium transition-colors"
        >
          Need an account? <strong className="text-[#805536]">Sign up</strong>
        </button>
      </header>

      {/* Main Split-Screen Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
          {/* Left: Login Form */}
          <div className="lg:col-span-6 max-w-md w-full mx-auto space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-[#805536] font-bold">
                Welcome back
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#29251F]">
                Log in to Nightclub
              </h1>
              <p className="text-xs text-[#665E54]">
                Your five-person team and mentor sessions are waiting.
              </p>
            </div>

            {/* Social Logins */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => login('google.user@example.com')}
                className="w-full nc-button-secondary py-2.5 text-xs font-medium justify-center"
              >
                <svg className="w-4 h-4 mr-1.5 fill-[#29251F]" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.46 14.18c-.68 1.99-2.54 3.42-4.76 3.42-2.87 0-5.2-2.33-5.2-5.2s2.33-5.2 5.2-5.2c1.37 0 2.62.53 3.56 1.41l-1.46 1.46c-.57-.55-1.32-.87-2.1-.87-1.77 0-3.2 1.43-3.2 3.2s1.43 3.2 3.2 3.2c1.43 0 2.53-.94 2.84-2.22H12.7V10.8h4.5c.08.33.12.67.12 1.04 0 1.62-.64 3.09-1.86 4.34z"/>
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => login('apple.user@example.com')}
                className="w-full nc-button-secondary py-2.5 text-xs font-medium justify-center"
              >
                <svg className="w-4 h-4 mr-1.5 fill-[#29251F]" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.84.94-2.92-1 .04-2.13.67-2.76 1.44-.56.67-1.04 1.77-.92 2.82 1.11.09 2.11-.57 2.74-1.34z" />
                </svg>
                Continue with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#DCD1C0] w-full" />
              <span className="bg-[#F3EDE3] px-3 text-[11px] text-[#8C8173] uppercase font-semibold">
                Or with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#805536]/30 text-[#805536] text-xs flex items-center gap-2 shadow-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#805536]" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-[#665E54] font-medium mb-1">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="builder@domain.com"
                  className="w-full nc-input"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[#665E54] font-medium">Password</label>
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-[11px] text-[#805536] font-medium hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full nc-input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8173] hover:text-[#29251F]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full nc-button-primary py-3 text-xs font-semibold shadow-md"
              >
                {isLoading ? 'Signing in...' : 'Sign in to Nightclub'}
              </button>
            </form>
          </div>

          {/* Right: Calm Find Your Four Preview Panel (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col items-center justify-center pl-8 border-l border-[#DCD1C0]">
            <div className="w-full max-w-sm bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-6 shadow-card space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#805536]">
                Your Team is Already Out There
              </span>

              <div className="flex items-center gap-3">
                <img
                  src={sampleTeammate.avatar}
                  alt={sampleTeammate.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#DCD1C0]"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#29251F]">
                    {sampleTeammate.name}
                  </h4>
                  <p className="text-[11px] text-[#665E54]">{sampleTeammate.roleTitle}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <RoleBadge role={sampleTeammate.role} size="sm" />
                    <span className="text-[10px] text-[#8C8173]">{sampleTeammate.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#665E54] font-medium">Complementary fit</span>
                  <span className="text-[#805536] font-bold bg-[#805536]/10 px-2 py-0.5 rounded border border-[#805536]/25">94%</span>
                </div>
                <p className="text-[11px] text-[#665E54] leading-relaxed pt-1">
                  Covers your design blindspot with 4 years of proven design systems craftsmanship.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-[#8C8173]">
                <span className="flex items-center gap-1 text-[#29251F] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#805536]" />
                  Verified Builder
                </span>
                <span>Hyderabad Cohort</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="h-14 border-t border-[#DCD1C0] bg-[#F3EDE3] px-6 flex items-center justify-center text-xs text-[#8C8173]">
        <span>© 2026 Nightclub. Privacy-first network for Telugu AI builders.</span>
      </footer>
    </div>
  );
};
