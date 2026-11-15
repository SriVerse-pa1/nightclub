import React from 'react';
import { BuilderJourneyItem } from '../../../types';
import { Rocket, BookOpen, GitPullRequest, GraduationCap } from 'lucide-react';

interface BuilderJourneyTimelineProps {
  items: BuilderJourneyItem[];
}

export const BuilderJourneyTimeline: React.FC<BuilderJourneyTimelineProps> = ({ items }) => {
  const getIcon = (type: BuilderJourneyItem['type']) => {
    switch (type) {
      case 'built':
        return <Rocket className="w-3.5 h-3.5 text-[#FFB547]" />;
      case 'learned':
        return <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />;
      case 'contributed':
        return <GitPullRequest className="w-3.5 h-3.5 text-[#2DD4BF]" />;
      case 'mentored':
        return <GraduationCap className="w-3.5 h-3.5 text-[#F472B6]" />;
    }
  };

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#3A2E5C]">
      {items.map((item) => (
        <div key={item.id} className="relative group">
          {/* Marker Icon */}
          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#17102A] border border-[#3A2E5C] flex items-center justify-center group-hover:border-[#FFB547] transition-colors">
            {getIcon(item.type)}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#FFB547]">{item.year}</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[#2B1E4A] text-[#A99CCB] border border-[#3A2E5C]">
                {item.type}
              </span>
              {item.badge && (
                <span className="text-[10px] text-[#2DD4BF] font-medium">• {item.badge}</span>
              )}
            </div>

            <h4 className="text-xs font-semibold text-[#F3EEFF]">{item.title}</h4>
            <p className="text-xs text-[#A99CCB] leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
