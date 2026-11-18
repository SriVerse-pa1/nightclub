import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="border-t border-[#DCD1C0] bg-[#E7DCCB] text-[#665E54] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#805536] border border-[#805536] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                N
              </div>
              <span className="font-heading font-bold text-base tracking-wider text-[#29251F]">
                NIGHTCLUB
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-[#665E54]">
              A paid, community-driven network for builders from the Telugu AI community.
              We introduce complementary teams of five so you never build in isolation.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#665E54] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#805536]" />
              <span>Privacy-first: Member contacts protected until mutual connection.</span>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/find-your-four')}
                  className="hover:text-[#805536] transition-colors"
                >
                  Find Your Four
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/build')}
                  className="hover:text-[#805536] transition-colors"
                >
                  Build Rooms & Teams
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/mentorship')}
                  className="hover:text-[#805536] transition-colors"
                >
                  1-on-1 Mentorship (8 credits)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/challenges')}
                  className="hover:text-[#805536] transition-colors"
                >
                  Build Challenges
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/careers')}
                  className="hover:text-[#805536] transition-colors"
                >
                  Careers Board
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-3">
              Membership
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/pricing')}
                  className="hover:text-[#805536] transition-colors"
                >
                  Pricing & Inclusions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/subscription-flow')}
                  className="hover:text-[#805536] transition-colors"
                >
                  Pause & Cancellation Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/admin')}
                  className="hover:text-[#805536] transition-colors"
                >
                  Admin Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/system-pages')}
                  className="hover:text-[#805536] transition-colors"
                >
                  System & Status Pages
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-3">
              Community
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/circles')}
                  className="hover:text-[#805536] transition-colors"
                >
                  Community Circles
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/settings')}
                  className="hover:text-[#805536] transition-colors"
                >
                  Language (English & తెలుగు)
                </button>
              </li>
              <li>
                <span className="text-[#805536] inline-flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3 text-[#805536]" />
                  Founding Cohort Active
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#DCD1C0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C8173] gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 Nightclub Network. Built for Telugu AI Builders.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/settings')} className="hover:text-[#29251F]">
              Privacy Policy
            </button>
            <button onClick={() => navigate('/settings')} className="hover:text-[#29251F]">
              Terms of Membership
            </button>
            <button onClick={() => navigate('/subscription-flow')} className="hover:text-[#29251F]">
              Refund Guarantee
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
