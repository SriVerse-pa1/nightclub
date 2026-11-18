import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RingView } from '../../components/modules/findYourFour/RingView';
import { MemberDetailDrawer } from '../../components/modules/findYourFour/MemberDetailDrawer';
import { Member } from '../../types';
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Clock,
  Hammer,
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
    t,
  } = useApp();

  const [selectedMember, setSelectedMember] = useState<Member | null>(fourTeam.members[0] || null);

  const unreadThreads = threads.filter((t) => t.unreadCount > 0);
  const suggestedChallenge = challenges[0];
  const activeProject = projects[0];
  const newIntroMember = fourTeam.members[1]; // Karthik Varma

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Area: Greeting & Find Your Four Interactive Constellation */}
      <section className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-5 sm:p-7 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DCD1C0]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#805536]">
              {t('nav_foundingCohort')}
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#29251F] mt-0.5">
              {t('dashboard_greeting')}, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-xs text-[#665E54] mt-1">
              {t('dashboard_subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/find-your-four')}
              className="nc-button-primary text-xs py-2 px-4"
            >
              <span>{t('dashboard_viewFour')}</span>
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
              <div className="p-8 text-center border border-dashed border-[#DCD1C0] rounded-2xl text-xs text-[#8C8173] bg-[#F3EDE3]/50">
                Select any member in the ring to inspect complementary score bars.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Finite Set of Core Modules (No Infinite Feed) */}
      <section className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8C8173] block">
          Focused Builder Modules
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Module 1: Mentor Credits */}
          <div className="nc-card p-5 space-y-4 flex flex-col justify-between bg-[#FFFFFF] border border-[#DCD1C0]">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#DCD1C0]">
                <span className="text-xs font-semibold text-[#29251F] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#805536]" />
                  Mentor Credits
                </span>
                <span className="text-xs font-bold text-[#805536]">
                  {mentorCredits.remaining} of {mentorCredits.total} left
                </span>
              </div>
              <p className="text-xs text-[#665E54] mt-3 leading-relaxed">
                Personal 30-minute 1-on-1 sessions. Resets promptly on the 1st of next month.
              </p>

              {/* Visual 8 dots */}
              <div className="flex items-center gap-1.5 my-3">
                {Array.from({ length: mentorCredits.total }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i < mentorCredits.remaining ? 'bg-[#805536]' : 'bg-[#E7DCCB]'
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
          <div className="nc-card p-5 space-y-3 flex flex-col justify-between bg-[#FFFFFF] border border-[#DCD1C0]">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#DCD1C0]">
                <span className="text-xs font-semibold text-[#29251F] flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#805536]" />
                  Private Chats
                </span>
                <span className="text-xs text-[#8C8173] font-medium">
                  {unreadThreads.length} unread thread
                </span>
              </div>

              {unreadThreads.length > 0 ? (
                <div
                  onClick={() => navigate('/messages')}
                  className="mt-3 p-3 bg-[#F3EDE3] rounded-xl border border-[#DCD1C0] hover:border-[#805536] cursor-pointer space-y-1 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#29251F]">
                      {unreadThreads[0].participant.name}
                    </span>
                    <span className="text-[10px] text-[#8C8173]">
                      {unreadThreads[0].lastMessageTime}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#665E54] truncate">
                    "{unreadThreads[0].lastMessage}"
                  </p>
                </div>
              ) : (
                <p className="text-xs text-[#665E54] mt-4">
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
          <div className="nc-card p-5 space-y-3 flex flex-col justify-between bg-[#FFFFFF] border border-[#DCD1C0]">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#DCD1C0]">
                <span className="text-xs font-semibold text-[#29251F] flex items-center gap-1.5">
                  <Hammer className="w-4 h-4 text-[#805536]" />
                  Live Challenge
                </span>
                <span className="text-[10px] text-[#805536] font-bold uppercase tracking-wider bg-[#805536]/10 px-2 py-0.5 rounded border border-[#805536]/25">
                  Live Now
                </span>
              </div>

              <h4 className="font-semibold text-xs text-[#29251F] mt-3">
                {suggestedChallenge.title}
              </h4>
              <p className="text-[11px] text-[#665E54] line-clamp-2 mt-1">
                {suggestedChallenge.brief}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-[#805536] mt-2 font-medium">
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
          <div className="lg:col-span-7 nc-card p-5 space-y-4 bg-[#FFFFFF] border border-[#DCD1C0]">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCD1C0]">
              <span className="text-xs font-semibold text-[#29251F]">
                Recent Activity from {activeProject.title.split('—')[0]}
              </span>
              <button
                onClick={() => navigate('/build-room')}
                className="text-xs text-[#805536] hover:underline font-medium transition-colors"
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
                      className="w-6 h-6 rounded-full object-cover border border-[#DCD1C0]"
                    />
                    <span className="text-[#665E54]">
                      <strong className="text-[#29251F] font-semibold">{act.userName}</strong> {act.action}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8C8173]">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* New Introduction */}
          <div className="lg:col-span-5 nc-card p-5 space-y-3 flex flex-col justify-between bg-[#FFFFFF] border border-[#DCD1C0]">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#DCD1C0]">
                <span className="text-xs font-semibold text-[#29251F]">New Introduction</span>
                <span className="text-[10px] text-[#805536] font-semibold bg-[#805536]/10 px-2 py-0.5 rounded border border-[#805536]/25">92% Match</span>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <img
                  src={newIntroMember.avatar}
                  alt={newIntroMember.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#DCD1C0]"
                />
                <div>
                  <h4 className="font-semibold text-xs text-[#29251F]">{newIntroMember.name}</h4>
                  <p className="text-[11px] text-[#665E54]">{newIntroMember.roleTitle}</p>
                </div>
              </div>

              <p className="text-[11px] text-[#665E54] mt-2 line-clamp-2">
                "{newIntroMember.bio}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#DCD1C0]">
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
