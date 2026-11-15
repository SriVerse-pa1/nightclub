import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Heart, Sparkles, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="border-t border-[#3A2E5C] bg-[#0F0A1C] text-[#A99CCB] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#22183B] border border-[#FFB547]/40 flex items-center justify-center text-[#FFB547] font-bold text-sm">
                N
              </div>
              <span className="font-heading font-bold text-base tracking-wider text-[#F3EEFF]">
                NIGHTCLUB
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-[#A99CCB]">
              A paid, community-driven network for builders from the Telugu AI community.
              We introduce complementary teams of five so you never build in isolation.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#A99CCB] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#2DD4BF]" />
              <span>Privacy-first: Member contacts protected until mutual connection.</span>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F3EEFF] mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/find-your-four')}
                  className="hover:text-[#FFB547] transition-colors"
                >
                  Find Your Four
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/build')}
                  className="hover:text-[#FFB547] transition-colors"
                >
                  Build Rooms & Teams
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/mentorship')}
                  className="hover:text-[#FFB547] transition-colors"
                >
                  1-on-1 Mentorship (8 credits)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/challenges')}
                  className="hover:text-[#FFB547] transition-colors"
                >
                  Build Challenges
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/careers')}
                  className="hover:text-[#FFB547] transition-colors"
                >
                  Careers Board
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F3EEFF] mb-3">
              Membership
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/pricing')}
                  className="hover:text-[#FFB547] transition-colors"
                >
                  Pricing & Inclusions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/subscription-flow')}
                  className="hover:text-[#FFB547] transition-colors"
                >
                  Pause & Cancellation Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/admin')}
                  className="hover:text-[#FFB547] transition-colors"
                >
                  Admin Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/system-pages')}
                  className="hover:text-[#FFB547] transition-colors"
                >
                  System & Status Pages
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F3EEFF] mb-3">
              Community
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('/circles')}
                  className="hover:text-[#FFB547] transition-colors"
                >
                  Community Circles
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/settings')}
                  className="hover:text-[#FFB547] transition-colors"
                >
                  Language (English & తెలుగు)
                </button>
              </li>
              <li>
                <span className="text-[#FFB547] inline-flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3" />
                  Founding Cohort Active
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#3A2E5C]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7C6F9B] gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 Nightclub Network. Built for Telugu AI Builders.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/settings')} className="hover:text-[#A99CCB]">
              Privacy Policy
            </button>
            <button onClick={() => navigate('/settings')} className="hover:text-[#A99CCB]">
              Terms of Membership
            </button>
            <button onClick={() => navigate('/subscription-flow')} className="hover:text-[#A99CCB]">
              Refund Guarantee
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
