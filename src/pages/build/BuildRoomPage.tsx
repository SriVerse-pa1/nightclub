import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KanbanBoard } from '../../components/modules/build/KanbanBoard';
import { RoleBadge } from '../../components/common/RoleBadge';
import {
  Hammer,
  Sparkles,
  Calendar,
  Folder,
  Activity,
  UserPlus,
  Share2,
  CheckCircle2,
  Clock,
  ArrowLeft,
  FileText,
  Upload,
} from 'lucide-react';

export const BuildRoomPage: React.FC = () => {
  const {
    projects,
    activeProjectId,
    moveKanbanTask,
    addKanbanTask,
    navigate,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'milestones' | 'files' | 'activity'>('tasks');
  const project = projects.find((p) => p.id === activeProjectId) || projects[0];

  const handleShareToJourney = () => {
    showToast('Project milestone pinned to your Builder Journey timeline!', 'success');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Breadcrumb & Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/build')}
          className="inline-flex items-center gap-1.5 text-xs text-[#A99CCB] hover:text-[#F3EEFF]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects Overview</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Team invite link copied to clipboard.', 'info')}
            className="nc-button-secondary text-xs py-1.5 px-3"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Invite</span>
          </button>
          <button
            onClick={handleShareToJourney}
            className="nc-button-secondary text-xs py-1.5 px-3"
          >
            <Share2 className="w-3.5 h-3.5 text-[#FFB547]" />
            <span>Share to Journey</span>
          </button>
        </div>
      </div>

      {/* Build Room Header Card */}
      <div className="bg-[#1C1431] border border-[#3A2E5C] rounded-3xl p-6 sm:p-7 shadow-glow-card space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#3A2E5C]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#FFB547] uppercase tracking-wider bg-[#FFB547]/10 px-2 py-0.5 rounded border border-[#FFB547]/20">
                Team Build Room
              </span>
              <span className="text-xs text-[#2DD4BF] font-semibold">Sprint Active</span>
            </div>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#F3EEFF] mt-1">
              {project.title}
            </h1>
            <p className="text-xs text-[#A99CCB] mt-0.5">{project.description}</p>
          </div>

          {/* Team Balance Card */}
          <div className="bg-[#22183B] border border-[#3A2E5C] rounded-2xl p-3 sm:p-4 flex items-center gap-4 shrink-0">
            <div>
              <span className="text-[10px] text-[#A99CCB] uppercase font-bold">Team Balance</span>
              <p className="text-xl font-bold text-[#FFB547]">{project.teamBalance}</p>
            </div>
            <div className="border-l border-[#3A2E5C] pl-3 flex flex-col">
              <span className="text-[11px] text-[#2DD4BF] font-semibold">5 Complementary Roles</span>
              <span className="text-[10px] text-[#7C6F9B]">No missing skills</span>
            </div>
          </div>
        </div>

        {/* Team of Five Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#A99CCB]">Team of Five:</span>
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
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {project.members.map((m) => (
              <RoleBadge key={m.id} role={m.role} title={m.name.split(' ')[0]} size="sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Build Room Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#3A2E5C] pb-2 text-xs">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'tasks'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <Hammer className="w-4 h-4" />
          <span>Tasks & Kanban ({project.tasks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('milestones')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'milestones'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Milestones ({project.milestones.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('files')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'files'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <Folder className="w-4 h-4" />
          <span>Files ({project.files.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'activity'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Activity</span>
        </button>
      </div>

      {/* TAB CONTENT: TASKS & KANBAN */}
      {activeTab === 'tasks' && (
        <KanbanBoard
          project={project}
          onMoveTask={(taskId, newStatus) =>
            moveKanbanTask(project.id, taskId, newStatus)
          }
          onAddTask={(task) => addKanbanTask(project.id, task)}
        />
      )}

      {/* TAB CONTENT: MILESTONES */}
      {activeTab === 'milestones' && (
        <div className="bg-[#1C1431] border border-[#3A2E5C] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#3A2E5C]">
            <h3 className="font-heading font-bold text-base text-[#F3EEFF]">Project Roadmap</h3>
            <span className="text-xs text-[#2DD4BF] font-semibold">1 of 4 Completed</span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#3A2E5C]">
            {project.milestones.map((m) => (
              <div key={m.id} className="relative group text-xs">
                <div
                  className={`absolute -left-6 top-1 w-5 h-5 rounded-full border flex items-center justify-center ${
                    m.completed
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                      : 'bg-[#17102A] border-[#3A2E5C] text-[#A99CCB]'
                  }`}
                >
                  {m.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#F3EEFF]">{m.title}</h4>
                    <span className="text-[10px] text-[#A99CCB] bg-[#22183B] px-2 py-0.5 rounded border border-[#3A2E5C]">
                      Target: {m.dueDate}
                    </span>
                  </div>
                  <p className="text-[#A99CCB] leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: FILES */}
      {activeTab === 'files' && (
        <div className="bg-[#1C1431] border border-[#3A2E5C] rounded-2xl p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#3A2E5C]">
            <h3 className="font-heading font-bold text-base text-[#F3EEFF]">Shared Artifacts & Tokens</h3>
            <button
              onClick={() => showToast('Artifact uploaded to team repository.', 'success')}
              className="nc-button-primary text-xs py-1.5 px-3"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Artifact</span>
            </button>
          </div>

          <div className="divide-y divide-[#3A2E5C]/60">
            {project.files.map((file) => (
              <div key={file.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#FFB547]" />
                  <div>
                    <h4 className="font-semibold text-[#F3EEFF]">{file.name}</h4>
                    <span className="text-[10px] text-[#7C6F9B]">
                      {file.size} • Uploaded by {file.uploadedBy} on {file.date}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => showToast(`Downloading ${file.name}...`, 'info')}
                  className="text-[#FFB547] hover:underline font-medium text-xs"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: ACTIVITY */}
      {activeTab === 'activity' && (
        <div className="bg-[#1C1431] border border-[#3A2E5C] rounded-2xl p-6 space-y-4 text-xs">
          <h3 className="font-heading font-bold text-base text-[#F3EEFF] pb-3 border-b border-[#3A2E5C]">
            Real-time Sprint Activity
          </h3>

          <div className="space-y-4">
            {project.activity.map((act) => (
              <div key={act.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={act.userAvatar}
                    alt={act.userName}
                    className="w-7 h-7 rounded-full object-cover border border-[#3A2E5C]"
                  />
                  <p className="text-[#A99CCB]">
                    <strong className="text-[#F3EEFF]">{act.userName}</strong> {act.action}
                  </p>
                </div>
                <span className="text-[10px] text-[#7C6F9B]">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
