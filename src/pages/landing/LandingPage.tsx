import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { RingView } from '../../components/modules/findYourFour/RingView';
import { RoleBadge } from '../../components/common/RoleBadge';
import {
  ArrowRight,
  Sparkles,
  Users2,
  Calendar,
  Shield,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate, fourTeam, currentUser } = useApp();
  const [selectedRingMember, setSelectedRingMember] = useState(fourTeam.members[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does privacy work? Can anyone see my email or contact details?',
      a: 'Never. Nightclub is strictly privacy-first. Your contact information, email, phone number, and social profiles are completely shielded. Contact only unlocks via mutual agreement inside our end-to-end protected chat.',
    },
    {
      q: 'Who is Nightclub designed for?',
      a: 'Nightclub is built for developers, product designers, marketers, and researchers from the Telugu AI community — from university students and beginners building their first side projects to seasoned founders and engineers.',
    },
    {
      q: 'What are the 8 monthly mentor sessions and do credits rollover?',
      a: 'Every member receives 8 private 30-minute 1-on-1 sessions every month with top industry veterans (DeepMind, Swiggy, Microsoft IDC, VC founders). Credits reset promptly on the 1st of every month to encourage active shipping (no rollover).',
    },
    {
      q: 'Can beginners with little experience join?',
      a: 'Yes, absolutely! The matching algorithm evaluates your eagerness, current goals, and complementary traits. Teams frequently balance senior engineers with passionate junior builders and domain researchers.',
    },
    {
      q: 'How does the cancellation and refund policy work?',
      a: 'You can pause your membership for 1 month or cancel anytime with one click in your settings. We offer a 100% money-back guarantee within the first 14 days if you have not found value.',
    },
    {
      q: 'How are the five-person teams formed in Find Your Four?',
      a: 'Instead of forcing you to endlessly scroll directory profiles, our graph introduces you to 4 complementary members covering Build, Design, Business, and Research. You can accept the team, decline individuals, or request a rematch anytime.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3EDE3] text-[#29251F] flex flex-col font-body selection:bg-[#805536]/15 selection:text-[#29251F]">
      <Navbar />

      {/* Cohort Banner */}
      <div className="bg-[#E7DCCB] border-b border-[#DCD1C0] py-2.5 px-4 text-center text-xs text-[#665E54] flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#805536] animate-ping" />
        <span className="text-[#29251F] font-bold">Founding Cohort Active:</span>
        <span>Only 38 spots remaining for this month's intake in Hyderabad & Andhra Pradesh.</span>
        <button
          onClick={() => navigate('/pricing')}
          className="text-[#805536] font-bold hover:underline ml-1 inline-flex items-center gap-1"
        >
          Claim seat →
        </button>
      </div>

      {/* 2. Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DCD1C0] text-xs text-[#29251F] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#805536]" />
              <span className="font-medium">The Telugu AI Builders Network</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#29251F] leading-[1.1]">
              Meet the builders who <span className="underline decoration-[#805536]/40 underline-offset-8">complete</span> your team.
            </h1>

            <p className="text-sm sm:text-base text-[#665E54] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Stop building in isolation or searching endless feeds. Nightclub introduces you to
              four complementary peers — an engineer, designer, strategist, and researcher — into
              one high-output team of five.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => navigate('/pricing')}
                className="w-full sm:w-auto nc-button-primary text-sm py-3 px-6"
              >
                <span>Join Nightclub</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto nc-button-secondary text-sm py-3 px-6"
              >
                <span>See how it works</span>
              </button>
            </div>

            {/* Micro stats */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#665E54]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#805536]" />
                <span>8 Monthly 1-on-1 Mentor Sessions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#805536]" />
                <span>Privacy-First Protected</span>
              </div>
            </div>
          </div>

          {/* Right Visual: Live Find Your Four Interactive Ring */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-5 sm:p-7 shadow-card relative">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#DCD1C0]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#805536] animate-pulse" />
                  <span className="text-xs font-semibold text-[#29251F]">
                    Find Your Four — Live Constellation
                  </span>
                </div>
                <span className="text-[11px] text-[#805536] font-semibold bg-[#805536]/10 px-2 py-0.5 rounded-full border border-[#805536]/25">
                  Interactive Preview
                </span>
              </div>

              {/* The Ring */}
              <RingView
                fourTeam={fourTeam}
                currentUser={currentUser}
                selectedMember={selectedRingMember}
                onSelectMember={(m) => setSelectedRingMember(m)}
                compact
              />

              {/* Quick Selected Teammate Pill */}
              {selectedRingMember && (
                <div className="mt-4 p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={selectedRingMember.avatar}
                      alt={selectedRingMember.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#DCD1C0]"
                    />
                    <div>
                      <p className="font-semibold text-[#29251F]">{selectedRingMember.name}</p>
                      <p className="text-[10px] text-[#665E54]">{selectedRingMember.roleTitle}</p>
                    </div>
                  </div>
                  <RoleBadge role={selectedRingMember.role} size="sm" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem Section */}
      <section className="py-16 bg-[#E7DCCB] border-y border-[#DCD1C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C8173]">
              The Collaboration Problem
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#29251F]">
              Why finding great collaborators fails today
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="nc-card p-6 space-y-3 bg-[#FFFFFF] border border-[#DCD1C0] shadow-card">
              <div className="w-10 h-10 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-center text-[#805536]">
                <Users2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-base text-[#29251F]">
                Homogeneous Feeds
              </h3>
              <p className="text-xs text-[#665E54] leading-relaxed">
                Platforms recommend people exactly like you. Developers match with developers,
                leaving you without the designers and growth strategists required to actually ship.
              </p>
            </div>

            <div className="nc-card p-6 space-y-3 bg-[#FFFFFF] border border-[#DCD1C0] shadow-card">
              <div className="w-10 h-10 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-center text-[#805536]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-base text-[#29251F]">
                Cold Outbound Fatigue
              </h3>
              <p className="text-xs text-[#665E54] leading-relaxed">
                Sending 50 cold LinkedIn or Twitter DMs leads to ghosting, awkward skill mismatches,
                and misaligned time commitments that kill projects in week one.
              </p>
            </div>

            <div className="nc-card p-6 space-y-3 bg-[#FFFFFF] border border-[#DCD1C0] shadow-card">
              <div className="w-10 h-10 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-center text-[#805536]">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-base text-[#29251F]">
                Zero Accountability
              </h3>
              <p className="text-xs text-[#665E54] leading-relaxed">
                Free forums are full of noise and spam. Without skin in the game, peer
                endorsements, and structured mentor milestones, teams dissolve before launching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8C8173]">
            The Journey
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-4xl text-[#29251F]">
            Three steps from solo builder to complete team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-card">
            <div>
              <span className="text-xs font-bold text-[#805536] bg-[#805536]/10 px-2.5 py-1 rounded-lg border border-[#805536]/25">
                Step 01
              </span>
              <h3 className="font-heading font-bold text-lg text-[#29251F] mt-3">
                Tell us who you are
              </h3>
              <p className="text-xs text-[#665E54] mt-2 leading-relaxed">
                Our 6-step onboarding wizard maps your technical strengths, design aesthetic,
                ambition, and exact hours of availability.
              </p>
            </div>
            {/* UI Preview Box */}
            <div className="p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] space-y-2 text-[11px]">
              <div className="flex justify-between text-[#665E54]">
                <span>Matching Persona</span>
                <span className="text-[#29251F] font-semibold">98% Complete</span>
              </div>
              <div className="h-1.5 bg-[#E7DCCB] rounded-full overflow-hidden">
                <div className="w-[98%] h-full bg-[#805536]" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FFFFFF] border-2 border-[#805536]/40 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-card-hover">
            <div>
              <span className="text-xs font-bold text-[#805536] bg-[#805536]/10 px-2.5 py-1 rounded-lg border border-[#805536]/25">
                Step 02
              </span>
              <h3 className="font-heading font-bold text-lg text-[#29251F] mt-3">
                We introduce your Four
              </h3>
              <p className="text-xs text-[#665E54] mt-2 leading-relaxed">
                The algorithm matches you with four complementary peers who offset your weaknesses
                and share your timeline.
              </p>
            </div>
            {/* UI Preview Box */}
            <div className="p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-between text-[11px]">
              <span className="text-[#29251F] font-semibold">Team Balance Score</span>
              <span className="text-[#805536] font-bold bg-[#805536]/10 px-2 py-0.5 rounded border border-[#805536]/25">0.92 / 1.0</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-card">
            <div>
              <span className="text-xs font-bold text-[#805536] bg-[#805536]/10 px-2.5 py-1 rounded-lg border border-[#805536]/25">
                Step 03
              </span>
              <h3 className="font-heading font-bold text-lg text-[#29251F] mt-3">
                Build & ship together
              </h3>
              <p className="text-xs text-[#665E54] mt-2 leading-relaxed">
                Step into a unified Build Room with Kanban tasks, milestone tracking, and weekly
                mentor advisory calls to launch real products.
              </p>
            </div>
            {/* UI Preview Box */}
            <div className="p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] space-y-1.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-[#29251F] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#805536]" />
                <span>Private Build Room Active</span>
              </div>
              <p className="text-[#8C8173] text-[10px]">Sprint 1: MVP Architecture Sign-off</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Complementary (Before / After Comparison) */}
      <section id="complementary" className="py-16 bg-[#E7DCCB] border-y border-[#DCD1C0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C8173]">
              The Structural Difference
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#29251F]">
              Why complementary matching wins
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Typical Networks */}
            <div className="nc-card p-6 space-y-4 border-[#DCD1C0] bg-[#FFFFFF]/70 shadow-sm">
              <div className="flex items-center gap-2 text-[#665E54] font-semibold text-sm">
                <XCircle className="w-5 h-5 text-[#8C8173]" />
                <span>Typical Social & Tech Networks</span>
              </div>
              <ul className="space-y-3 text-xs text-[#665E54]">
                <li className="flex items-start gap-2">
                  <span className="text-[#8C8173] font-bold">•</span>
                  <span>Shows you 100 people with the exact same skills (e.g. 5 developers in a room).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C8173] font-bold">•</span>
                  <span>Nobody can design a high-converting UI or run customer discovery.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C8173] font-bold">•</span>
                  <span>Endless scrolling through resume brag posts and zero real shipping.</span>
                </li>
              </ul>
            </div>

            {/* Nightclub Complementary Network */}
            <div className="nc-card p-6 space-y-4 border-[#805536]/40 bg-[#FFFFFF] shadow-card-hover">
              <div className="flex items-center gap-2 text-[#29251F] font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#805536]" />
                <span>The Nightclub Complementary Graph</span>
              </div>
              <ul className="space-y-3 text-xs text-[#29251F]">
                <li className="flex items-start gap-2">
                  <span className="text-[#805536] font-bold">✓</span>
                  <span>Matches you with people who cover what you cannot: Build + Design + Business + Research.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#805536] font-bold">✓</span>
                  <span>System introduces you directly — zero cold emailing or awkward pitches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#805536] font-bold">✓</span>
                  <span>8 monthly 1-on-1 mentor sessions to hold your five-person team accountable.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Mentorship Spotlight */}
      <section id="mentorship-preview" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C8173]">
              Unmatched Access
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-[#29251F]">
              8 personal 30-minute mentor sessions every month
            </h2>
            <p className="text-xs sm:text-sm text-[#665E54] leading-relaxed">
              Every month, your membership includes 8 credits to book direct, private 1-on-1 strategy
              sessions with engineering leaders from DeepMind, product VPs from Swiggy, and seasoned
              angel investors.
            </p>

            <div className="space-y-2 text-xs text-[#29251F]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#805536]" />
                <span className="font-medium">8 fresh credits deposited on the 1st of every month</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#805536]" />
                <span>Direct calendar slot booking with zero back-and-forth email</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#805536]" />
                <span>Strictly 1-on-1 — real technical code reviews and pitch feedback</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/mentorship')}
              className="nc-button-primary text-xs py-3 px-6"
            >
              <span>Explore Mentor Roster</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Booking Preview Card */}
          <div className="lg:col-span-6 bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCD1C0]">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Dr. Sridhar"
                  className="w-12 h-12 rounded-full object-cover border border-[#DCD1C0]"
                />
                <div>
                  <h4 className="font-semibold text-sm text-[#29251F]">Dr. Sridhar Chunduri</h4>
                  <p className="text-xs text-[#665E54]">Principal Research Scientist, DeepMind</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#805536] bg-[#805536]/10 px-2.5 py-1 rounded-lg border border-[#805536]/25">
                ★ 4.95
              </span>
            </div>

            <div className="p-3 bg-[#F3EDE3] rounded-xl border border-[#DCD1C0] space-y-2 text-xs">
              <span className="text-[#665E54] font-medium">Selected Open Slot</span>
              <div className="flex items-center justify-between text-[#29251F] font-semibold">
                <span>Tomorrow at 7:00 PM IST</span>
                <span className="text-[11px] text-[#805536] font-medium">Available (30 mins)</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#665E54]">Deduction:</span>
              <span className="text-[#29251F] font-semibold">1 Credit (5 of 8 remaining)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Community Stats */}
      <section className="py-16 bg-[#E7DCCB] border-y border-[#DCD1C0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="font-heading font-black text-3xl sm:text-4xl text-[#805536]">1,400+</p>
              <p className="text-xs text-[#665E54] font-medium">Telugu AI Community Members</p>
            </div>
            <div className="space-y-1">
              <p className="font-heading font-black text-3xl sm:text-4xl text-[#29251F]">240+</p>
              <p className="text-xs text-[#665E54] font-medium">Teams Formed & Active</p>
            </div>
            <div className="space-y-1">
              <p className="font-heading font-black text-3xl sm:text-4xl text-[#29251F]">85+</p>
              <p className="text-xs text-[#665E54] font-medium">Shipped MVPs & Open Models</p>
            </div>
            <div className="space-y-1">
              <p className="font-heading font-black text-3xl sm:text-4xl text-[#805536]">94.2%</p>
              <p className="text-xs text-[#665E54] font-medium">Complementary Match Fit</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing Summary */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8C8173]">
          One Clear Membership
        </span>
        <h2 className="font-heading font-bold text-2xl sm:text-4xl text-[#29251F] mt-2 mb-8">
          Invest in your complementary team
        </h2>

        {/* Single Plan Card */}
        <div className="bg-[#FFFFFF] border-2 border-[#805536]/30 rounded-3xl p-8 shadow-card-hover text-left max-w-lg mx-auto space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-[#805536] uppercase tracking-wider">
                Founding Cohort Plan
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-[#29251F] mt-1">
                Full Builder Access
              </h3>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-[#29251F]">₹1,499</span>
              <span className="text-xs text-[#665E54] block">/ month</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-[#29251F]">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#805536]" />
              <span>Full Find Your Four complementary graph introductions</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#805536]" />
              <span>8 Personal 30-min 1-on-1 mentor sessions / month (Credits reset monthly)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#805536]" />
              <span>Private collaborative Build Rooms & Kanban task boards</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#805536]" />
              <span>End-to-end encrypted direct messaging between connected peers</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#805536]" />
              <span>Access to Build Challenges (₹1.5L prize pool) & Careers Board</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full nc-button-primary py-3.5 text-sm"
          >
            <span>Claim Founding Seat</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-[#8C8173] text-center">
            Cancel or pause anytime with 1-click in settings. 14-day refund guarantee.
          </p>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="py-16 bg-[#E7DCCB] border-t border-[#DCD1C0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C8173]">
              Common Questions
            </span>
            <h2 className="font-heading font-bold text-2xl text-[#29251F]">
              Everything you need to know
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="nc-card bg-[#FFFFFF] border-[#DCD1C0] overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#29251F]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#805536] transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-[#665E54] leading-relaxed border-t border-[#DCD1C0] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final Call to Action */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#29251F]">
          Your team is already out there.
        </h2>
        <p className="text-xs sm:text-sm text-[#665E54] max-w-md mx-auto">
          Join the founding cohort of Telugu AI builders shipping real software, models, and ventures.
        </p>
        <button
          onClick={() => navigate('/pricing')}
          className="nc-button-primary text-sm py-3.5 px-8"
        >
          <span>Join Nightclub Today</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      <Footer />
    </div>
  );
};
