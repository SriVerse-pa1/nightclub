import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KanbanBoard } from '../../components/modules/build/KanbanBoard';
import { RoleBadge } from '../../components/common/RoleBadge';
import {
  Hammer,
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

  const [activeTab, setActiveTab] = useState<'tasks' | 'milestones' | 'files' | 'activity'>('tasks');
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
          className="inline-flex items-center gap-1.5 text-xs text-[#665E54] hover:text-[#29251F] transition-colors font-medium"
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
            <Share2 className="w-3.5 h-3.5 text-[#805536]" />
            <span>Share to Journey</span>
          </button>
        </div>
      </div>

      {/* Build Room Header Card */}
      <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-6 sm:p-7 shadow-card space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#DCD1C0]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#805536] uppercase tracking-wider bg-[#805536]/10 px-2 py-0.5 rounded border border-[#805536]/25">
                Team Build Room
              </span>
              <span className="text-xs text-[#29251F] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#805536] animate-pulse" />
                Sprint Active
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#29251F] mt-1.5">
              {project.title}
            </h1>
            <p className="text-xs text-[#665E54] mt-1 max-w-2xl">{project.description}</p>
          </div>

          {/* Team Balance Card */}
          <div className="bg-[#F3EDE3] border border-[#DCD1C0] rounded-2xl p-3 sm:p-4 flex items-center gap-4 shrink-0">
            <div>
              <span className="text-[10px] text-[#8C8173] uppercase font-bold">Team Balance</span>
              <p className="text-xl font-bold text-[#805536]">{project.teamBalance}</p>
            </div>
            <div className="border-l border-[#DCD1C0] pl-3 flex flex-col">
              <span className="text-[11px] text-[#29251F] font-semibold">5 Complementary Roles</span>
              <span className="text-[10px] text-[#665E54]">Full stack coverage</span>
            </div>
          </div>
        </div>

        {/* Team of Five Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#665E54]">Team of Five:</span>
            <div className="flex items-center -space-x-2">
              {project.members.map((m) => (
                <img
                  key={m.id}
                  src={m.avatar}
                  alt={m.name}
                  title={`${m.name} (${m.role})`}
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#FFFFFF]"
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
      <div className="flex items-center gap-2 border-b border-[#DCD1C0] pb-2 text-xs">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'tasks'
              ? 'bg-[#FFFFFF] text-[#805536] border border-[#805536]/30 shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F]'
          }`}
        >
          <Hammer className="w-4 h-4" />
          <span>Tasks & Kanban ({project.tasks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('milestones')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'milestones'
              ? 'bg-[#FFFFFF] text-[#805536] border border-[#805536]/30 shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Milestones ({project.milestones.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('files')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'files'
              ? 'bg-[#FFFFFF] text-[#805536] border border-[#805536]/30 shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F]'
          }`}
        >
          <Folder className="w-4 h-4" />
          <span>Files ({project.files.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('activity')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'activity'
              ? 'bg-[#FFFFFF] text-[#805536] border border-[#805536]/30 shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F]'
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
        <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-6 space-y-6 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCD1C0]">
            <h3 className="font-heading font-bold text-base text-[#29251F]">Project Roadmap</h3>
            <span className="text-xs text-[#805536] font-semibold bg-[#805536]/10 px-2 py-0.5 rounded border border-[#805536]/25">
              1 of 4 Completed
            </span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DCD1C0]">
            {project.milestones.map((m) => (
              <div key={m.id} className="relative group text-xs">
                <div
                  className={`absolute -left-6 top-1 w-5 h-5 rounded-full border flex items-center justify-center ${
                    m.completed
                      ? 'bg-[#805536] text-white border-[#805536]'
                      : 'bg-[#F3EDE3] border-[#DCD1C0] text-[#8C8173]'
                  }`}
                >
                  {m.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#29251F]">{m.title}</h4>
                    <span className="text-[10px] text-[#665E54] bg-[#F3EDE3] px-2 py-0.5 rounded border border-[#DCD1C0]">
                      Target: {m.dueDate}
                    </span>
                  </div>
                  <p className="text-[#665E54] leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: FILES */}
      {activeTab === 'files' && (
        <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-6 space-y-4 text-xs shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-[#DCD1C0]">
            <h3 className="font-heading font-bold text-base text-[#29251F]">Shared Artifacts & Tokens</h3>
            <button
              onClick={() => showToast('Artifact uploaded to team repository.', 'success')}
              className="nc-button-primary text-xs py-1.5 px-3"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Artifact</span>
            </button>
          </div>

          <div className="divide-y divide-[#DCD1C0]">
            {project.files.map((file) => (
              <div key={file.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#805536]" />
                  <div>
                    <h4 className="font-semibold text-[#29251F]">{file.name}</h4>
                    <span className="text-[10px] text-[#8C8173]">
                      {file.size} • Uploaded by {file.uploadedBy} on {file.date}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => showToast(`Downloading ${file.name}...`, 'info')}
                  className="text-[#805536] hover:underline font-medium text-xs"
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
        <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-6 space-y-4 text-xs shadow-card">
          <h3 className="font-heading font-bold text-base text-[#29251F] pb-3 border-b border-[#DCD1C0]">
            Real-time Sprint Activity
          </h3>

          <div className="space-y-4">
            {project.activity.map((act) => (
              <div key={act.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={act.userAvatar}
                    alt={act.userName}
                    className="w-7 h-7 rounded-full object-cover border border-[#DCD1C0]"
                  />
                  <p className="text-[#665E54]">
                    <strong className="text-[#29251F] font-semibold">{act.userName}</strong> {act.action}
                  </p>
                </div>
                <span className="text-[10px] text-[#8C8173]">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
