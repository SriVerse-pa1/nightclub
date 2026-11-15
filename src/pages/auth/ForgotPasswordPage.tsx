import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { navigate } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#17102A] text-[#F3EEFF] flex flex-col justify-between">
      <header className="h-16 px-6 border-b border-[#3A2E5C] flex items-center justify-between">
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-[#22183B] border border-[#FFB547]/50 flex items-center justify-center text-[#FFB547] font-bold">
            N
          </div>
          <span className="font-heading font-bold text-base tracking-wider text-[#F3EEFF]">
            NIGHTCLUB
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-12 flex flex-col justify-center">
        <div className="bg-[#1E1537] border border-[#3A2E5C] rounded-3xl p-6 sm:p-8 space-y-5 shadow-glow-card">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-1.5 text-xs text-[#A99CCB] hover:text-[#F3EEFF]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to login</span>
          </button>

          {!submitted ? (
            <>
              <div className="space-y-1">
                <h1 className="font-heading font-bold text-xl text-[#F3EEFF]">Reset your password</h1>
                <p className="text-xs text-[#A99CCB]">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full nc-button-primary py-3 text-xs font-semibold"
                >
                  {isLoading ? 'Sending instructions...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-bold text-lg text-[#F3EEFF]">Password reset sent</h2>
              <p className="text-xs text-[#A99CCB] leading-relaxed">
                We have emailed instructions to <strong>{email}</strong>. Check your inbox and spam folder.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full nc-button-secondary py-2.5 text-xs mt-2"
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="h-14 border-t border-[#3A2E5C] px-6 flex items-center justify-center text-xs text-[#7C6F9B]">
        <span>© 2026 Nightclub. Privacy-first network for Telugu AI builders.</span>
      </footer>
    </div>
  );
};
