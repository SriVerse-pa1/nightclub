import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RingView } from '../../components/modules/findYourFour/RingView';
import { MemberDetailDrawer } from '../../components/modules/findYourFour/MemberDetailDrawer';
import { RoleBadge } from '../../components/common/RoleBadge';
import { Member } from '../../types';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Calendar,
  Clock,
  Compass,
  Hammer,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  UserPlus,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    fourTeam,
    declineTeamMember,
    acceptFourTeam,
    setViewingMember,
    navigate,
    threads,
    mentorCredits,
    challenges,
    projects,
    startChatWithMember,
  } = useApp();

  const [selectedMember, setSelectedMember] = useState<Member | null>(fourTeam.members[0] || null);
  const [dashboardState, setDashboardState] = useState<'returning' | 'first_time' | 'cohort_small'>('returning');

  const unreadThreads = threads.filter((t) => t.unreadCount > 0);
  const suggestedChallenge = challenges[0];
  const activeProject = projects[0];
  const newIntroMember = fourTeam.members[1]; // Karthik Varma

  return (
    <div className="space-y-8 pb-12">
      {/* State Switcher Tabs (For demo review of states: Returning / First-time / Cohort small) */}
      <div className="flex items-center justify-between border-b border-[#3A2E5C] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#7C6F9B] uppercase font-semibold">Dashboard State:</span>
          <button
            onClick={() => setDashboardState('returning')}
            className={`px-2.5 py-1 rounded-lg border text-xs ${
              dashboardState === 'returning'
                ? 'bg-[#FFB547] text-[#17102A] font-bold border-[#FFB547]'
                : 'bg-[#22183B] text-[#A99CCB] border-[#3A2E5C]'
            }`}
          >
            Returning Builder
          </button>
          <button
            onClick={() => setDashboardState('first_time')}
            className={`px-2.5 py-1 rounded-lg border text-xs ${
              dashboardState === 'first_time'
                ? 'bg-[#FFB547] text-[#17102A] font-bold border-[#FFB547]'
                : 'bg-[#22183B] text-[#A99CCB] border-[#3A2E5C]'
            }`}
          >
            First-time Profile
          </button>
          <button
            onClick={() => setDashboardState('cohort_small')}
            className={`px-2.5 py-1 rounded-lg border text-xs ${
              dashboardState === 'cohort_small'
                ? 'bg-[#FFB547] text-[#17102A] font-bold border-[#FFB547]'
                : 'bg-[#22183B] text-[#A99CCB] border-[#3A2E5C]'
            }`}
          >
            Cohort Matching Pending
          </button>
        </div>
      </div>

      {/* Cohort Too Small Notice State */}
      {dashboardState === 'cohort_small' && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-[#FFB547]">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm">We're finding your best complementary match</h4>
            <p className="text-[#A99CCB]">
              The algorithm is verifying candidates who cover your required tech stack in Hyderabad
              and Visakhapatnam. We'll send you an instant notification as soon as your Five is assembled.
            </p>
          </div>
        </div>
      )}

      {/* First Time User Banner */}
      {dashboardState === 'first_time' && (
        <div className="p-4 rounded-2xl bg-[#22183B] border border-[#2DD4BF]/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
            <span className="text-[#F3EEFF]">
              Your persona is active with <strong>98% completeness</strong>. Your first Five-person
              constellation is calculated below!
            </span>
          </div>
          <button
            onClick={() => navigate('/find-your-four')}
            className="nc-button-primary text-xs py-1.5 px-3"
          >
            Inspect Team
          </button>
        </div>
      )}

      {/* Hero Area: Greeting & Find Your Four Interactive Constellation */}
      <section className="bg-[#1C1333] border border-[#3A2E5C] rounded-3xl p-5 sm:p-7 shadow-glow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#3A2E5C]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FFB547]">
              Nightclub Core Introduction
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF] mt-0.5">
              Your Five is ready, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-xs text-[#A99CCB] mt-1">
              Tap any teammate to see their fit breakdown, shared ambition, and complementary skills.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/find-your-four')}
              className="nc-button-primary text-xs py-2 px-4 shadow-glow-accent"
            >
              <span>Full Screen Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Constellation Grid: Left Ring, Right Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
          <div className="lg:col-span-7 flex justify-center">
            <RingView
              fourTeam={fourTeam}
              currentUser={currentUser}
              selectedMember={selectedMember}
              onSelectMember={(m) => setSelectedMember(m)}
            />
          </div>

          <div className="lg:col-span-5">
            {selectedMember ? (
              <MemberDetailDrawer
                member={selectedMember}
                fit={fourTeam.fitDetails[selectedMember.id]}
                onClose={() => setSelectedMember(null)}
                onDecline={(id) => declineTeamMember(id)}
                onAcceptTeam={() => acceptFourTeam()}
                onViewProfile={(m) => {
                  setViewingMember(m);
                  navigate('/member-profile');
                }}
                onStartChat={(m) => startChatWithMember(m)}
              />
            ) : (
              <div className="p-8 text-center border border-dashed border-[#3A2E5C] rounded-2xl text-xs text-[#A99CCB]">
                Select any member in the ring to inspect complementary score bars.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Finite Set of Core Modules (No Infinite Feed) */}
      <section className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7C6F9B] block">
          Focused Builder Modules
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Module 1: Mentor Credits */}
          <div className="nc-card p-5 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#3A2E5C]">
                <span className="text-xs font-semibold text-[#F3EEFF] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FFB547]" />
                  Mentor Credits
                </span>
                <span className="text-xs font-bold text-[#FFB547]">
                  {mentorCredits.remaining} of {mentorCredits.total} left
                </span>
              </div>
              <p className="text-xs text-[#A99CCB] mt-3 leading-relaxed">
                Personal 30-minute 1-on-1 sessions. Resets promptly on the 1st of next month.
              </p>

              {/* Visual 8 dots */}
              <div className="flex items-center gap-1.5 my-3">
                {Array.from({ length: mentorCredits.total }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i < mentorCredits.remaining ? 'bg-[#FFB547]' : 'bg-[#3A2E5C]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/mentorship')}
              className="w-full nc-button-primary text-xs py-2"
            >
              <span>Book a session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Module 2: Unread Messages */}
          <div className="nc-card p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#3A2E5C]">
                <span className="text-xs font-semibold text-[#F3EEFF] flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#38BDF8]" />
                  Private Chats
                </span>
                <span className="text-xs text-[#A99CCB]">
                  {unreadThreads.length} unread thread
                </span>
              </div>

              {unreadThreads.length > 0 ? (
                <div
                  onClick={() => navigate('/messages')}
                  className="mt-3 p-3 bg-[#17102A] rounded-xl border border-[#3A2E5C] hover:border-[#FFB547]/40 cursor-pointer space-y-1 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#F3EEFF]">
                      {unreadThreads[0].participant.name}
                    </span>
                    <span className="text-[10px] text-[#FFB547]">
                      {unreadThreads[0].lastMessageTime}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A99CCB] truncate">
                    "{unreadThreads[0].lastMessage}"
                  </p>
                </div>
              ) : (
                <p className="text-xs text-[#A99CCB] mt-4">
                  All messages caught up with your team.
                </p>
              )}
            </div>

            <button
              onClick={() => navigate('/messages')}
              className="w-full nc-button-secondary text-xs py-2"
            >
              Open Messenger
            </button>
          </div>

          {/* Module 3: Suggested Build Challenge */}
          <div className="nc-card p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#3A2E5C]">
                <span className="text-xs font-semibold text-[#F3EEFF] flex items-center gap-1.5">
                  <Hammer className="w-4 h-4 text-[#2DD4BF]" />
                  Live Challenge
                </span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  Live Now
                </span>
              </div>

              <h4 className="font-semibold text-xs text-[#F3EEFF] mt-3">
                {suggestedChallenge.title}
              </h4>
              <p className="text-[11px] text-[#A99CCB] line-clamp-2 mt-1">
                {suggestedChallenge.brief}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-[#FFB547] mt-2 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{suggestedChallenge.countdown}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/challenges')}
              className="w-full nc-button-secondary text-xs py-2"
            >
              View Challenge Details
            </button>
          </div>
        </div>

        {/* Row 2: Recent Team Activity & New Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
          {/* Team Activity */}
          <div className="lg:col-span-7 nc-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#3A2E5C]">
              <span className="text-xs font-semibold text-[#F3EEFF]">
                Recent Activity from {activeProject.title.split('—')[0]}
              </span>
              <button
                onClick={() => navigate('/build-room')}
                className="text-xs text-[#FFB547] hover:underline"
              >
                Go to Build Room →
              </button>
            </div>

            <div className="space-y-3">
              {activeProject.activity.map((act) => (
                <div key={act.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={act.userAvatar}
                      alt={act.userName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-[#A99CCB]">
                      <strong className="text-[#F3EEFF]">{act.userName}</strong> {act.action}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#7C6F9B]">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* New Introduction */}
          <div className="lg:col-span-5 nc-card p-5 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#3A2E5C]">
                <span className="text-xs font-semibold text-[#F3EEFF]">New Introduction</span>
                <span className="text-[10px] text-[#FFB547] font-semibold">92% Match</span>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <img
                  src={newIntroMember.avatar}
                  alt={newIntroMember.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#3A2E5C]"
                />
                <div>
                  <h4 className="font-semibold text-xs text-[#F3EEFF]">{newIntroMember.name}</h4>
                  <p className="text-[11px] text-[#A99CCB]">{newIntroMember.roleTitle}</p>
                </div>
              </div>

              <p className="text-[11px] text-[#A99CCB] mt-2 line-clamp-2">
                "{newIntroMember.bio}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#3A2E5C]">
              <button
                onClick={() => {
                  setViewingMember(newIntroMember);
                  navigate('/member-profile');
                }}
                className="nc-button-secondary text-xs py-1.5"
              >
                View Profile
              </button>
              <button
                onClick={() => startChatWithMember(newIntroMember)}
                className="nc-button-primary text-xs py-1.5"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
