import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingModal } from '../../components/modules/mentorship/BookingModal';
import { FeedbackModal } from '../../components/modules/mentorship/FeedbackModal';
import { Mentor, BookedSession } from '../../types';
import {
  GraduationCap,
  Sparkles,
  Calendar,
  Clock,
  Star,
  Video,
  ArrowRight,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const MentorshipPage: React.FC = () => {
  const {
    mentors,
    bookedSessions,
    mentorCredits,
    bookMentorSession,
    cancelMentorSession,
    submitSessionFeedback,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'roster' | 'my_sessions'>('roster');
  const [selectedMentorForBooking, setSelectedMentorForBooking] = useState<Mentor | null>(null);
  const [feedbackSession, setFeedbackSession] = useState<BookedSession | null>(null);
  const [selectedExpertise, setSelectedExpertise] = useState('all');

  const upcomingSessions = bookedSessions.filter((s) => s.status === 'upcoming');
  const pastSessions = bookedSessions.filter((s) => s.status === 'past');

  const filteredMentors = mentors.filter((m) => {
    if (selectedExpertise === 'all') return true;
    return m.expertise.some((e) => e.toLowerCase().includes(selectedExpertise.toLowerCase()));
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Persistent Header with Credit Indicator */}
      <div className="bg-[#1C1431] border border-[#3A2E5C] rounded-3xl p-6 sm:p-7 shadow-glow-card flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#FFB547] font-semibold">
              1-on-1 Advisory Network
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB547] animate-pulse" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF] mt-1">
            Personal Mentorship
          </h1>
          <p className="text-xs text-[#A99CCB] mt-0.5">
            30-minute private video sessions with industry leaders.
          </p>
        </div>

        {/* Credits Card */}
        <div className="bg-[#22183B] border border-[#FFB547]/40 rounded-2xl p-4 flex flex-col gap-2 min-w-[240px]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A99CCB] font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FFB547]" />
              Monthly Credits:
            </span>
            <strong className="text-sm text-[#FFB547]">
              {mentorCredits.remaining} of {mentorCredits.total} left
            </strong>
          </div>

          {/* Visual 8 dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: mentorCredits.total }).map((_, i) => (
              <span
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < mentorCredits.remaining ? 'bg-[#FFB547]' : 'bg-[#3A2E5C]'
                }`}
              />
            ))}
          </div>

          <span className="text-[10px] text-[#7C6F9B]">
            Credits reset on the 1st of every month (No rollover)
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#3A2E5C] pb-2 text-xs">
        <button
          onClick={() => setActiveTab('roster')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'roster'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Available Mentors ({mentors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('my_sessions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'my_sessions'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Sessions ({bookedSessions.length})</span>
        </button>
      </div>

      {/* TAB 1: MENTOR ROSTER */}
      {activeTab === 'roster' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[#7C6F9B] font-semibold text-[11px] uppercase mr-1">
              Expertise:
            </span>
            {['all', 'Large Language Models', 'Product Strategy', 'Pre-seed Fundraising', 'Pricing'].map(
              (exp) => (
                <button
                  key={exp}
                  onClick={() => setSelectedExpertise(exp)}
                  className={`px-3 py-1.5 rounded-xl capitalize font-medium whitespace-nowrap transition-all ${
                    selectedExpertise === exp
                      ? 'bg-[#FFB547] text-[#17102A] font-bold'
                      : 'bg-[#22183B] text-[#A99CCB] border border-[#3A2E5C]'
                  }`}
                >
                  {exp}
                </button>
              )
            )}
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="nc-card p-6 space-y-4 hover:border-[#FFB547]/50 flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#FFB547]/40"
                    />
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs font-bold text-[#FFB547]">
                        <Star className="w-3.5 h-3.5 fill-[#FFB547]" />
                        <span>{mentor.rating}</span>
                      </div>
                      <span className="text-[10px] text-[#7C6F9B]">
                        {mentor.reviewsCount} reviews
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-base text-[#F3EEFF]">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-[#A99CCB] font-medium">{mentor.title}</p>
                    <span className="text-[11px] text-[#2DD4BF]">{mentor.company}</span>
                  </div>

                  <p className="text-xs text-[#A99CCB] line-clamp-2 leading-relaxed">
                    {mentor.bio}
                  </p>

                  {/* Expertise Badges */}
                  <div className="flex flex-wrap gap-1">
                    {mentor.expertise.slice(0, 3).map((exp) => (
                      <span
                        key={exp}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#17102A] border border-[#3A2E5C] text-[#A99CCB]"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>

                  {/* Next Open Slot */}
                  <div className="p-3 bg-[#17102A] rounded-xl border border-[#3A2E5C] flex items-center justify-between text-xs">
                    <span className="text-[#A99CCB]">Next Open Slot:</span>
                    <span className="font-semibold text-[#FFB547]">{mentor.nextSlot}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#3A2E5C] flex items-center justify-between">
                  <span className="text-xs text-[#7C6F9B]">
                    Languages: {mentor.languages.join(', ')}
                  </span>

                  <button
                    onClick={() => setSelectedMentorForBooking(mentor)}
                    className="nc-button-primary text-xs py-2 px-4 shadow-glow-accent"
                  >
                    <span>Book Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MY SESSIONS */}
      {activeTab === 'my_sessions' && (
        <div className="space-y-8 text-xs">
          {/* Upcoming Sessions */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-base text-[#F3EEFF] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FFB547]" />
              <span>Upcoming Confirmed Sessions</span>
            </h3>

            {upcomingSessions.length === 0 ? (
              <div className="p-8 text-center bg-[#22183B] border border-[#3A2E5C] rounded-2xl text-[#A99CCB]">
                No upcoming sessions booked. Select a mentor to book your 30-minute call.
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingSessions.map((sess) => (
                  <div
                    key={sess.id}
                    className="nc-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <img
                        src={sess.mentorAvatar}
                        alt={sess.mentorName}
                        className="w-12 h-12 rounded-full object-cover border border-[#FFB547]/40"
                      />
                      <div className="space-y-1">
                        <h4 className="font-heading font-bold text-sm text-[#F3EEFF]">
                          {sess.mentorName}
                        </h4>
                        <p className="text-[11px] text-[#A99CCB]">{sess.mentorTitle}</p>
                        <div className="flex items-center gap-2 text-[#FFB547] font-semibold text-xs pt-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {sess.slotDay} • {sess.slotTime}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#F3EEFF]/80 italic mt-1">
                          Goal: "{sess.goal}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => cancelMentorSession(sess.id)}
                        className="nc-button-secondary py-2 px-3 text-rose-300 hover:text-rose-200"
                      >
                        Cancel
                      </button>
                      <a
                        href={sess.joinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="nc-button-primary py-2 px-4 font-semibold flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Call</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Sessions & Feedback */}
          <div className="space-y-4 pt-4 border-t border-[#3A2E5C]">
            <h3 className="font-heading font-bold text-base text-[#F3EEFF] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2DD4BF]" />
              <span>Past Sessions & Notes</span>
            </h3>

            <div className="space-y-3">
              {pastSessions.map((sess) => (
                <div
                  key={sess.id}
                  className="nc-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={sess.mentorAvatar}
                      alt={sess.mentorName}
                      className="w-11 h-11 rounded-full object-cover border border-[#3A2E5C]"
                    />
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-[#F3EEFF]">{sess.mentorName}</h4>
                      <span className="text-[10px] text-[#7C6F9B]">{sess.slotDay}</span>
                      {sess.feedbackHelp && (
                        <p className="text-[11px] text-[#A99CCB] bg-[#17102A] p-2 rounded-lg border border-[#3A2E5C] mt-2">
                          "{sess.feedbackHelp}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    {!sess.rating ? (
                      <button
                        onClick={() => setFeedbackSession(sess)}
                        className="nc-button-secondary py-1.5 px-3 text-xs"
                      >
                        Leave Feedback
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 text-[#FFB547]">
                        {Array.from({ length: sess.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#FFB547]" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {selectedMentorForBooking && (
        <BookingModal
          mentor={selectedMentorForBooking}
          creditsRemaining={mentorCredits.remaining}
          creditsTotal={mentorCredits.total}
          onConfirmBooking={(mentorId, slotId, goal) => {
            bookMentorSession(mentorId, slotId, goal);
            setSelectedMentorForBooking(null);
          }}
          onClose={() => setSelectedMentorForBooking(null)}
        />
      )}

      {/* FEEDBACK MODAL */}
      {feedbackSession && (
        <FeedbackModal
          session={feedbackSession}
          onSubmit={(sessionId, rating, feedback) =>
            submitSessionFeedback(sessionId, rating, feedback)
          }
          onClose={() => setFeedbackSession(null)}
        />
      )}
    </div>
  );
};
