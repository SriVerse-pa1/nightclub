import React from 'react';
import { Member, FitBreakdown } from '../../../types';
import { RoleBadge } from '../../common/RoleBadge';
import {
  X,
  Sparkles,
  Clock,
  UserX,
  MessageSquare,
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
    <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-5 sm:p-6 text-[#29251F] flex flex-col h-full overflow-y-auto shadow-card">
      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b border-[#DCD1C0]">
        <div className="flex items-center gap-3">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover border border-[#DCD1C0]"
          />
          <div>
            <h3 className="font-heading font-bold text-base text-[#29251F]">{member.name}</h3>
            <p className="text-xs text-[#665E54]">{member.roleTitle}</p>
            <div className="flex items-center gap-2 mt-1">
              <RoleBadge role={member.role} size="sm" />
              <span className="text-[11px] text-[#8C8173]">{member.location}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[#665E54] hover:text-[#29251F] hover:bg-[#F3EDE3] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Match Score Banner */}
      <div className="my-4 p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#805536]" />
          <span className="text-xs text-[#665E54] font-medium">Complementary Fit Score</span>
        </div>
        <span className="text-base font-bold text-[#805536]">{member.matchScore}%</span>
      </div>

      {/* 4 Score Progress Bars */}
      <div className="space-y-2.5 mb-5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C8173]">
          Fit Breakdown
        </span>
        {scoreBars.map((bar) => (
          <div key={bar.label} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-[#665E54]">{bar.label}</span>
              <span className="font-semibold text-[#29251F]">{bar.score}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#E7DCCB] overflow-hidden">
              <div
                style={{ width: `${bar.score}%` }}
                className="h-full bg-[#805536] rounded-full transition-all duration-300"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Why they were picked */}
      <div className="mb-5 space-y-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C8173]">
          Why matched with you
        </span>
        <p className="text-xs leading-relaxed text-[#29251F] bg-[#F3EDE3] p-3 rounded-xl border border-[#DCD1C0]">
          {fit?.whyPicked || member.whyMatched}
        </p>
      </div>

      {/* Shared Interests */}
      {fit?.sharedInterests && (
        <div className="mb-4 space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C8173]">
            Shared Focus Areas
          </span>
          <div className="flex flex-wrap gap-1.5">
            {fit.sharedInterests.map((interest) => (
              <span
                key={interest}
                className="text-xs px-2.5 py-1 rounded-lg bg-[#E7DCCB] border border-[#DCD1C0] text-[#29251F] font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Availability Overlap */}
      <div className="mb-6 space-y-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C8173] flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#805536]" />
          Availability Overlap
        </span>
        <p className="text-xs text-[#665E54]">
          {fit?.availabilityDetails || 'Active weekday evenings 7:30 PM - 10:30 PM IST'}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-auto pt-4 border-t border-[#DCD1C0] space-y-2">
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
          className="w-full py-2 px-3 rounded-xl border border-[#DCD1C0] text-[#665E54] hover:text-[#805536] hover:bg-[#F3EDE3] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          <UserX className="w-3.5 h-3.5" />
          <span>Decline {member.name.split(' ')[0]} (Won't appear again)</span>
        </button>
      </div>
    </div>
  );
};
