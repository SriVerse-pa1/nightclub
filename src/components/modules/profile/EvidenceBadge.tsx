import React from 'react';
import { EvidenceType } from '../../../types';
import { ShieldCheck, Award, FolderGit2, CheckCircle } from 'lucide-react';

interface EvidenceBadgeProps {
  evidence: EvidenceType;
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({ evidence }) => {
  const configs = {
    'Self-reported': {
      label: 'Self-reported',
      icon: CheckCircle,
      classes: 'bg-[#F3EDE3] text-[#665E54] border-[#DCD1C0]',
    },
    Portfolio: {
      label: 'Portfolio Verified',
      icon: Award,
      classes: 'bg-[#E7DCCB] text-[#29251F] border-[#DCD1C0]',
    },
    Project: {
      label: 'Shipped in Project',
      icon: FolderGit2,
      classes: 'bg-[#E7DCCB] text-[#29251F] border-[#DCD1C0]',
    },
    Endorsed: {
      label: 'Peer Endorsed',
      icon: ShieldCheck,
      classes: 'bg-[#805536]/10 text-[#805536] border-[#805536]/30 font-semibold',
    },
  }[evidence];

  const Icon = configs.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${configs.classes}`}
      title={`Skill evidence: ${configs.label}`}
    >
      <Icon className="w-2.5 h-2.5" />
      <span>{configs.label}</span>
    </span>
  );
};
