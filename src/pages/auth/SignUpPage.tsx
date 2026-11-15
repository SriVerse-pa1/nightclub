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

export const SignUpPage: React.FC = () => {
  const { navigate, signup, fourTeam } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sampleTeammate = fourTeam.members[1]; // Karthik Varma (Business)

  // Password strength checker
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: 'Enter password', color: 'bg-zinc-700', width: '0%' };
    if (pass.length < 6) return { label: 'Too short (min 6 chars)', color: 'bg-rose-500', width: '25%' };
    if (pass.length < 8) return { label: 'Fair', color: 'bg-amber-500', width: '50%' };
    if (/[0-9]/.test(pass) && /[a-zA-Z]/.test(pass)) {
      return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
    }
    return { label: 'Medium', color: 'bg-sky-500', width: '75%' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your full name so teammates know who to address.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the membership guidelines and privacy terms.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to email verification screen
      navigate('/verify-email', { email, name });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#17102A] text-[#F3EEFF] flex flex-col justify-between">
      {/* Header */}
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
          onClick={() => navigate('/login')}
          className="text-xs text-[#A99CCB] hover:text-[#FFB547] font-medium"
        >
          Already a member? <strong>Log in</strong>
        </button>
      </header>

      {/* Main Split Screen */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
          {/* Form Side */}
          <div className="lg:col-span-6 max-w-md w-full mx-auto space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-[#FFB547] font-semibold">
                Founding Member Application
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF]">
                Create your builder profile
              </h1>
              <p className="text-xs text-[#A99CCB]">
                Join the Telugu AI community. Get matched with 4 complementary teammates.
              </p>
            </div>

            {/* Social options */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => navigate('/verify-email', { email: 'google.user@example.com', name: 'Google Builder' })}
                className="w-full nc-button-secondary py-2.5 text-xs font-medium justify-center"
              >
                Continue with Google
              </button>
              <button
                type="button"
                onClick={() => navigate('/verify-email', { email: 'apple.user@example.com', name: 'Apple Builder' })}
                className="w-full nc-button-secondary py-2.5 text-xs font-medium justify-center"
              >
                Continue with Apple
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#3A2E5C] w-full" />
              <span className="bg-[#17102A] px-3 text-[11px] text-[#7C6F9B] uppercase font-semibold">
                Or with email
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-[#A99CCB] font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Venkata Sai Kumar"
                  className="w-full nc-input"
                />
              </div>

              <div>
                <label className="block text-[#A99CCB] font-medium mb-1">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full nc-input"
                />
              </div>

              <div>
                <label className="block text-[#A99CCB] font-medium mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters..."
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

                {/* Password strength bar */}
                {password && (
                  <div className="mt-1.5 space-y-1">
                    <div className="w-full h-1 bg-[#17102A] rounded-full overflow-hidden border border-[#3A2E5C]">
                      <div
                        style={{ width: strength.width }}
                        className={`h-full transition-all duration-300 ${strength.color}`}
                      />
                    </div>
                    <span className="text-[10px] text-[#A99CCB]">{strength.label}</span>
                  </div>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="accent-[#FFB547] w-4 h-4 rounded mt-0.5"
                />
                <label htmlFor="terms" className="text-[#A99CCB] text-[11px] leading-relaxed cursor-pointer">
                  I agree to the Nightclub Community Guidelines, respectful builder conduct, and
                  privacy terms.
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full nc-button-primary py-3 text-xs font-semibold"
              >
                {isLoading ? 'Creating account...' : 'Create Account & Continue'}
              </button>
            </form>
          </div>

          {/* Right Preview */}
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
                  <span className="text-[#FFB547] font-bold">92%</span>
                </div>
                <p className="text-[11px] text-[#F3EEFF]/80 leading-relaxed pt-1">
                  Connects your software with sales distribution across Telugu tech networks and
                  angel investment circles.
                </p>
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
