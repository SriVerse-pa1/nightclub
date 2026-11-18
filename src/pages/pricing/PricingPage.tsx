import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Clock,
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-[#F3EDE3] text-[#29251F] flex flex-col pb-16 lg:pb-0 font-body selection:bg-[#805536]/15 selection:text-[#29251F]">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 w-full">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8C8173]">
            Transparent Pricing
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#29251F]">
            One simple plan for serious builders
          </h1>
          <p className="text-xs sm:text-sm text-[#665E54] leading-relaxed">
            No convoluted tiers or hidden fees. Full access to the complementary matching graph,
            private Build Rooms, and 8 personal mentor strategy sessions every single month.
          </p>
        </div>

        {/* Single Prominent Plan Card */}
        <div className="bg-[#FFFFFF] border-2 border-[#805536]/30 rounded-3xl p-6 sm:p-10 shadow-card-hover max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#805536] text-white text-[10px] font-extrabold uppercase px-4 py-1 rounded-bl-xl tracking-wider shadow-sm">
            Founding Member Rate
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DCD1C0]">
            <div>
              <h2 className="font-heading font-bold text-2xl text-[#29251F]">Founding Builder</h2>
              <p className="text-xs text-[#665E54] mt-0.5 font-medium">
                Full network, matching, and mentorship privileges
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[#29251F]">₹1,499</span>
                <span className="text-xs text-[#665E54]">/ month</span>
              </div>
              <span className="text-[10px] text-[#8C8173] font-medium">Billed monthly • Cancel anytime</span>
            </div>
          </div>

          {/* Inclusions */}
          <div className="py-6 space-y-3.5 text-xs text-[#29251F]">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#805536] shrink-0" />
              <span>
                <strong className="text-[#29251F]">System-made Introductions:</strong> Graph matches you with complementary peers automatically.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#805536] shrink-0" />
              <span>
                <strong className="text-[#29251F]">Find Your Four:</strong> Signature 5-person complementary team constellation.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#805536] shrink-0" />
              <span>
                <strong className="text-[#29251F]">8 Personal 30-min Mentor Sessions / Month:</strong> Direct 1-on-1 strategy calls with industry leaders.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#805536] shrink-0" />
              <span>
                <strong className="text-[#29251F]">Build Rooms & Kanban:</strong> Private workspace for task management and milestone tracking.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#805536] shrink-0" />
              <span>
                <strong className="text-[#29251F]">End-to-End Private Chat:</strong> Unlocked upon mutual connection.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#805536] shrink-0" />
              <span>
                <strong className="text-[#29251F]">Community Circles & Careers Board:</strong> Curated remote opportunities & regional meetups.
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full nc-button-primary py-3.5 text-sm font-bold shadow-md"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* How Credits Work Explainer (Visual of 8 Dots) */}
        <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto space-y-4 shadow-card">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#805536]" />
            <h3 className="font-heading font-bold text-base text-[#29251F]">
              How the 8 Mentor Credits Work
            </h3>
          </div>

          <p className="text-xs text-[#665E54] leading-relaxed">
            Every billing cycle on the 1st of the month, 8 fresh mentor session credits are loaded
            into your account. Each credit books one private 30-minute video session with any mentor
            on the roster.
          </p>

          {/* 8 Dots Visual */}
          <div className="py-2">
            <div className="grid grid-cols-8 gap-2 sm:gap-4 max-w-md mx-auto">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-center text-[#805536] text-xs font-bold shadow-sm">
                    {i + 1}
                  </div>
                  <span className="text-[9px] text-[#8C8173]">30m</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] flex items-start gap-2 text-xs text-[#665E54]">
            <Clock className="w-4 h-4 text-[#805536] shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#29251F]">Monthly Reset Policy:</strong> Credits do not roll over to subsequent months.
              This guarantees our mentors have predictable calendar availability and encourages
              teams to seek weekly feedback while building.
            </span>
          </div>
        </div>

        {/* Honest Comparison With Free Networks */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <h3 className="font-heading font-bold text-xl text-[#29251F] text-center">
            How Nightclub compares to free networks
          </h3>

          <div className="overflow-x-auto bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl shadow-card p-4">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DCD1C0] text-[#8C8173]">
                  <th className="py-3 px-4 font-semibold">Feature</th>
                  <th className="py-3 px-4 text-[#665E54] font-semibold">Free Forums & Groups</th>
                  <th className="py-3 px-4 text-[#805536] font-bold">Nightclub</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCD1C0] text-[#665E54]">
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#29251F]">Matching Mechanism</td>
                  <td className="py-3 px-4">Unstructured cold posting & noise</td>
                  <td className="py-3 px-4 text-[#805536] font-semibold">
                    System-made complementary graph introduction
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#29251F]">Team Formation</td>
                  <td className="py-3 px-4">You search and hope people respond</td>
                  <td className="py-3 px-4 text-[#805536] font-semibold">
                    Find Your Four: Balanced 5-person mesh
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#29251F]">1-on-1 Mentorship</td>
                  <td className="py-3 px-4">None, or ₹3,000+ per hour externally</td>
                  <td className="py-3 px-4 text-[#805536] font-semibold">
                    8 Sessions Included Every Month
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#29251F]">Member Accountability</td>
                  <td className="py-3 px-4">High dropout & ghosting rate</td>
                  <td className="py-3 px-4 text-[#805536] font-semibold">
                    Verified builders with skin in the game
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-[#29251F]">Contact Privacy</td>
                  <td className="py-3 px-4">Public emails scraped by recruiters</td>
                  <td className="py-3 px-4 text-[#805536] font-semibold">
                    Strictly protected until mutual connection
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cancellation and Refund Policy */}
        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DCD1C0] max-w-2xl mx-auto space-y-3 text-xs text-[#665E54] shadow-card">
          <div className="flex items-center gap-2 text-[#29251F] font-bold">
            <RotateCcw className="w-4 h-4 text-[#805536]" />
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#DCD1C0] p-3 flex items-center justify-between safe-area-inset-bottom shadow-lg">
        <div>
          <span className="text-xs font-bold text-[#29251F]">Founding Membership</span>
          <span className="text-[10px] text-[#665E54] block">₹1,499/mo • 8 mentor sessions</span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="nc-button-primary text-xs py-2 px-4 shadow-sm"
        >
          <span>Join Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <Footer />
    </div>
  );
};
