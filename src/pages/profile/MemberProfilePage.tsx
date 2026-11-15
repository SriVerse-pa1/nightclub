import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
import { EvidenceBadge } from '../../components/modules/profile/EvidenceBadge';
import { BuilderJourneyTimeline } from '../../components/modules/profile/BuilderJourneyTimeline';
import {
  ArrowLeft,
  Shield,
  ShieldAlert,
  UserPlus,
  MessageSquare,
  Clock,
  Briefcase,
  CheckCircle2,
  FolderGit2,
  Lock,
  Flag,
  Sparkles,
  Users2,
  X,
} from 'lucide-react';

export const MemberProfilePage: React.FC = () => {
  const {
    viewingMember,
    currentUser,
    sendConnectionRequest,
    acceptConnectionRequest,
    startChatWithMember,
    navigate,
    showToast,
  } = useApp();

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [connectNote, setConnectNote] = useState('');
  const [showConnectModal, setShowConnectModal] = useState(false);

  const member = viewingMember || currentUser;

  const handleSendRequest = () => {
    sendConnectionRequest(member.id, connectNote);
    setShowConnectModal(false);
  };

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReportModal(false);
    showToast(`Report submitted for moderation review. Thank you for keeping Nightclub safe.`, 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Back button */}
      <button
        onClick={() => navigate('/discover')}
        className="inline-flex items-center gap-1.5 text-xs text-[#A99CCB] hover:text-[#F3EEFF]"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to member discovery</span>
      </button>

      {/* Profile Header Card */}
      <div className="bg-[#1C1431] border border-[#3A2E5C] rounded-3xl p-6 sm:p-8 shadow-glow-card relative">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-[#3A2E5C]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#3A2E5C]"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-heading font-extrabold text-2xl text-[#F3EEFF]">
                  {member.name}
                </h1>
                <RoleBadge role={member.role} size="md" />
              </div>
              <p className="text-xs text-[#A99CCB] font-medium">{member.roleTitle}</p>
              <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-[#7C6F9B] pt-1">
                <span>{member.location}</span>
                <span>•</span>
                <span>{member.yearsExperience} yrs experience</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#2DD4BF]">
                  <Users2 className="w-3.5 h-3.5" />
                  {member.mutualConnections} mutual connections
                </span>
              </div>
            </div>
          </div>

          {/* Connect & Report Actions */}
          <div className="flex items-center justify-center sm:justify-end gap-2.5">
            {member.connectionStatus === 'none' && (
              <button
                onClick={() => setShowConnectModal(true)}
                className="nc-button-primary text-xs py-2 px-4 shadow-glow-accent"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Connect</span>
              </button>
            )}

            {member.connectionStatus === 'pending_sent' && (
              <span className="px-3 py-2 rounded-xl bg-[#22183B] border border-[#FFB547]/40 text-[#FFB547] text-xs font-semibold">
                Request Sent
              </span>
            )}

            {member.connectionStatus === 'pending_received' && (
              <button
                onClick={() => acceptConnectionRequest(member.id)}
                className="nc-button-primary text-xs py-2 px-4"
              >
                <span>Accept Connection</span>
              </button>
            )}

            {member.connectionStatus === 'connected' && (
              <button
                onClick={() => startChatWithMember(member)}
                className="nc-button-primary text-xs py-2 px-4"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Message</span>
              </button>
            )}

            <button
              onClick={() => setShowReportModal(true)}
              className="p-2 rounded-xl bg-[#22183B] border border-[#3A2E5C] text-[#A99CCB] hover:text-rose-400"
              title="Report Profile"
            >
              <Flag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Why We Matched You Callout */}
        <div className="mt-5 p-4 rounded-2xl bg-[#17102A] border border-[#FFB547]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#FFB547] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#FFB547]">Why we matched you:</span>
              <p className="text-[#A99CCB] mt-0.5 leading-relaxed">{member.whyMatched}</p>
            </div>
          </div>
          <span className="text-sm font-bold text-[#FFB547] shrink-0 bg-[#FFB547]/10 px-3 py-1 rounded-xl border border-[#FFB547]/30 text-center">
            {member.matchScore}% Match
          </span>
        </div>

        {/* Protected Contact Notice */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#7C6F9B]">
          <Lock className="w-3 h-3 text-[#2DD4BF]" />
          <span>Privacy protection active: Direct contact unlocks only after you connect.</span>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column (8 cols): About, Skills, Journey */}
        <div className="md:col-span-8 space-y-6">
          {/* About */}
          <div className="nc-card p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C6F9B]">About</span>
            <p className="text-xs leading-relaxed text-[#F3EEFF]">{member.bio}</p>
          </div>

          {/* Offer & Need */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="nc-card p-5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFB547]">
                What They Offer
              </span>
              <ul className="space-y-1.5 text-xs text-[#A99CCB]">
                {member.offer.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#FFB547] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nc-card p-5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2DD4BF]">
                What They Need
              </span>
              <ul className="space-y-1.5 text-xs text-[#A99CCB]">
                {member.need.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#2DD4BF] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills with Evidence Tags */}
          <div className="nc-card p-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C6F9B]">
              Verified Skills & Evidence
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {member.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3 bg-[#17102A] border border-[#3A2E5C] rounded-xl flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-[#F3EEFF]">{skill.name}</span>
                  <EvidenceBadge evidence={skill.evidence} />
                </div>
              ))}
            </div>
          </div>

          {/* Builder Journey Timeline */}
          <div className="nc-card p-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C6F9B]">
              Builder Journey Timeline
            </span>
            <BuilderJourneyTimeline items={member.builderJourney} />
          </div>
        </div>

        {/* Right Column (4 cols): Goals, Working Style, Availability */}
        <div className="md:col-span-4 space-y-6">
          {/* Goals */}
          <div className="nc-card p-5 space-y-3 text-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C6F9B]">
              Goals & Ambition
            </span>
            <div>
              <span className="text-[#A99CCB]">Ambition:</span>
              <p className="font-semibold text-[#F3EEFF]">{member.ambition}</p>
            </div>
            <div>
              <span className="text-[#A99CCB]">30-Day Goal:</span>
              <p className="font-medium text-[#F3EEFF] mt-0.5">{member.goals.thirtyDay}</p>
            </div>
            <div>
              <span className="text-[#A99CCB]">Status:</span>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/30 text-[10px] font-bold">
                {member.buildingStatus}
              </span>
            </div>
          </div>

          {/* Working Style & Availability */}
          <div className="nc-card p-5 space-y-3 text-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C6F9B]">
              Working Style
            </span>
            <div className="flex justify-between">
              <span className="text-[#A99CCB]">Commitment:</span>
              <span className="font-semibold text-[#FFB547]">
                {member.workingStyle.hoursPerWeek} hrs/week
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A99CCB]">Model:</span>
              <span className="font-semibold text-[#F3EEFF]">
                {member.workingStyle.remoteHybrid}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A99CCB]">Time Zone:</span>
              <span className="text-[#A99CCB]">{member.workingStyle.timeZone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connect Note Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#1F1735] border border-[#3A2E5C] rounded-2xl max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#3A2E5C]">
              <h3 className="font-heading font-bold text-base text-[#F3EEFF]">
                Connect with {member.name}
              </h3>
              <button
                onClick={() => setShowConnectModal(false)}
                className="text-[#A99CCB] hover:text-[#F3EEFF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[#A99CCB]">
              Add a brief note explaining which complementary project or skill set you'd love to
              coordinate on:
            </p>

            <textarea
              rows={3}
              value={connectNote}
              onChange={(e) => setConnectNote(e.target.value)}
              placeholder="e.g. Saw your Telugu NLP benchmark. Would love to build the frontend..."
              className="w-full nc-input resize-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConnectModal(false)}
                className="nc-button-secondary py-2 px-4"
              >
                Cancel
              </button>
              <button onClick={handleSendRequest} className="nc-button-primary py-2 px-5">
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#1F1735] border border-rose-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 text-xs">
            <h3 className="font-heading font-bold text-base text-rose-300">
              Report Member Profile
            </h3>
            <p className="text-[#A99CCB]">
              Please state why this profile violates Nightclub community guidelines:
            </p>
            <textarea
              rows={3}
              required
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Spam, disrespectful conduct, fake credentials..."
              className="w-full nc-input resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReportModal(false)}
                className="nc-button-secondary py-2 px-4"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                className="py-2 px-4 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
