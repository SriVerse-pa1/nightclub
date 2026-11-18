import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
import {
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const { navigate, fourTeam } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sampleTeammate = fourTeam.members[1]; // Karthik Varma (Business)

  // Password strength checker (warm tones)
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: 'Enter password', color: 'bg-[#DCD1C0]', width: '0%' };
    if (pass.length < 6) return { label: 'Too short (min 6 chars)', color: 'bg-[#8C8173]', width: '25%' };
    if (pass.length < 8) return { label: 'Fair', color: 'bg-[#96603B]', width: '50%' };
    if (/[0-9]/.test(pass) && /[a-zA-Z]/.test(pass)) {
      return { label: 'Strong', color: 'bg-[#805536]', width: '100%' };
    }
    return { label: 'Medium', color: 'bg-[#805536]/70', width: '75%' };
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
      navigate('/verify-email', { email, name });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F3EDE3] text-[#29251F] flex flex-col justify-between font-body selection:bg-[#805536]/15 selection:text-[#29251F]">
      {/* Header */}
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
          onClick={() => navigate('/login')}
          className="text-xs text-[#665E54] hover:text-[#29251F] font-medium transition-colors"
        >
          Already a member? <strong className="text-[#805536]">Log in</strong>
        </button>
      </header>

      {/* Main Split Screen */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
          {/* Form Side */}
          <div className="lg:col-span-6 max-w-md w-full mx-auto space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-wider text-[#805536] font-semibold">
                Founding Member Application
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#29251F]">
                Create your builder profile
              </h1>
              <p className="text-xs text-[#665E54]">
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
              <div className="border-t border-[#DCD1C0] w-full" />
              <span className="bg-[#F3EDE3] px-3 text-[11px] text-[#8C8173] uppercase font-semibold">
                Or with email
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {error && (
                <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#805536]/30 text-[#805536] text-xs flex items-center gap-2 shadow-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#805536]" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-[#665E54] font-medium mb-1">Full Name</label>
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
                <label className="block text-[#665E54] font-medium mb-1">Email address</label>
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
                <label className="block text-[#665E54] font-medium mb-1">Password</label>
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8173] hover:text-[#29251F]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password strength bar */}
                {password && (
                  <div className="mt-1.5 space-y-1">
                    <div className="w-full h-1.5 bg-[#E7DCCB] rounded-full overflow-hidden border border-[#DCD1C0]">
                      <div
                        style={{ width: strength.width }}
                        className={`h-full transition-all duration-300 ${strength.color}`}
                      />
                    </div>
                    <span className="text-[10px] text-[#8C8173]">{strength.label}</span>
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
                  className="accent-[#805536] w-4 h-4 rounded mt-0.5"
                />
                <label htmlFor="terms" className="text-[#665E54] text-[11px] leading-relaxed cursor-pointer">
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

              <div className="p-3.5 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#665E54]">Complementary fit</span>
                  <span className="text-[#805536] font-bold bg-[#805536]/10 px-2 py-0.5 rounded border border-[#805536]/25">92%</span>
                </div>
                <p className="text-[11px] text-[#29251F] leading-relaxed pt-1">
                  Connects your software with sales distribution across Telugu tech networks and
                  angel investment circles.
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

      <footer className="h-14 border-t border-[#DCD1C0] px-6 flex items-center justify-center text-xs text-[#8C8173] bg-[#F3EDE3]">
        <span>© 2026 Nightclub. Privacy-first network for Telugu AI builders.</span>
      </footer>
    </div>
  );
};
