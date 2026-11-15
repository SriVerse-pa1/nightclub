import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

export const PaymentResultPage: React.FC = () => {
  const { navigate, routeParams } = useApp();
  const status = routeParams.status || 'success'; // 'success' | 'failed' | 'pending'

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
        {status === 'success' && (
          <div className="bg-[#1E1537] border border-[#FFB547]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-glow-card text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FFB547]">
                Payment Successful • ₹1,499
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-[#F3EEFF]">
                You're in. Let's build your profile.
              </h1>
              <p className="text-xs text-[#A99CCB] leading-relaxed">
                Your founding membership is active with 8 mentor session credits. The next step is
                to complete the matching wizard so we can introduce your Four.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#17102A] border border-[#3A2E5C] flex items-center justify-between text-xs text-[#A99CCB]">
              <span>Receipt ID: NC-TX-84920</span>
              <span className="text-[#2DD4BF] font-semibold">Active & Verified</span>
            </div>

            <button
              onClick={() => navigate('/onboarding')}
              className="w-full nc-button-primary py-3.5 text-xs font-bold shadow-glow-accent"
            >
              <span>Start my profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {status === 'failed' && (
          <div className="bg-[#1E1537] border border-rose-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-glow-card text-center">
            <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
              <XCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                Transaction Declined
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-[#F3EEFF]">
                Payment could not be completed
              </h1>
              <p className="text-xs text-[#A99CCB] leading-relaxed">
                Your bank or UPI provider rejected the authorization. No funds have been deducted
                from your account.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full nc-button-primary py-3 text-xs font-semibold"
              >
                <span>Try again with same method</span>
              </button>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full nc-button-secondary py-3 text-xs font-medium"
              >
                <span>Use a different payment method</span>
              </button>
            </div>
          </div>
        )}

        {status === 'pending' && (
          <div className="bg-[#1E1537] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-glow-card text-center">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto animate-pulse">
              <Clock className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Awaiting Bank Confirmation
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-[#F3EEFF]">
                Payment is pending
              </h1>
              <p className="text-xs text-[#A99CCB] leading-relaxed">
                Your UPI app or bank is finalizing the verification. We will automatically activate
                your access once the status clears (usually under 2 minutes).
              </p>
            </div>

            <button
              onClick={() => navigate('/payment-result', { status: 'success' })}
              className="w-full nc-button-secondary py-3 text-xs font-medium"
            >
              <span>Check status again</span>
            </button>
          </div>
        )}
      </main>

      <footer className="h-14 border-t border-[#3A2E5C] px-6 flex items-center justify-center text-xs text-[#7C6F9B]">
        <span>© 2026 Nightclub. Privacy-first network for Telugu AI builders.</span>
      </footer>
    </div>
  );
};
