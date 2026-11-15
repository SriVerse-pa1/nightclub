import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  RotateCcw,
  Clock,
  HelpCircle,
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-[#17102A] text-[#F3EEFF] flex flex-col pb-16 lg:pb-0">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 w-full">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FFB547]">
            Transparent Pricing
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#F3EEFF]">
            One simple plan for serious builders
          </h1>
          <p className="text-xs sm:text-sm text-[#A99CCB] leading-relaxed">
            No convoluted tiers or hidden fees. Full access to the complementary matching graph,
            private Build Rooms, and 8 personal mentor strategy sessions every single month.
          </p>
        </div>

        {/* Single Prominent Plan Card */}
        <div className="bg-[#22183B] border-2 border-[#FFB547] rounded-3xl p-6 sm:p-10 shadow-glow-card max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#FFB547] text-[#17102A] text-[10px] font-extrabold uppercase px-4 py-1 rounded-bl-xl tracking-wider">
            Founding Member Rate
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#3A2E5C]">
            <div>
              <h2 className="font-heading font-bold text-2xl text-[#F3EEFF]">Founding Builder</h2>
              <p className="text-xs text-[#A99CCB] mt-0.5">
                Full network, matching, and mentorship privileges
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[#F3EEFF]">₹1,499</span>
                <span className="text-xs text-[#A99CCB]">/ month</span>
              </div>
              <span className="text-[10px] text-[#2DD4BF] font-medium">Billed monthly • Cancel anytime</span>
            </div>
          </div>

          {/* Inclusions */}
          <div className="py-6 space-y-3.5 text-xs text-[#F3EEFF]">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#FFB547] shrink-0" />
              <span>
                <strong>System-made Introductions:</strong> Graph matches you with complementary peers automatically.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#FFB547] shrink-0" />
              <span>
                <strong>Find Your Four:</strong> Signature 5-person complementary team constellation.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#FFB547] shrink-0" />
              <span>
                <strong>8 Personal 30-min Mentor Sessions / Month:</strong> Direct 1-on-1 strategy calls with industry leaders.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#FFB547] shrink-0" />
              <span>
                <strong>Build Rooms & Kanban:</strong> Private workspace for task management and milestone tracking.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#FFB547] shrink-0" />
              <span>
                <strong>End-to-End Private Chat:</strong> Unlocked upon mutual connection.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#FFB547] shrink-0" />
              <span>
                <strong>Community Circles & Careers Board:</strong> Curated remote opportunities & regional meetups.
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full nc-button-primary py-3.5 text-sm font-bold shadow-glow-accent"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* How Credits Work Explainer (Visual of 8 Dots) */}
        <div className="bg-[#1C1431] border border-[#3A2E5C] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FFB547]" />
            <h3 className="font-heading font-bold text-base text-[#F3EEFF]">
              How the 8 Mentor Credits Work
            </h3>
          </div>

          <p className="text-xs text-[#A99CCB] leading-relaxed">
            Every billing cycle on the 1st of the month, 8 fresh mentor session credits are loaded
            into your account. Each credit books one private 30-minute video session with any mentor
            on the roster.
          </p>

          {/* 8 Dots Visual */}
          <div className="py-2">
            <div className="grid grid-cols-8 gap-2 sm:gap-4 max-w-md mx-auto">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#FFB547]/20 border border-[#FFB547] flex items-center justify-center text-[#FFB547] text-xs font-bold shadow">
                    {i + 1}
                  </div>
                  <span className="text-[9px] text-[#A99CCB]">30m</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#17102A] border border-[#3A2E5C] flex items-start gap-2 text-xs text-[#A99CCB]">
            <Clock className="w-4 h-4 text-[#FFB547] shrink-0 mt-0.5" />
            <span>
              <strong>Monthly Reset Policy:</strong> Credits do not roll over to subsequent months.
              This guarantees our mentors have predictable calendar availability and encourages
              teams to seek weekly feedback while building.
            </span>
          </div>
        </div>

        {/* Honest Comparison With Free Networks */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <h3 className="font-heading font-bold text-xl text-[#F3EEFF] text-center">
            How Nightclub compares to free networks
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#3A2E5C] text-[#A99CCB]">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4 text-[#F3EEFF]">Free Forums & Groups</th>
                  <th className="py-3 px-4 text-[#FFB547] font-bold">Nightclub</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3A2E5C]/60 text-[#A99CCB]">
                <tr>
                  <td className="py-3 px-4 font-medium text-[#F3EEFF]">Matching Mechanism</td>
                  <td className="py-3 px-4">Unstructured cold posting & noise</td>
                  <td className="py-3 px-4 text-[#F3EEFF] font-semibold">
                    System-made complementary graph introduction
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#F3EEFF]">Team Formation</td>
                  <td className="py-3 px-4">You search and hope people respond</td>
                  <td className="py-3 px-4 text-[#F3EEFF] font-semibold">
                    Find Your Four: Balanced 5-person mesh
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#F3EEFF]">1-on-1 Mentorship</td>
                  <td className="py-3 px-4">None, or ₹3,000+ per hour externally</td>
                  <td className="py-3 px-4 text-[#FFB547] font-semibold">
                    8 Sessions Included Every Month
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#F3EEFF]">Member Accountability</td>
                  <td className="py-3 px-4">High dropout & ghosting rate</td>
                  <td className="py-3 px-4 text-[#F3EEFF] font-semibold">
                    Verified builders with skin in the game
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#F3EEFF]">Contact Privacy</td>
                  <td className="py-3 px-4">Public emails scraped by recruiters</td>
                  <td className="py-3 px-4 text-[#2DD4BF] font-semibold">
                    Strictly protected until mutual connection
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cancellation and Refund Policy */}
        <div className="p-6 rounded-2xl bg-[#1C1431] border border-[#3A2E5C] max-w-2xl mx-auto space-y-3 text-xs text-[#A99CCB]">
          <div className="flex items-center gap-2 text-[#F3EEFF] font-semibold">
            <RotateCcw className="w-4 h-4 text-[#2DD4BF]" />
            <span>Pause, Cancellation & Refund Policy</span>
          </div>
          <p className="leading-relaxed">
            Need to take a study or work break? You can pause your membership for 1 month at any
            time. If you choose to cancel, your access continues until the end of the current billing
            period without penalty. We also provide a no-questions-asked 14-day refund window for
            new founding members.
          </p>
        </div>
      </main>

      {/* Sticky Mobile Summary Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#17102A]/95 backdrop-blur-md border-t border-[#3A2E5C] p-3 flex items-center justify-between safe-area-inset-bottom">
        <div>
          <span className="text-xs font-bold text-[#F3EEFF]">Founding Membership</span>
          <span className="text-[10px] text-[#A99CCB] block">₹1,499/mo • 8 mentor sessions</span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="nc-button-primary text-xs py-2 px-4"
        >
          <span>Join Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <Footer />
    </div>
  );
};
