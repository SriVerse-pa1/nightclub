import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
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
    <div className="min-h-screen bg-[#17102A] text-[#F3EEFF] flex flex-col justify-between">
      {/* Top Simple Nav */}
      <header className="h-16 px-6 border-b border-[#3A2E5C] flex items-center justify-between">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#22183B] border border-[#FFB547]/50 flex items-center justify-center text-[#FFB547] font-bold">
            N
          </div>
          <span className="font-heading font-bold text-base tracking-wider text-[#F3EEFF]">
            NIGHTCLUB
          </span>
        </div>

        <button
          onClick={() => navigate('/signup')}
          className="text-xs text-[#A99CCB] hover:text-[#FFB547] font-medium"
        >
          Need an account? <strong>Sign up</strong>
        </button>
      </header>

      {/* Main Split-Screen Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
          {/* Left: Login Form */}
          <div className="lg:col-span-6 max-w-md w-full mx-auto space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-[#FFB547] font-semibold">
                Welcome back
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF]">
                Log in to Nightclub
              </h1>
              <p className="text-xs text-[#A99CCB]">
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
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                  />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => login('apple.user@example.com')}
                className="w-full nc-button-secondary py-2.5 text-xs font-medium justify-center"
              >
                <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.84.94-2.92-1 .04-2.13.67-2.76 1.44-.56.67-1.04 1.77-.92 2.82 1.11.09 2.11-.57 2.74-1.34z" />
                </svg>
                Continue with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#3A2E5C] w-full" />
              <span className="bg-[#17102A] px-3 text-[11px] text-[#7C6F9B] uppercase font-semibold">
                Or with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-[#A99CCB] font-medium mb-1">Email address</label>
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
                  <label className="text-[#A99CCB] font-medium">Password</label>
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-[11px] text-[#FFB547] hover:underline"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A99CCB] hover:text-[#F3EEFF]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full nc-button-primary py-3 text-xs font-semibold"
              >
                {isLoading ? 'Signing in...' : 'Sign in to Nightclub'}
              </button>
            </form>
          </div>

          {/* Right: Calm Find Your Four Preview Panel (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col items-center justify-center pl-8 border-l border-[#3A2E5C]">
            <div className="w-full max-w-sm bg-[#1E1537] border border-[#3A2E5C] rounded-3xl p-6 shadow-glow-card space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFB547]">
                Your Team is Already Out There
              </span>

              <div className="flex items-center gap-3">
                <img
                  src={sampleTeammate.avatar}
                  alt={sampleTeammate.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#3A2E5C]"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#F3EEFF]">
                    {sampleTeammate.name}
                  </h4>
                  <p className="text-[11px] text-[#A99CCB]">{sampleTeammate.roleTitle}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <RoleBadge role={sampleTeammate.role} size="sm" />
                    <span className="text-[10px] text-[#7C6F9B]">{sampleTeammate.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#17102A] border border-[#3A2E5C] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#A99CCB]">Complementary fit</span>
                  <span className="text-[#FFB547] font-bold">94%</span>
                </div>
                <p className="text-[11px] text-[#F3EEFF]/80 leading-relaxed pt-1">
                  Covers your design blindspot with 4 years of proven design systems craftsmanship.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-[#7C6F9B]">
                <span className="flex items-center gap-1 text-[#2DD4BF]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Builder
                </span>
                <span>Hyderabad Cohort</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="h-14 border-t border-[#3A2E5C] px-6 flex items-center justify-center text-xs text-[#7C6F9B]">
        <span>© 2026 Nightclub. Privacy-first network for Telugu AI builders.</span>
      </footer>
    </div>
  );
};
