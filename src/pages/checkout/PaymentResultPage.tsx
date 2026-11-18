import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const PaymentResultPage: React.FC = () => {
  const { navigate, routeParams } = useApp();
  const status = routeParams.status || 'success'; // 'success' | 'failed' | 'pending'

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
        {status === 'success' && (
          <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-6 sm:p-8 space-y-6 shadow-card-hover text-center">
            <div className="w-14 h-14 rounded-full bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-center text-[#805536] mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-[#805536]" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#805536]">
                Payment Successful • ₹1,499
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-[#29251F]">
                You're in. Let's build your profile.
              </h1>
              <p className="text-xs text-[#665E54] leading-relaxed">
                Your founding membership is active with 8 mentor session credits. The next step is
                to complete the matching wizard so we can introduce your Four.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-between text-xs text-[#665E54]">
              <span>Receipt ID: NC-TX-84920</span>
              <span className="text-[#805536] font-bold">Active & Verified</span>
            </div>

            <button
              onClick={() => navigate('/onboarding')}
              className="w-full nc-button-primary py-3.5 text-xs font-bold shadow-md"
            >
              <span>Start my profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {status === 'failed' && (
          <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-6 sm:p-8 space-y-6 shadow-card text-center">
            <div className="w-14 h-14 rounded-full bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-center text-[#805536] mx-auto shadow-sm">
              <XCircle className="w-8 h-8 text-[#805536]" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C8173]">
                Transaction Declined
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-[#29251F]">
                Payment could not be completed
              </h1>
              <p className="text-xs text-[#665E54] leading-relaxed">
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
          <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-6 sm:p-8 space-y-6 shadow-card text-center">
            <div className="w-14 h-14 rounded-full bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-center text-[#805536] mx-auto animate-pulse shadow-sm">
              <Clock className="w-8 h-8 text-[#805536]" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C8173]">
                Awaiting Bank Confirmation
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-[#29251F]">
                Payment is pending
              </h1>
              <p className="text-xs text-[#665E54] leading-relaxed">
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

      <footer className="h-14 border-t border-[#DCD1C0] bg-[#F3EDE3] px-6 flex items-center justify-center text-xs text-[#8C8173]">
        <span>© 2026 Nightclub. Privacy-first network for Telugu AI builders.</span>
      </footer>
    </div>
  );
};
