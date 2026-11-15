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
      classes: 'bg-[#22183B] text-[#A99CCB] border-[#3A2E5C]',
    },
    Portfolio: {
      label: 'Portfolio Verified',
      icon: Award,
      classes: 'bg-[#F472B6]/10 text-[#F472B6] border-[#F472B6]/30',
    },
    Project: {
      label: 'Shipped in Project',
      icon: FolderGit2,
      classes: 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30',
    },
    Endorsed: {
      label: 'Peer Endorsed',
      icon: ShieldCheck,
      classes: 'bg-[#2DD4BF]/10 text-[#2DD4BF] border-[#2DD4BF]/30',
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
