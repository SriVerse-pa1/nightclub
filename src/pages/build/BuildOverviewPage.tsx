import React from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
import {
  Hammer,
  FolderGit2,
  Users2,
  Sparkles,
  ArrowRight,
  Plus,
  Trophy,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const BuildOverviewPage: React.FC = () => {
  const { projects, setActiveProjectId, navigate } = useApp();

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3A2E5C]">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF]">
            Build & Projects
          </h1>
          <p className="text-xs text-[#A99CCB] mt-0.5">
            Your collaborative ventures, teams of five, and sprint deliverables.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/challenges')}
            className="nc-button-secondary text-xs py-2 px-3"
          >
            <Trophy className="w-3.5 h-3.5 text-[#FFB547]" />
            <span>Build Challenges</span>
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="nc-card p-6 space-y-5 hover:border-[#FFB547]/50 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                    project.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-[#2B1E4A] text-[#A99CCB] border-[#3A2E5C]'
                  }`}
                >
                  {project.status === 'active' ? 'Active Sprint' : 'Completed'}
                </span>

                <span className="text-xs font-bold text-[#FFB547] bg-[#FFB547]/10 px-2.5 py-0.5 rounded-full border border-[#FFB547]/30">
                  {project.teamBalance} Team Balance
                </span>
              </div>

              <h2 className="font-heading font-bold text-lg text-[#F3EEFF] leading-snug">
                {project.title}
              </h2>

              <p className="text-xs text-[#A99CCB] leading-relaxed line-clamp-2">
                {project.description}
              </p>

              {/* Team Avatars */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center -space-x-2">
                  {project.members.map((m) => (
                    <img
                      key={m.id}
                      src={m.avatar}
                      alt={m.name}
                      title={`${m.name} (${m.role})`}
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#1E1537]"
                    />
                  ))}
                </div>
                <span className="text-xs text-[#A99CCB]">5 Builders Collaborating</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#3A2E5C] flex items-center justify-between">
              <span className="text-xs text-[#2DD4BF] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{project.tasks.filter((t) => t.status === 'done').length} tasks shipped</span>
              </span>

              <button
                onClick={() => {
                  setActiveProjectId(project.id);
                  navigate('/build-room');
                }}
                className="nc-button-primary text-xs py-2 px-4 shadow-glow-accent"
              >
                <span>Enter Build Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
