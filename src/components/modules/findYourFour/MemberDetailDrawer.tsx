import React from 'react';
import { Member, FitBreakdown } from '../../../types';
import { RoleBadge } from '../../common/RoleBadge';
import {
  X,
  Sparkles,
  Clock,
  Briefcase,
  Compass,
  UserX,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface MemberDetailDrawerProps {
  member: Member | null;
  fit: FitBreakdown | undefined;
  onClose: () => void;
  onDecline: (memberId: string) => void;
  onAcceptTeam: () => void;
  onViewProfile: (member: Member) => void;
  onStartChat: (member: Member) => void;
}

export const MemberDetailDrawer: React.FC<MemberDetailDrawerProps> = ({
  member,
  fit,
  onClose,
  onDecline,
  onAcceptTeam,
  onViewProfile,
  onStartChat,
}) => {
  if (!member) return null;

  const scoreBars = [
    { label: 'Skill Complementarity', score: fit?.skillFit ?? 94 },
    { label: 'Shared Ambition & Goals', score: fit?.sharedGoals ?? 90 },
    { label: 'Working Style Alignment', score: fit?.workingStyle ?? 88 },
    { label: 'Availability Overlap', score: fit?.availabilityOverlap ?? 92 },
  ];

  return (
    <div className="bg-[#22183B] border border-[#3A2E5C] rounded-2xl p-5 sm:p-6 text-[#F3EEFF] flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b border-[#3A2E5C]">
        <div className="flex items-center gap-3">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover border border-[#3A2E5C]"
          />
          <div>
            <h3 className="font-heading font-bold text-base text-[#F3EEFF]">{member.name}</h3>
            <p className="text-xs text-[#A99CCB]">{member.roleTitle}</p>
            <div className="flex items-center gap-2 mt-1">
              <RoleBadge role={member.role} size="sm" />
              <span className="text-[11px] text-[#7C6F9B]">{member.location}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[#A99CCB] hover:text-[#F3EEFF] hover:bg-[#17102A]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Match Score Banner */}
      <div className="my-4 p-3 rounded-xl bg-[#17102A] border border-[#3A2E5C] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FFB547]" />
          <span className="text-xs text-[#A99CCB]">Complementary Fit Score</span>
        </div>
        <span className="text-base font-bold text-[#FFB547]">{member.matchScore}%</span>
      </div>

      {/* 4 Score Progress Bars */}
      <div className="space-y-2.5 mb-5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C6F9B]">
          Fit Breakdown
        </span>
        {scoreBars.map((bar) => (
          <div key={bar.label} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-[#A99CCB]">{bar.label}</span>
              <span className="font-semibold text-[#F3EEFF]">{bar.score}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#17102A] overflow-hidden">
              <div
                style={{ width: `${bar.score}%` }}
                className="h-full bg-gradient-to-r from-[#FFB547]/80 to-[#FFB547] rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Why they were picked */}
      <div className="mb-5 space-y-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C6F9B]">
          Why matched with you
        </span>
        <p className="text-xs leading-relaxed text-[#F3EEFF]/90 bg-[#17102A]/60 p-3 rounded-xl border border-[#3A2E5C]">
          {fit?.whyPicked || member.whyMatched}
        </p>
      </div>

      {/* Shared Interests */}
      {fit?.sharedInterests && (
        <div className="mb-4 space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C6F9B]">
            Shared Focus Areas
          </span>
          <div className="flex flex-wrap gap-1.5">
            {fit.sharedInterests.map((interest) => (
              <span
                key={interest}
                className="text-xs px-2.5 py-1 rounded-lg bg-[#2B1E4A] border border-[#3A2E5C] text-[#A99CCB]"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Availability Overlap */}
      <div className="mb-6 space-y-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C6F9B] flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#2DD4BF]" />
          Availability Overlap
        </span>
        <p className="text-xs text-[#A99CCB]">
          {fit?.availabilityDetails || 'Active weekday evenings 7:30 PM - 10:30 PM IST'}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-auto pt-4 border-t border-[#3A2E5C] space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewProfile(member)}
            className="nc-button-secondary text-xs py-2.5"
          >
            <span>View Full Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onStartChat(member)}
            className="nc-button-secondary text-xs py-2.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Message</span>
          </button>
        </div>

        <button
          onClick={() => onDecline(member.id)}
          className="w-full py-2 px-3 rounded-xl border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          <UserX className="w-3.5 h-3.5" />
          <span>Decline {member.name.split(' ')[0]} (Won't appear again)</span>
        </button>
      </div>
    </div>
  );
};
