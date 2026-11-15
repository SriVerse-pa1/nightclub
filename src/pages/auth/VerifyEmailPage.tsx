import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

export const VerifyEmailPage: React.FC = () => {
  const { navigate, routeParams, signup } = useApp();
  const email = routeParams.email || 'builder@telugu.ai';
  const name = routeParams.name || 'Venkata Sai Kumar';

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    // Auto focus next box
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      signup({ name, username: name.toLowerCase().replace(/\s+/g, '_') });
    }, 600);
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(60);
      setDigits(['', '', '', '', '', '']);
    }
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
        <div className="bg-[#1E1537] border border-[#3A2E5C] rounded-3xl p-6 sm:p-8 space-y-6 shadow-glow-card text-center">
          <div className="w-12 h-12 rounded-full bg-[#FFB547]/10 border border-[#FFB547]/30 flex items-center justify-center text-[#FFB547] mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h1 className="font-heading font-bold text-xl text-[#F3EEFF]">Check your email</h1>
            <p className="text-xs text-[#A99CCB]">
              We sent a 6-digit confirmation code to <strong>{email}</strong>
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            {/* 6 OTP boxes */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {digits.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(i, e.target.value)}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center font-heading font-bold text-lg bg-[#17102A] border border-[#3A2E5C] rounded-xl text-[#F3EEFF] focus:border-[#FFB547] focus:ring-1 focus:ring-[#FFB547] outline-none"
                />
              ))}
            </div>

            <div className="text-xs text-[#A99CCB] flex items-center justify-center gap-1">
              <span>Didn't receive code?</span>
              <button
                type="button"
                disabled={timer > 0}
                onClick={handleResend}
                className="text-[#FFB547] hover:underline disabled:opacity-50 disabled:no-underline font-medium"
              >
                {timer > 0 ? `Resend in ${timer}s` : 'Resend code now'}
              </button>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full nc-button-primary py-3 text-xs font-semibold"
            >
              {isVerifying ? 'Verifying code...' : 'Verify & Launch Onboarding'}
            </button>
          </form>
        </div>
      </main>

      <footer className="h-14 border-t border-[#3A2E5C] px-6 flex items-center justify-center text-xs text-[#7C6F9B]">
        <span>© 2026 Nightclub. Privacy-first network for Telugu AI builders.</span>
      </footer>
    </div>
  );
};
