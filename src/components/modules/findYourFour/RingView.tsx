import React from 'react';
import { Member, FourTeam } from '../../../types';
import { Sparkles } from 'lucide-react';

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

  const center = compact ? 160 : 220;
  const radius = compact ? 105 : 155;

  const positions = [
    { x: center, y: center - radius }, // Top (Design)
    { x: center + radius, y: center }, // Right (Business)
    { x: center, y: center + radius }, // Bottom (Research)
    { x: center - radius, y: center }, // Left (Build)
  ];

  const viewBoxSize = center * 2;

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-[520px] mx-auto">
      {/* Balance Pill */}
      <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DCD1C0] text-xs shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-[#805536]" />
        <span className="text-[#665E54]">Team balance:</span>
        <strong className="text-[#29251F] font-semibold">{fourTeam.teamBalance}</strong>
        <span className="text-[11px] text-[#8C8173] border-l border-[#DCD1C0] pl-2 hidden sm:inline">
          Full complementary coverage
        </span>
      </div>

      {/* SVG Ring & Constellation */}
      <div className="relative w-full aspect-square max-w-[440px] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Perimeter orbit circles */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#DCD1C0"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="opacity-75 animate-spin-slow origin-center"
          />

          <circle
            cx={center}
            cy={center}
            r={radius * 0.55}
            fill="none"
            stroke="#E7DCCB"
            strokeWidth="1"
            className="opacity-80"
          />

          {/* Lines from Center to each perimeter node */}
          {members.map((member, idx) => {
            const pos = positions[idx];
            if (!pos) return null;
            const isSelected = selectedMember?.id === member.id;

            return (
              <g key={`line-${member.id}`}>
                <line
                  x1={center}
                  y1={center}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isSelected ? '#805536' : '#DCD1C0'}
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
                    stroke="#E7DCCB"
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
              stroke="#E7DCCB"
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
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-[#FFFFFF] border-2 border-[#805536] transition-transform duration-300 group-hover:scale-105 shadow-glow-accent">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full rounded-full object-cover border border-[#DCD1C0]"
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#805536] text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
              You
            </span>
          </div>
          <span className="mt-2 text-xs font-semibold text-[#29251F]">
            {currentUser.name.split(' ')[0]}
          </span>
          <span className="text-[10px] text-[#665E54] capitalize">{currentUser.role}</span>
        </div>

        {/* 4 Orbiting Teammates */}
        {members.map((member, idx) => {
          const pos = positions[idx];
          if (!pos) return null;
          const isSelected = selectedMember?.id === member.id;

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
                  className={`w-13 h-13 sm:w-16 sm:h-16 rounded-full p-0.5 border-2 transition-all duration-200 group-hover:scale-110 ${
                    isSelected
                      ? 'border-[#805536] ring-4 ring-[#805536]/20 shadow-lg bg-[#FFFFFF]'
                      : 'border-[#DCD1C0] bg-[#FFFFFF] shadow-sm'
                  }`}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* Match Score Badge */}
                <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-[#805536] text-white text-[9px] font-bold shadow">
                  {member.matchScore}%
                </span>

                {/* Role Chip Indicator */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-[#E7DCCB] border border-[#DCD1C0] text-[9px] font-semibold text-[#29251F] capitalize shadow whitespace-nowrap">
                  {member.role}
                </span>
              </div>

              <span className="mt-2 text-xs font-medium text-[#29251F] group-hover:text-[#805536] transition-colors text-center max-w-[80px] truncate">
                {member.name.split(' ')[0]}
              </span>
              <span className="text-[10px] text-[#8C8173] max-w-[85px] truncate text-center">
                {member.roleTitle.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] text-[#665E54] text-center max-w-xs">
        Tap any teammate to inspect why your skills complement each other.
      </p>
    </div>
  );
};
