import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F3EDE3] text-[#29251F] flex flex-col justify-between font-body selection:bg-[#805536]/15 selection:text-[#29251F]">
      <header className="h-16 px-6 border-b border-[#DCD1C0] bg-[#F3EDE3] flex items-center justify-between">
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-[#805536] border border-[#805536] flex items-center justify-center text-white font-bold shadow-sm">
            N
          </div>
          <span className="font-heading font-bold text-base tracking-wider text-[#29251F]">
            NIGHTCLUB
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-12 flex flex-col justify-center">
        <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-6 sm:p-8 space-y-5 shadow-card">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-1.5 text-xs text-[#665E54] hover:text-[#29251F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to login</span>
          </button>

          {!submitted ? (
            <>
              <div className="space-y-1">
                <h1 className="font-heading font-bold text-xl text-[#29251F]">Reset your password</h1>
                <p className="text-xs text-[#665E54]">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
              <div className="w-12 h-12 rounded-full bg-[#E7DCCB] border border-[#DCD1C0] flex items-center justify-center text-[#805536] mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-bold text-lg text-[#29251F]">Password reset sent</h2>
              <p className="text-xs text-[#665E54] leading-relaxed">
                We have emailed instructions to <strong className="text-[#29251F]">{email}</strong>. Check your inbox and spam folder.
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

      <footer className="h-14 border-t border-[#DCD1C0] px-6 flex items-center justify-center text-xs text-[#8C8173] bg-[#F3EDE3]">
        <span>© 2026 Nightclub. Privacy-first network for Telugu AI builders.</span>
      </footer>
    </div>
  );
};
