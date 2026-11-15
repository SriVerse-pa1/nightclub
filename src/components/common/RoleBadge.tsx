import React from 'react';
import { RoleType } from '../../types';

interface RoleBadgeProps {
  role: RoleType;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({
  role,
  title,
  size = 'md',
  showDot = true,
}) => {
  const getRoleConfig = (r: RoleType) => {
    switch (r) {
      case 'build':
        return {
          label: 'Build',
          textColor: 'text-[#38BDF8]',
          bgColor: 'bg-[#38BDF8]/10',
          borderColor: 'border-[#38BDF8]/30',
          dotColor: 'bg-[#38BDF8]',
        };
      case 'design':
        return {
          label: 'Design',
          textColor: 'text-[#F472B6]',
          bgColor: 'bg-[#F472B6]/10',
          borderColor: 'border-[#F472B6]/30',
          dotColor: 'bg-[#F472B6]',
        };
      case 'business':
        return {
          label: 'Business',
          textColor: 'text-[#FBBF24]',
          bgColor: 'bg-[#FBBF24]/10',
          borderColor: 'border-[#FBBF24]/30',
          dotColor: 'bg-[#FBBF24]',
        };
      case 'research':
        return {
          label: 'Research',
          textColor: 'text-[#2DD4BF]',
          bgColor: 'bg-[#2DD4BF]/10',
          borderColor: 'border-[#2DD4BF]/30',
          dotColor: 'bg-[#2DD4BF]',
        };
    }
  };

  const config = getRoleConfig(role);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5 font-medium',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bgColor} ${config.borderColor} ${config.textColor} ${sizeClasses}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />}
      <span>{title || config.label}</span>
    </span>
  );
};
