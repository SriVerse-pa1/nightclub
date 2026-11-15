import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Shield,
  Sparkles,
  Lock,
  CheckCircle2,
  Calendar,
  XCircle,
} from 'lucide-react';

export const SubscriptionStatePage: React.FC = () => {
  const {
    settings,
    pauseSubscription,
    cancelSubscription,
    reactivateSubscription,
    navigate,
  } = useApp();

  const [step, setStep] = useState<'survey' | 'confirm_pause' | 'confirm_cancel' | 'lapsed'>('survey');
  const [cancelReason, setCancelReason] = useState('Found full-time team');

  const isLapsed = settings.subscription.status === 'lapsed' || settings.subscription.status === 'canceled';

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="pb-4 border-b border-[#3A2E5C]">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF]">
          Membership Status & Management
        </h1>
        <p className="text-xs text-[#A99CCB] mt-0.5">
          Review your subscription health, pause your payments, or reactivate your founding seat.
        </p>
      </div>

      {/* LAPSED STATE PREVIEW */}
      {(isLapsed || step === 'lapsed') ? (
        <div className="bg-[#1C1431] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-glow-card text-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400">
                Membership Inactive / Lapsed
              </span>
              <h2 className="font-heading font-bold text-lg text-[#F3EEFF]">
                Your Nightclub features are paused
              </h2>
            </div>
          </div>

          <p className="text-[#A99CCB] leading-relaxed">
            You can still view your public profile and past project milestones, but private chat,
            active Build Rooms, and 8 monthly 1-on-1 mentor sessions are currently locked.
          </p>

          <div className="p-4 bg-[#17102A] rounded-2xl border border-[#3A2E5C] space-y-2">
            <span className="font-bold text-[#F3EEFF]">What unlocks upon rejoining:</span>
            <p>• Immediate restoration of 8 fresh 1-on-1 mentor credits</p>
            <p>• Active matching in the Telugu AI complementary graph</p>
            <p>• Unlocked private messaging with connected peers</p>
          </div>

          <button
            onClick={reactivateSubscription}
            className="w-full nc-button-primary py-3.5 text-xs font-bold shadow-glow-accent"
          >
            <span>Reactivate Founding Membership (₹1,499/mo)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* ACTIVE / PAUSE / CANCEL FLOW */
        <div className="space-y-6 text-xs">
          {step === 'survey' && (
            <div className="bg-[#22183B] border border-[#3A2E5C] rounded-3xl p-6 sm:p-8 space-y-6 shadow-glow-card">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-[#FFB547]">
                  Manage Your Subscription
                </span>
                <h2 className="font-heading font-bold text-xl text-[#F3EEFF]">
                  Need to take a breather?
                </h2>
                <p className="text-xs text-[#A99CCB]">
                  Tell us why you are considering stepping away so we can help:
                </p>
              </div>

              <div className="space-y-2">
                {[
                  'Busy with college exams or work deadlines',
                  'Already assembled my founding team of five',
                  'Want to pause until next month',
                  'Financial reasons',
                  'Not enough time to use all 8 mentor sessions',
                ].map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => setCancelReason(reason)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      cancelReason === reason
                        ? 'border-[#FFB547] bg-[#FFB547]/10 text-[#F3EEFF] font-semibold'
                        : 'border-[#3A2E5C] bg-[#17102A] text-[#A99CCB] hover:border-[#A99CCB]'
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>

              {/* Retention Preview: What You'll Lose */}
              <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-2xl space-y-2 text-rose-300">
                <span className="font-bold flex items-center gap-1.5 text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                  What you will lose upon cancellation:
                </span>
                <p>• Your locked-in ₹1,499 founding member monthly price</p>
                <p>• 8 personal 1-on-1 mentor credits every month</p>
                <p>• Access to your private 5-person team Build Room</p>
              </div>

              {/* Pause Recommendation */}
              <div className="p-4 bg-[#17102A] border border-[#FFB547]/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-[#FFB547]">
                    Option: Pause for 1 Month (Recommended)
                  </h4>
                  <p className="text-[11px] text-[#A99CCB] mt-0.5">
                    No charges next month. Your team and founding rate remain reserved.
                  </p>
                </div>
                <button
                  onClick={pauseSubscription}
                  className="nc-button-primary text-xs py-2 px-4 shrink-0"
                >
                  Pause for 1 Month
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => navigate('/settings')}
                  className="nc-button-secondary py-2 px-4"
                >
                  Keep My Membership
                </button>
                <button
                  onClick={cancelSubscription}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Continue to Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
