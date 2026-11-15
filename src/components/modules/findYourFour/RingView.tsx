import React from 'react';
import { Member, FourTeam } from '../../../types';
import { Sparkles, Shield, UserCheck, RefreshCw } from 'lucide-react';

interface RingViewProps {
  fourTeam: FourTeam;
  currentUser: Member;
  selectedMember: Member | null;
  onSelectMember: (member: Member) => void;
  compact?: boolean;
}

export const RingView: React.FC<RingViewProps> = ({
  fourTeam,
  currentUser,
  selectedMember,
  onSelectMember,
  compact = false,
}) => {
  const members = fourTeam.members;

  // Angles for 4 perimeter nodes: 0 (top/90°), 90° (right), 180° (bottom), 270° (left)
  // In polar coords centered at (250, 250) with radius 160 (or 110 for compact)
  const center = compact ? 160 : 220;
  const radius = compact ? 105 : 155;

  const positions = [
    { x: center, y: center - radius }, // Top (Design)
    { x: center + radius, y: center }, // Right (Business)
    { x: center, y: center + radius }, // Bottom (Research)
    { x: center - radius, y: center }, // Left (Build)
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'design':
        return '#F472B6';
      case 'business':
        return '#FBBF24';
      case 'research':
        return '#2DD4BF';
      case 'build':
      default:
        return '#38BDF8';
    }
  };

  const viewBoxSize = center * 2;

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-[520px] mx-auto">
      {/* Balance Pill */}
      <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22183B] border border-[#3A2E5C] text-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#FFB547]" />
        <span className="text-[#A99CCB]">Team balance:</span>
        <strong className="text-[#FFB547] font-semibold">{fourTeam.teamBalance}</strong>
        <span className="text-[11px] text-[#7C6F9B] border-l border-[#3A2E5C] pl-2 hidden sm:inline">
          Full complementary coverage
        </span>
      </div>

      {/* SVG Ring & Constellation */}
      <div className="relative w-full aspect-square max-w-[440px] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Subtle perimeter orbit circles */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#3A2E5C"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="opacity-70 animate-spin-slow origin-center"
          />

          <circle
            cx={center}
            cy={center}
            r={radius * 0.55}
            fill="none"
            stroke="#2B1E4A"
            strokeWidth="1"
            className="opacity-40"
          />

          {/* Lines from Center to each perimeter node */}
          {members.map((member, idx) => {
            const pos = positions[idx];
            if (!pos) return null;
            const isSelected = selectedMember?.id === member.id;
            const roleColor = getRoleColor(member.role);

            return (
              <g key={`line-${member.id}`}>
                <line
                  x1={center}
                  y1={center}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isSelected ? roleColor : '#3A2E5C'}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  strokeDasharray={isSelected ? 'none' : '3 3'}
                  className="transition-all duration-300"
                />
                {/* Secondary connecting ring mesh between outer nodes */}
                {idx > 0 && positions[idx - 1] && (
                  <line
                    x1={positions[idx - 1].x}
                    y1={positions[idx - 1].y}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="#2D234A"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                  />
                )}
              </g>
            );
          })}

          {/* Close the outer loop */}
          {members.length === 4 && (
            <line
              x1={positions[3].x}
              y1={positions[3].y}
              x2={positions[0].x}
              y2={positions[0].y}
              stroke="#2D234A"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          )}
        </svg>

        {/* Center Node (YOU) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          className="z-10 flex flex-col items-center group cursor-pointer"
        >
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-[#FFB547] via-[#FFB547]/80 to-[#FFD285] shadow-glow-accent transition-transform duration-300 group-hover:scale-105">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full rounded-full object-cover border-2 border-[#17102A]"
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#FFB547] text-[#17102A] text-[10px] font-extrabold uppercase tracking-wider shadow">
              You
            </span>
          </div>
          <span className="mt-2 text-xs font-semibold text-[#F3EEFF]">
            {currentUser.name.split(' ')[0]}
          </span>
          <span className="text-[10px] text-[#A99CCB] capitalize">{currentUser.role}</span>
        </div>

        {/* 4 Orbiting Teammates */}
        {members.map((member, idx) => {
          const pos = positions[idx];
          if (!pos) return null;
          const isSelected = selectedMember?.id === member.id;
          const roleColor = getRoleColor(member.role);

          // Calculate percentage offsets for responsive positioning
          const leftPercent = (pos.x / viewBoxSize) * 100;
          const topPercent = (pos.y / viewBoxSize) * 100;

          return (
            <div
              key={member.id}
              onClick={() => onSelectMember(member)}
              style={{
                position: 'absolute',
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="z-10 flex flex-col items-center cursor-pointer group"
            >
              <div className="relative">
                <div
                  style={{ borderColor: isSelected ? roleColor : '#3A2E5C' }}
                  className={`w-13 h-13 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 transition-all duration-200 group-hover:scale-110 ${
                    isSelected ? 'ring-4 ring-white/10 shadow-lg' : 'bg-[#22183B]'
                  }`}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* Match Score Badge */}
                <span
                  style={{
                    backgroundColor: '#17102A',
                    borderColor: roleColor,
                    color: roleColor,
                  }}
                  className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full border text-[9px] font-bold shadow"
                >
                  {member.matchScore}%
                </span>

                {/* Role Chip Indicator */}
                <span
                  style={{ backgroundColor: roleColor }}
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[9px] font-semibold text-[#17102A] capitalize shadow"
                >
                  {member.role}
                </span>
              </div>

              <span className="mt-2 text-xs font-medium text-[#F3EEFF] group-hover:text-[#FFB547] transition-colors text-center max-w-[80px] truncate">
                {member.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-[#A99CCB] max-w-[85px] truncate text-center">
                {member.roleTitle.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] text-[#A99CCB] text-center max-w-xs">
        Tap any teammate to inspect why your skills complement each other.
      </p>
    </div>
  );
};
