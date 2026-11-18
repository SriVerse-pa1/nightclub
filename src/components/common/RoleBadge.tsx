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
          textColor: 'text-[#805536]',
          bgColor: 'bg-[#805536]/10',
          borderColor: 'border-[#805536]/25',
          dotColor: 'bg-[#805536]',
        };
      case 'design':
        return {
          label: 'Design',
          textColor: 'text-[#96603B]',
          bgColor: 'bg-[#96603B]/10',
          borderColor: 'border-[#96603B]/25',
          dotColor: 'bg-[#96603B]',
        };
      case 'business':
        return {
          label: 'Business',
          textColor: 'text-[#6E4D36]',
          bgColor: 'bg-[#6E4D36]/10',
          borderColor: 'border-[#6E4D36]/25',
          dotColor: 'bg-[#6E4D36]',
        };
      case 'research':
        return {
          label: 'Research',
          textColor: 'text-[#5C4533]',
          bgColor: 'bg-[#5C4533]/10',
          borderColor: 'border-[#5C4533]/25',
          dotColor: 'bg-[#5C4533]',
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
